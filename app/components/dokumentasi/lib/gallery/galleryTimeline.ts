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

      // --- Vertical compression + scale strategy ---
      // The previous approach only shrank the IMAGES (mScale) while leaving
      // their vh-based positions untouched. That's not enough: at 1440x800
      // the position spread alone (roughly -46vh to +27vh, ~73vh total)
      // already needs ~584px of the 800px viewport just for image CENTERS,
      // before accounting for each image's own rendered height. Shrinking
      // the images a little did nothing to fix that — the positions
      // themselves were still spread too far apart for the available
      // vertical space.
      //
      // Fix: compute a vCompress factor from how the viewport's actual
      // height compares to a reference "comfortable" height, and multiply
      // every image's Y position (in vh) by it. This proportionally pulls
      // every row toward the vertical center, shrinking the *footprint* of
      // the collage, not just the images inside it. Image scale (mScale)
      // is now a secondary, gentler adjustment layered on top.
      const REFERENCE_WIDTH = 1920;
      const REFERENCE_HEIGHT = 900;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const aspectRatio = vw / vh;

      // vCompress: how much to pull Y positions toward center.
      // At vh >= REFERENCE_HEIGHT, no compression needed (1.0).
      // As vh shrinks, compression strengthens — floor at 0.45 so rows
      // never fully collapse into each other even on very short viewports.
      const MIN_V_COMPRESS = 0.45;
      const vCompress = Math.min(
        1,
        Math.max(MIN_V_COMPRESS, vh / REFERENCE_HEIGHT)
      );

      // mScale: gentler image-size adjustment, mostly driven by width now
      // that vCompress handles the height/overlap problem directly.
      const MIN_SCALE = 0.55;
      const MAX_SCALE = 1;
      const widthFactor = vw / REFERENCE_WIDTH;
      const deviceTrim = isMobile ? 0.82 : isTablet ? 0.88 : 1;
      const mScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, widthFactor * deviceTrim)
      );

      // Extra safety net: when aspect ratio is clearly landscape-wide
      // (> 1.6) AND height is short, tighten vCompress a bit further —
      // covers ultra-wide monitors that might not trip the vh reference
      // alone.
      const wideAspectExtra =
        aspectRatio > 1.6 && vh < REFERENCE_HEIGHT ? 0.9 : 1;
      const finalVCompress = Math.max(
        MIN_V_COMPRESS,
        vCompress * wideAspectExtra
      );

      // Helper: scales a "-46vh" / "27vh" style string toward the vertical
      // center by the compression factor.
      const compressY = (value: string, factor: number): string => {
        const num = parseFloat(value);
        if (Number.isNaN(num)) return value;
        return `${num * factor}vh`;
      };

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
          y: compressY(data.initialTransform.y, finalVCompress),
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

          // Mobile's Y formula is already hand-packed for portrait phones,
          // but still needs compression for landscape rotation (a rotated
          // phone is short + wide, same problem as a wide desktop).
          const rawMobileY = -33 + rowNumber * 13.5 + yOffsets[safeIndex];
          targetY = `${rawMobileY * finalVCompress}vh`;

          targetRotation = rotations[safeIndex];
          targetScale = targetScale * scaleMods[safeIndex];
        } else if (isTablet) {
          targetY = compressY(
            `${parseFloat(data.finalTransform.y) * 0.8}vh`,
            finalVCompress
          );
        } else {
          // Desktop: this is the case from the reported screenshot
          // (1440x800). Apply vertical compression directly to the
          // authored finalTransform.y so the whole collage's vertical
          // footprint shrinks to fit the available height, instead of
          // only shrinking the images while leaving them spread across
          // a vh range that doesn't fit.
          targetY = compressY(data.finalTransform.y, finalVCompress);
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