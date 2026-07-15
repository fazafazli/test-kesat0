"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import GalleryItem from "./GalleryItem";
import { galleryData } from "../../lib/gallery/galleryData";
import { createGalleryTimeline } from "../../lib/gallery/galleryTimeline";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryExperience() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const endingRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let cancelled = false;
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const ctx = gsap.context(() => {
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

      const setNavbarHidden = (hidden: boolean) =>
        gsap.to("header, nav, .navbar", {
          yPercent: hidden ? -150 : 0,
          opacity: hidden ? 0 : 1,
          duration: 0.4,
          ease: "power2.out",
        });

      ScrollTrigger.create({
        trigger: triggerRef.current,
        pin: stickyRef.current,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => setNavbarHidden(true),
        onLeave: () => setNavbarHidden(false),
        onEnterBack: () => setNavbarHidden(true),
        onLeaveBack: () => setNavbarHidden(false),
      });

      createGalleryTimeline(
        triggerRef.current,
        stickyRef.current,
        titleRef.current,
        endingRef.current,
        wrapperRef.current,
        imageRefs.current
      );

      const handleViewportChange = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (cancelled) return;
          ScrollTrigger.refresh();
        }, 180);
      };

      window.addEventListener("orientationchange", handleViewportChange);
      window.addEventListener("resize", handleViewportChange);

      return () => {
        window.removeEventListener("orientationchange", handleViewportChange);
        window.removeEventListener("resize", handleViewportChange);
      };
    });

    return () => {
      cancelled = true;
      if (resizeTimeout) clearTimeout(resizeTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative h-full w-full">
      <div
        ref={stickyRef}
        className="relative top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div
          ref={wrapperRef}
          className="relative flex h-full w-full items-center justify-center"
        >
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
              priority={i < 2}
              loading={i >= 2 ? "lazy" : undefined}
            />
          ))}

          <div
            ref={titleRef}
            className="absolute z-50 flex flex-col items-center justify-center px-4"
          >
            <div className="relative bg-white border-[4px] sm:border-[6px] border-[#E8920D] rounded-[1.5rem] sm:rounded-[2.5rem] py-[clamp(1rem,4vw,2rem)] px-[clamp(1.25rem,6vw,4rem)] shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center text-center">
              <h2 className="relative z-10 text-[clamp(1.1rem,5vw,2.5rem)] text-[#FFC446] leading-tight font-[Firlest] lowercase drop-shadow-sm whitespace-nowrap">
                PIONIR KESATRIA<br />2025
              </h2>

              <div
                className="absolute -bottom-6 -right-6 sm:-bottom-12 sm:-right-12 w-[clamp(50px,14vw,200px)] h-[clamp(50px,14vw,200px)] md:-bottom-[80px] md:-right-[80px] -z-10 animate-spin pointer-events-none"
                style={{ animationDuration: "10s" }}
              >
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
            className="absolute z-50 flex flex-col items-center justify-center px-4"
          >
            <div className="relative bg-white border-[4px] sm:border-[6px] border-[#E8920D] rounded-[1.5rem] sm:rounded-[2.5rem] py-[clamp(1rem,4vw,2rem)] px-[clamp(1.25rem,6vw,4rem)] shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center text-center">
              <h2 className="relative z-10 text-[clamp(1rem,4.4vw,2.5rem)] text-[#FFC446] leading-tight font-[Firlest] lowercase drop-shadow-sm">
                PIONIR KESATRIA 2026<br />Coming Soon
              </h2>

              <div
                className="absolute -bottom-6 -right-6 sm:-bottom-12 sm:-right-12 w-[clamp(50px,14vw,200px)] h-[clamp(50px,14vw,200px)] md:-bottom-[80px] md:-right-[80px] -z-10 animate-spin pointer-events-none"
                style={{ animationDuration: "10s" }}
              >
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