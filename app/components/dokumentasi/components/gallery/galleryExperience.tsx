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
    let ro: ResizeObserver | null = null;

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
          overwrite: "auto",
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

      const waitForWindowLoad = () =>
        new Promise<void>((resolve) => {
          if (document.readyState === "complete") {
            resolve();
          } else {
            window.addEventListener("load", () => resolve(), { once: true });
          }
        });

      const waitForImages = () =>
        new Promise<void>((resolve) => {
          if (!triggerRef.current) {
            resolve();
            return;
          }
          const imgEls = triggerRef.current.querySelectorAll("img");
          const pending = Array.from(imgEls).filter((img) => !img.complete);
          if (pending.length === 0) {
            resolve();
            return;
          }
          let remaining = pending.length;
          const onSettle = () => {
            remaining -= 1;
            if (remaining <= 0) resolve();
          };
          pending.forEach((img) => {
            img.addEventListener("load", onSettle, { once: true });
            img.addEventListener("error", onSettle, { once: true });
          });
        });

      createGalleryTimeline(
        triggerRef.current,
        stickyRef.current,
        titleRef.current,
        endingRef.current,
        wrapperRef.current,
        imageRefs.current
      );

      Promise.all([waitForImages(), waitForWindowLoad()]).then(() => {
        if (cancelled) return;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!cancelled) ScrollTrigger.refresh();
          });
        });
      });

      let resizeRefreshCount = 0;
      let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
      ro = new ResizeObserver(() => {
        if (cancelled || resizeRefreshCount >= 5) return;
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (cancelled) return;
          resizeRefreshCount += 1;
          ScrollTrigger.refresh();
        }, 150);
      });
      if (triggerRef.current) ro.observe(triggerRef.current);
    });

    return () => {
      cancelled = true;
      if (ro) ro.disconnect();
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
            className="absolute z-50 flex flex-col items-center justify-center"
          >
            <div className="relative bg-white border-[6px] border-[#E8920D] rounded-[2.5rem] py-6 px-10 md:py-8 md:px-16 shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center text-center">
              <h2 className="relative z-10 text-2xl md:text-4xl lg:text-[40px] text-[#FFC446] leading-tight font-[Firlest] lowercase drop-shadow-sm">
                PIONIR KESATRIA<br />2025
              </h2>

              <div
                className="absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] md:-bottom-[80px] md:-right-[80px] md:w-[200px] md:h-[200px] -z-10 animate-spin pointer-events-none"
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
            className="absolute z-50 flex flex-col items-center justify-center"
          >
            <div className="relative bg-white border-[6px] border-[#E8920D] rounded-[2.5rem] py-6 px-10 md:py-8 md:px-16 shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center text-center">
              <h2 className="relative z-10 text-2xl md:text-4xl lg:text-[40px] text-[#FFC446] leading-tight font-[Firlest] lowercase drop-shadow-sm">
                PIONIR KESATRIA 2026<br />Coming Soon
              </h2>

              <div
                className="absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] md:-bottom-[80px] md:-right-[80px] md:w-[200px] md:h-[200px] -z-10 animate-spin pointer-events-none"
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