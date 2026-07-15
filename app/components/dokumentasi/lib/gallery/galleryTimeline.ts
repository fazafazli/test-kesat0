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
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  const mm = gsap.matchMedia();
  const idleTweens: gsap.core.Tween[] = [];

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

      const vh = window.innerHeight;

      const mScale = isMobile ? 1.15 : isTablet ? 0.85 : 1;

      const REFERENCE_HEIGHT = 800;
      const MIN_V_COMPRESS = 0.72;
      const vCompress = Math.min(
        1,
        Math.max(MIN_V_COMPRESS, vh / REFERENCE_HEIGHT)
      );

      const desktopYShift = isMobile ? 0 : isTablet ? 6 : 9;

      tl.clear();
      idleTweens.forEach((t) => t.kill());
      idleTweens.length = 0;

      gsap.set(titleRef, { scale: 1, opacity: 1, filter: "blur(0px)" });
      gsap.set(endingRef, { opacity: 0, scale: 1, filter: "blur(0px)" });

      const validImageRefs = imageRefs.filter(
        (ref): ref is HTMLDivElement => ref !== null
      );

      validImageRefs.forEach((img, i) => {
        const data = galleryData[i];
        if (!data) return;

        gsap.set(img, {
          x: data.initialTransform.x,
          y: data.initialTransform.y,
          scale: data.initialTransform.scale * mScale,
          rotation: data.initialTransform.rotation,
          opacity: 0,
          filter: "blur(10px)",
          force3D: true,
        });
      });

      tl.to(
        titleRef,
        {
          scale: 0.4,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.5,
          ease: "power2.inOut",
        },
        0
      );

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
            1.0, 0.9, 1.05, 0.9, 1.0, 0.95, 1.0, 0.95, 0.9, 1.05, 0.95, 1.0,
          ];

          const safeIndex = i % 12;

          targetX = isLeftColumn
            ? `${-20 + xOffsets[safeIndex]}vw`
            : `${20 + xOffsets[safeIndex]}vw`;

          targetY = `${(-32 + rowNumber * 12.5 + yOffsets[safeIndex]) * vCompress}vh`;

          targetRotation = rotations[safeIndex];
          targetScale = targetScale * scaleMods[safeIndex];
        } else if (isTablet) {
          targetY = `${parseFloat(data.finalTransform.y) * 0.8 * vCompress + desktopYShift}vh`;
        } else {
          targetY = `${parseFloat(data.finalTransform.y) * vCompress + desktopYShift}vh`;
        }

        tl.to(
          img,
          {
            x: targetX,
            y: targetY,
            scale: targetScale,
            rotation: targetRotation,
            opacity: 1,
            filter: "blur(0px)",
            duration: 2.5,
            force3D: true,
            ease: "power3.out",
          },
          0.1 + i * 0.08
        );

        const idleTween = gsap.to(img, {
          y: `+=${isMobile ? 0.9 : 1.4}vh`,
          rotation: targetRotation + (i % 2 === 0 ? 1.5 : -1.5),
          duration: 2.6 + (i % 4) * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
          overwrite: false,
        });
        idleTweens.push(idleTween);
      });

      tl.to(
        wrapperRef,
        {
          scale: 1.15,
          duration: 5,
          ease: "none",
        },
        0
      );

      tl.to(
        validImageRefs,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
        },
        4.5
      );

      tl.to(
        endingRef,
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.inOut",
        },
        ">-1.5"
      );

      tl.eventCallback("onUpdate", () => {
        const progress = tl.progress();
        const inIdleZone = progress > 0.55 && progress < 0.92;
        idleTweens.forEach((t) => {
          if (inIdleZone && t.paused()) t.play();
          else if (!inIdleZone && !t.paused()) t.pause();
        });
      });

      return () => {
        idleTweens.forEach((t) => t.kill());
        idleTweens.length = 0;
      };
    }
  );

  return tl;
};