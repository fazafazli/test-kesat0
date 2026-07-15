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
      scrub: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    },
  });

  const mm = gsap.matchMedia();
  const idleTweens: gsap.core.Tween[] = [];

  mm.add(
    {
      isDesktop: "(min-width: 1025px)",
      isTablet: "(min-width: 768px) and (max-width: 1024px)",
      isMobile: "(max-width: 767px)",
      isWideAspect: "(min-aspect-ratio: 1.6)",
    },
    (context) => {
      const { isMobile, isTablet } = context.conditions as {
        isMobile: boolean;
        isTablet: boolean;
        isDesktop: boolean;
        isWideAspect: boolean;
      };

      const REFERENCE_WIDTH = 1600;
      const REFERENCE_HEIGHT = 780;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const aspectRatio = vw / vh;

      const MIN_V_COMPRESS = 0.62;
      const vCompress = Math.min(
        1,
        Math.max(MIN_V_COMPRESS, vh / REFERENCE_HEIGHT)
      );

      const MIN_SCALE = 0.78;
      const MAX_SCALE = 1.15;
      const widthFactor = vw / REFERENCE_WIDTH;
      const deviceTrim = isMobile ? 0.95 : isTablet ? 1 : 1;
      const mScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, widthFactor * deviceTrim)
      );

      const wideAspectExtra =
        aspectRatio > 1.6 && vh < REFERENCE_HEIGHT ? 0.94 : 1;
      const finalVCompress = Math.max(
        MIN_V_COMPRESS,
        vCompress * wideAspectExtra
      );

      const compressY = (value: string, factor: number): string => {
        const num = parseFloat(value);
        if (Number.isNaN(num)) return value;
        return `${num * factor}vh`;
      };

      tl.clear();
      idleTweens.forEach((t) => t.kill());
      idleTweens.length = 0;

      const validImageRefs = imageRefs.filter(
        (ref): ref is HTMLDivElement => ref !== null
      );

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
            1, 0.94, 1.02, 0.94, 1, 0.96, 1, 0.96, 0.94, 1.02, 0.96, 1,
          ];

          const safeIndex = i % 12;

          targetX = isLeftColumn
            ? `${-26 + xOffsets[safeIndex]}vw`
            : `${26 + xOffsets[safeIndex]}vw`;

          const rawMobileY = -33 + rowNumber * 13.5 + yOffsets[safeIndex];
          targetY = `${rawMobileY * finalVCompress}vh`;

          targetRotation = rotations[safeIndex];
          targetScale = targetScale * scaleMods[safeIndex];
        } else if (isTablet) {
          targetY = compressY(
            `${parseFloat(data.finalTransform.y) * 0.85}vh`,
            finalVCompress
          );
        } else {
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

        const idleTween = gsap.to(img, {
          y: `+=${isMobile ? 0.8 : 1.4}vh`,
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
          scale: 1.08,
          duration: 5,
          ease: "none",
          overwrite: "auto",
        },
        0
      );

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
        gsap.set([...validImageRefs, titleRef, endingRef], {
          willChange: "auto",
        });
      };
    }
  );

  return tl;
};