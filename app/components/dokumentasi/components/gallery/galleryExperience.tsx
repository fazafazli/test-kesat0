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

      // --- Fix for "images pile up unstyled, then snap into place later" ---
      // This turned out to have TWO causes, not one:
      //
      // 1. Images loading after ScrollTrigger's initial measurement
      //    (handled below by waiting for every <img> to finish loading).
      //
      // 2. Next.js 16 production builds split CSS into multiple chunks and
      //    `<link rel="preload">` them, but the browser can apply/execute
      //    some of those chunks noticeably AFTER the initial paint and
      //    even after `window.load` fires in some cases (visible as
      //    "preloaded but not used within a few seconds" console warnings
      //    in production — this does NOT happen in `next dev`, since dev
      //    serves CSS differently, which is why this only reproduced on
      //    Vercel and never on localhost). If a late-applied chunk contains
      //    layout-affecting rules (positioning, transforms, breakpoints),
      //    ScrollTrigger.refresh() can run against a layout that LOOKS
      //    complete (all images loaded) but isn't fully styled yet.
      //
      // Fix: wait for images AND for the window 'load' event AND two
      // animation frames after that, before the final refresh. This gives
      // the browser's paint/style pipeline a chance to settle even when
      // CSS chunks apply late, without needing to know which chunk or
      // component is responsible.
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

      // --- Additional safety net: ResizeObserver on the trigger element ---
      // The waits above cover the two known causes (image load, delayed CSS
      // chunk application), but rather than trying to enumerate every
      // possible cause of a late layout shift (web fonts swapping in,
      // other CSS modules on the page applying late, etc.), this watches
      // the actual EFFECT: if the trigger section's rendered height changes
      // at all after mount, something shifted the layout and pin
      // measurements are now stale — so just refresh again. Debounced
      // slightly and capped to avoid loops with GSAP's own pin-spacer
      // element changes.
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
        // stickyRef is pinned by ScrollTrigger's `pin` option, which GSAP
        // implements by fixing position via the wrapper it creates — this
        // element itself never receives a transform tween, so promoting it
        // achieves nothing but reserves a compositor layer for nothing.
        className="relative top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div
          ref={wrapperRef}
          // Deliberately no will-change here — see the layer-strategy note
          // in galleryTimeline.ts. This element hosts 11 independently
          // animating children; giving it its own promoted layer too is
          // what was causing the browser to fall back to repainting the
          // whole group instead of compositing cheaply.
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
              // Only the first ~2 images are truly above-the-fold at the
              // start of the pin; keeping priority at 4 was forcing extra
              // full-quality eager downloads that competed with the LCP image.
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