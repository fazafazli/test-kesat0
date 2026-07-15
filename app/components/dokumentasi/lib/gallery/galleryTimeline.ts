import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryData } from "./galleryData";

export const createGalleryTimeline = (
  triggerRef: HTMLDivElement,
  stickyRef: HTMLDivElement,
  titleRef: HTMLDivElement,
  endingRef: HTMLDivElement,
  wrapperRef: HTMLDivElement,
  imageRefs: (HTMLDivElement | null)[]
) => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerRef,
      start: "top top",
      end: "bottom bottom",
      // scrub: true (tracks scroll position directly) is cheaper than
      // scrub: 1 (adds a trailing lerp on top of the scroll calc every
      // frame). scrub: 1 was doubling the math GSAP does per tick across
      // 11+ simultaneous tweens. Keep `true` unless the eased "catch-up"
      // feel is essential — it costs real CPU at this tween count.
      scrub: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    },
  });

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 1025px)",
      isTablet: "(min-width: 768px) and (max-width: 1024px)",
      isMobile: "(max-width: 767px)",
      // gsap.matchMedia only re-runs this callback when one of these query
      // strings flips true/false — it does NOT re-run on every resize.
      // Since mScale below also reacts to window.innerHeight and aspect
      // ratio, a resize/rotation that stays within the same
      // isMobile/isTablet/isDesktop width bucket would otherwise never
      // trigger a recompute. This query flips whenever the viewport becomes
      // "wide" relative to its height (matches the wideAspectTrim threshold
      // below), forcing a re-run on rotation or window resize.
      isWideAspect: "(min-aspect-ratio: 1.6)",
    },
    (context) => {
      const { isMobile, isTablet } = context.conditions as {
        isMobile: boolean;
        isTablet: boolean;
        isDesktop: boolean;
        isWideAspect: boolean;
      };

      // --- Unified scale strategy (width AND height aware) ---
      // The collage's finalTransform values mix vw (horizontal spread) and
      // vh (vertical spread). Because spacing between rows is defined in
      // vh, ANY viewport where height is the more constrained dimension —
      // which includes ordinary desktop/laptop screens (1920x1080,
      // 1366x768, etc. are all wider than tall) — will pack rows closer
      // together in absolute pixels than a portrait phone does. The
      // previous REFERENCE_HEIGHT of 1000 was higher than most real
      // viewports (browser chrome eats ~80-150px, so a 1080px display often
      // reports ~900-950px innerHeight), which meant this scale rarely
      // engaged for ordinary wide screens — exactly where the overlap was
      // reported. Lowering the reference to a realistic laptop viewport
      // height and giving height double the weight of width fixes this:
      // wide-but-not-super-tall screens now reliably scale down.
      const REFERENCE_WIDTH = 1920;
      const REFERENCE_HEIGHT = 800; // realistic laptop viewport height, not display height
      const MIN_SCALE = 0.5;
      const MAX_SCALE = 1;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const widthFactor = vw / REFERENCE_WIDTH;
      const heightFactor = vh / REFERENCE_HEIGHT;

      // Height is weighted more heavily than width because the collage's
      // vertical spacing (vh-based) is what actually collides when a
      // screen is wide but not tall — a wide screen with normal height is
      // fine, but height is the dimension that must shrink the layout when
      // it's the constraining one.
      const geometryScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, Math.min(widthFactor, heightFactor * 1.0))
      );

      // Additionally: explicitly detect "wide aspect ratio" (width clearly
      // exceeds height, e.g. > 1.6:1) and apply an extra trim on top of the
      // geometry scale. This directly targets the reported bug — landscape
      // desktops/laptops/tablets where width > height by a good margin —
      // independent of absolute pixel size.
      const aspectRatio = vw / vh;
      const wideAspectTrim = aspectRatio > 1.6 ? 0.85 : 1;

      // Device-class still applies its own extra trim on top, since phones
      // in portrait need noticeably denser packing regardless of geometry
      // math (touch targets, single-column reading flow, etc).
      const deviceTrim = isMobile ? 0.82 : isTablet ? 0.85 : 1;

      const mScale = Math.max(
        MIN_SCALE,
        geometryScale * deviceTrim * wideAspectTrim
      );

      tl.clear();

      const validImageRefs = imageRefs.filter(
        (ref): ref is HTMLDivElement => ref !== null
      );

      // --- Layer strategy ---
      // Only promote elements to their own GPU layer if they animate
      // independently of their parent. A wrapper scaling its own subtree
      // every frame while 11 children ALSO transform independently is the
      // single biggest cost here: the browser can't cheaply composite a
      // scaling parent together with children that are separately promoted
      // layers, so on mid-range/mobile GPUs it falls back to repainting
      // the whole group instead of compositing cheaply.
      //
      // Fix: give the 11 images + title + ending their own layer (they
      // genuinely animate independently), but deliberately do NOT put
      // will-change on wrapperRef. Its slow "breathing" scale (Phase 3)
      // is a single flat property with a linear ease, cheap enough to run
      // without forcing a dedicated composite layer for the whole subtree.
      gsap.set(validImageRefs, { force3D: true, willChange: "transform" });
      gsap.set(titleRef, { willChange: "transform, opacity" });
      gsap.set(endingRef, { willChange: "transform, opacity" });

      gsap.set(titleRef, { scale: 1, opacity: 1 });
      gsap.set(endingRef, { opacity: 0, scale: 1 });

      validImageRefs.forEach((img, i) => {
        const data = galleryData[i];
        if (!data) return;

        gsap.set(img, {
          x: data.initialTransform.x,
          y: data.initialTransform.y,
          scale: data.initialTransform.scale * mScale,
          rotation: data.initialTransform.rotation,
          opacity: 0,
        });
      });

      // --- PHASE 1: Title hides ---
      tl.to(
        titleRef,
        {
          scale: 0.4,
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: "auto",
        },
        0
      );

      // --- PHASE 2: Images reveal and spread outwards ---
      validImageRefs.forEach((img, i) => {
        const data = galleryData[i];
        if (!data) return;

        let targetX = data.finalTransform.x;
        let targetY = data.finalTransform.y;
        let targetRotation = data.finalTransform.rotation;
        let targetScale = data.finalTransform.scale * mScale;

        if (isMobile) {
          const isLeftColumn = i % 2 === 0;
          const rowNumber = Math.floor(i / 2);

          const xOffsets = [-3, 4, 2, -2, -5, 3, 4, -2, -3, 5, 1, -4];
          const yOffsets = [1, -2, 3, 0, -2, 2, 1, -1, 3, -2, -1, 2];
          const rotations = [-4, 6, -8, 5, 8, -4, 5, -7, 6, -5, 8, -4];
          const scaleMods = [
            0.92, 0.85, 0.95, 0.85, 0.92, 0.88, 0.92, 0.88, 0.85, 0.95, 0.88,
            0.92,
          ];

          const safeIndex = i % 12;

          targetX = isLeftColumn
            ? `${-22 + xOffsets[safeIndex]}vw`
            : `${22 + xOffsets[safeIndex]}vw`;

          targetY = `${-33 + rowNumber * 13.5 + yOffsets[safeIndex]}vh`;

          targetRotation = rotations[safeIndex];
          targetScale = targetScale * scaleMods[safeIndex];
        } else if (isTablet) {
          targetY = `${parseFloat(data.finalTransform.y) * 0.8}vh`;
        }

        tl.to(
          img,
          {
            x: targetX,
            y: targetY,
            scale: targetScale,
            rotation: targetRotation,
            opacity: 1,
            duration: 2.5,
            ease: "power3.out",
            overwrite: "auto",
          },
          0.1 + i * 0.08
        );
      });

      // --- PHASE 3: Global Collage Slow Scale ---
      // Runs on the wrapper alone; no will-change here (see note above),
      // and it's a single flat property (scale) with linear ease, which
      // the browser can interpolate cheaply without re-promoting a
      // dedicated layer every tick.
      tl.to(
        wrapperRef,
        {
          scale: 1.1, // trimmed from 1.15 - smaller delta, less recompositing work
          duration: 5,
          ease: "none",
          overwrite: "auto",
        },
        0
      );

      // --- PHASE 4: Transition Out ---
      tl.to(
        validImageRefs,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
          overwrite: "auto",
        },
        4.5
      );

      tl.to(
        endingRef,
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: "auto",
        },
        ">-1.5"
      );

      return () => {
        gsap.set([...validImageRefs, titleRef, endingRef], {
          willChange: "auto",
        });
      };
    }
  );

  return tl;
};