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

  // 1. Create the Master Timeline attached to your scroll sequence
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerRef, 
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  // 2. Wrap the animation phases in a matchMedia context
  const mm = gsap.matchMedia();

  mm.add({
    isDesktop: "(min-width: 1025px)",
    isTablet: "(min-width: 768px) and (max-width: 1024px)",
    isMobile: "(max-width: 767px)"
  }, (context) => {
    const { isMobile, isTablet } = context.conditions as { isMobile: boolean, isTablet: boolean };

    // Bumped mobile scale up to 0.75 so images are chunky enough to close the gaps
    // Desktop: 100%, Tablet: 70%, Mobile: 75%
    const mScale = isMobile ? 0.75 : isTablet ? 0.7 : 1; 

    // Clear timeline in case of window resize recalculations
    tl.clear();

    // --- 1. Setup Initial States ---
    gsap.set(titleRef, { scale: 1, opacity: 1, filter: "blur(0px)"});
    gsap.set(endingRef, { opacity: 0, scale: 1, filter: "blur(0px)" });
    
    const validImageRefs = imageRefs.filter((ref): ref is HTMLDivElement => ref !== null);

    validImageRefs.forEach((img, i) => {
      const data = galleryData[i];
      if (!data) return;
      
      gsap.set(img, {
        x: data.initialTransform.x,
        y: data.initialTransform.y,
        scale: data.initialTransform.scale * mScale, // Apply dynamic scale
        rotation: data.initialTransform.rotation,
        opacity: 0,
        filter: "blur(10px)",
        force3D: true
      });
    });

    // --- PHASE 1: Title hides ---
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

    // --- PHASE 2: Images reveal and spread outwards ---
    validImageRefs.forEach((img, i) => {
      const data = galleryData[i];
      if (!data) return;

      // Default desktop coordinates
      let targetX = data.finalTransform.x;
      let targetY = data.finalTransform.y;
      let targetRotation = data.finalTransform.rotation;
      let targetScale = data.finalTransform.scale * mScale;

      if (isMobile) {
        // MOBILE OVERRIDE: Create a fixed, densely packed messy collage
        const isLeftColumn = i % 2 === 0;
        const rowNumber = Math.floor(i / 2); // Groups images into 6 rows (0 to 5)

        // Tweaked deterministic values to relieve the "crushed" feeling while avoiding gaping holes
        const xOffsets = [-3, 4, 2, -2, -5, 3, 4, -2, -3, 5, 1, -4]; // VW variations
        const yOffsets = [1, -2, 3, 0, -2, 2, 1, -1, 3, -2, -1, 2];  // VH shifts to add *little* gaps occasionally
        const rotations = [-4, 6, -8, 5, 8, -4, 5, -7, 6, -5, 8, -4]; // Softer tilts 
        const scaleMods = [1.0, 0.9, 1.05, 0.9, 1.0, 0.95, 1.0, 0.95, 0.9, 1.05, 0.95, 1.0]; // Slightly lowered scales to reduce overlap
        
        // Loop fallback just in case array index exceeds 11
        const safeIndex = i % 12;

        // Pushed out slightly from +/- 18 to +/- 20 to give horizontal breathing room
        targetX = isLeftColumn ? `${-20 + xOffsets[safeIndex]}vw` : `${20 + xOffsets[safeIndex]}vw`;
        
        // Increased row gap from 11vh to 12.5vh for just a little more vertical space
        // Shifted starting position to -32vh to keep it perfectly centered
        targetY = `${-32 + (rowNumber * 12.5) + yOffsets[safeIndex]}vh`;
        
        // Apply our carefully curated rotation and size shifts
        targetRotation = rotations[safeIndex];
        targetScale = targetScale * scaleMods[safeIndex];

      } else if (isTablet) {
        // TABLET OVERRIDE: Keep original spread but tighten the vertical gaps slightly
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
          filter: "blur(0px)",
          duration: 2.5,
          force3D: true,
          ease: "power3.out", 
        },
        0.1 + (i * 0.08) 
      );
    });

    // --- PHASE 3: Global Collage Slow Scale ---
    tl.to(
      wrapperRef,
      {
        scale: 1.15,
        duration: 5,
        ease: "none",
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
      },
      4.5 
    );

    // Your custom ending text animation preserved perfectly
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
  });

  return tl;
};