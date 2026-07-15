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
    },
    (context) => {
      const { isMobile, isTablet } = context.conditions as {
        isMobile: boolean;
        isTablet: boolean;
      };

      const mScale = isMobile ? 0.75 : isTablet ? 0.7 : 1;

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