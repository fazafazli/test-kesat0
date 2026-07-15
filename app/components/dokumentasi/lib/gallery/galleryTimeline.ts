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

  // Master Timeline attached to the scroll sequence.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerRef,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      // Reduces layout thrash: only recalculates on actual resize end,
      // not on every intermediate scroll/resize tick.
      invalidateOnRefresh: true,
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

      // --- 1. Setup Initial States ---
      gsap.set(titleRef, { scale: 1, opacity: 1 });
      gsap.set(endingRef, { opacity: 0, scale: 1 });

      const validImageRefs = imageRefs.filter(
        (ref): ref is HTMLDivElement => ref !== null
      );

      // Set will-change only on elements that will actually animate,
      // and only for the duration of the scroll section (removed on
      // ScrollTrigger kill via context revert in the component).
      gsap.set(validImageRefs, { willChange: "transform, opacity" });
      gsap.set([titleRef, endingRef, wrapperRef], {
        willChange: "transform, opacity",
      });

      validImageRefs.forEach((img, i) => {
        const data = galleryData[i];
        if (!data) return;

        gsap.set(img, {
          x: data.initialTransform.x,
          y: data.initialTransform.y,
          scale: data.initialTransform.scale * mScale,
          rotation: data.initialTransform.rotation,
          opacity: 0,
          force3D: true,
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
          // Slightly lower scale mods than before to keep mobile collage
          // from crushing edges together (was causing the "stacked" look).
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
            force3D: true,
            ease: "power3.out",
            overwrite: "auto",
          },
          0.1 + i * 0.08
        );
      });

      // --- PHASE 3: Global Collage Slow Scale ---
      tl.to(
        wrapperRef,
        {
          scale: 1.15,
          duration: 5,
          ease: "none",
          overwrite: "auto",
        },
        0
      );

      // --- PHASE 4: Transition Out ---
      tl.to(validImageRefs, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        overwrite: "auto",
      }, 4.5);

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

      // Cleanup will-change once the section's animation timeline completes,
      // to avoid leaving GPU layers pinned for the rest of the page's life.
      return () => {
        gsap.set(
          [...validImageRefs, titleRef, endingRef, wrapperRef],
          { willChange: "auto" }
        );
      };
    }
  );

  return tl;
};