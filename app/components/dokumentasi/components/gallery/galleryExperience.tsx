"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import GalleryItem from "./GalleryItem";
import { galleryData } from "../../lib/gallery/galleryData";
import { createGalleryTimeline } from "../../lib/gallery/galleryTimeline";

// Register the ScrollTrigger plugin for Next.js
gsap.registerPlugin(ScrollTrigger);

export default function GalleryExperience() {
  // Setup Refs for GSAP
  const triggerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const endingRef = useRef<HTMLDivElement>(null);
  // React 19 standard way to handle an array of refs
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    // gsap.context handles cleanup automatically for React
    const ctx = gsap.context(() => {
      // Ensure all elements exist before animating
      if (
        !triggerRef.current ||
        !stickyRef.current ||
        !titleRef.current ||
        !endingRef.current ||
        !wrapperRef.current ||
        imageRefs.current.length === 0
      ) {
        return;
      }

      ScrollTrigger.create({
        trigger: triggerRef.current,
        pin: stickyRef.current,
        start: "top top",
        end: "bottom bottom",
        
        
        onEnter: () => gsap.to("header, nav, .navbar", { yPercent: -150, opacity: 0, duration: 0.4, ease: "power2.out" }),
        onLeave: () => gsap.to("header, nav, .navbar", { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" }),
        onEnterBack: () => gsap.to("header, nav, .navbar", { yPercent: -150, opacity: 0, duration: 0.4, ease: "power2.out" }),
        onLeaveBack: () => gsap.to("header, nav, .navbar", { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" }),
      });

      // Initialize the timeline from our dedicated logic file
      createGalleryTimeline(
        triggerRef.current,
        stickyRef.current,
        titleRef.current,
        endingRef.current,
        wrapperRef.current,
        imageRefs.current
      );
    });

    return () => ctx.revert(); // Revert on unmount
  }, []);

  return (
    <div ref={triggerRef} className="relative h-full w-full">
      {/* Changed from 'sticky' to 'relative' because GSAP now perfectly pins this to the viewport */}
      <div
        ref={stickyRef}
        className="relative top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden will-change-transform"
      >
        {/* Global wrapper that handles the slow continuous scaling of the entire collage */}
        <div
          ref={wrapperRef}
          className="relative flex h-full w-full items-center justify-center will-change-transform"
        >
          {/* 1. Render all images hidden/blurred underneath the title */}
          {galleryData.map((img, i) => (
            <GalleryItem
              key={img.id}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              src={img.src}
              width={img.width}
              height={img.height}
              style={{ zIndex: img.zIndex }}
              priority={i < 4}
              loading={i >= 4 ? "lazy" : undefined}
            />
          ))}

          {/* 2. Central Yellow Bordered Title Frame */}
          <div
            ref={titleRef}
            className="absolute z-50 flex flex-col items-center justify-center will-change-transform"
          >
            <div className="relative bg-white border-[6px] border-[#E8920D] rounded-[2.5rem] py-6 px-10 md:py-8 md:px-16 shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center text-center">
              <h2 className="relative z-10 text-2xl md:text-4xl lg:text-[40px] text-[#FFC446] leading-tight font-[Firlest] lowercase drop-shadow-sm">
                PIONIR KESATRIA<br />2025
              </h2>
              
              <div className="absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] md:-bottom-[80px] md:-right-[80px] md:w-[200px] md:h-[200px] -z-10 animate-spin"
                   style={{ animationDuration: '10s' }}>
                <Image
                  src="/dokumentasi/GEAR.svg"
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>


          <div
            ref={endingRef}
            className="absolute z-50 flex flex-col items-center justify-center will-change-transform"
          >
            <div className="relative bg-white border-[6px] border-[#E8920D] rounded-[2.5rem] py-6 px-10 md:py-8 md:px-16 shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center text-center">
              <h2 className="relative z-10 text-2xl md:text-4xl lg:text-[40px] text-[#FFC446] leading-tight font-[Firlest] lowercase drop-shadow-sm">
                PIONIR KESATRIA 2026<br />Coming Soon
              </h2>
              
              <div className="absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] md:-bottom-[80px] md:-right-[80px] md:w-[200px] md:h-[200px] -z-10 animate-spin"
                   style={{ animationDuration: '10s' }}>
                <Image
                  src="/dokumentasi/GEAR.svg"
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}