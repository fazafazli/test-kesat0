"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import DefaultLayout from "@/utils/defaultlayout";
import { useScrollProgress } from "@/utils/useScrollProgress";
import "./SectionDua.css";

const YOUTUBE_VIDEO_ID = "zuJbK71Zjfo";

const GUNUNGAN_POSITIONS = ["g-outer-left", "g-inner-left", "g-inner-right", "g-outer-right"] as const;

function useAppearOnScroll(ref: React.RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

export default function SectionDua() {
  const [isVideoActivated, setIsVideoActivated] = useState(false);
  const section1Ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    section1Ref.current = document.getElementById("section-satu");
  }, []);
  const sectionRef = useScrollProgress<HTMLDivElement>({
    viewportStart: 0.65,
    cssVar: "--scroll-progress",
    reducedMotionValue: 1,
    mirrorTo: [{ ref: section1Ref, cssVar: "--lift-progress" }],
  });

  const videoFrameRef = useRef<HTMLDivElement | null>(null);
  const isVideoFrameVisible = useAppearOnScroll(videoFrameRef);

  const activateVideo = useCallback(() => {
    setIsVideoActivated(true);
  }, []);

  const handlePosterKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateVideo();
      }
    },
    [activateVideo]
  );

  return (
    <DefaultLayout className="!p-0 !gap-0" aria-label="Selamat Datang Kesatria Muda 2026">
      <div ref={sectionRef} id="section-dua" className="kesatria-section-2" aria-label="Selamat Datang Kesatria Muda 2026">
        <div className="kain-transition-wrapper" aria-hidden="true">
          <Image src="/section2/kain.svg" alt="" width={1920} height={383} className="block w-full h-auto" unoptimized loading="lazy" />
        </div>
        <div className="section-dua-inner">
          <div className="bg-pattern-wrapper" aria-hidden="true">
            <Image src="/section2/background.webp" alt="" fill sizes="100vw" className="object-cover opacity-70" loading="lazy" />
          </div>
          {GUNUNGAN_POSITIONS.map((cls) => (
            <Image
              key={cls}
              src="/section2/gunungan.webp"
              alt=""
              width={582}
              height={766}
              className={`gunungan ${cls}`}
              aria-hidden="true"
              loading="lazy"
            />
          ))}
          <div className="main-content-wrapper">
            <div className="logo-container">
              <Image src="/section2/logo.webp" alt="Logo Kesatria Muda 2026" width={155} height={124} className="w-full h-auto" loading="lazy" />
            </div>
            <div className="teks-section-dua">
              <h2 className="section-dua-gradient-text section-dua-hero-subtitle">SELAMAT DATANG</h2>
              <h1 className="section-dua-gradient-text hero-title-2">Kesatria Muda 2026</h1>
            </div>
            <div
              ref={videoFrameRef}
              className={`video-frame-container${isVideoFrameVisible ? " animate-in" : ""}${isVideoActivated ? " is-video-playing" : ""}`}
            >
              <Image src="/section2/baseVideo.svg" alt="" width={962} height={556} className="video-screen-layer screen-layer-5" aria-hidden="true" unoptimized loading="lazy" />
              <div className="video-inner">
                {isVideoActivated ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=0&autoplay=1&rel=0&modestbranding=1`}
                    title="Video Kesatria Muda 2026"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Putar video Kesatria Muda 2026"
                    onClick={activateVideo}
                    onKeyDown={handlePosterKeyDown}
                    style={{ position: "absolute", inset: 0, cursor: "pointer" }}
                  >
                    <Image
                      src={`https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 1600px) 960px, (max-width: 640px) 75vw, 66vw"
                      className="object-cover"
                      aria-hidden="true"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                )}
              </div>
              <Image src="/section2/frameVideo.svg" alt="" width={974} height={564} className="video-screen-layer screen-layer-2" aria-hidden="true" unoptimized loading="lazy" />
              <Image src="/section2/playVideo.svg" alt="" width={167} height={175} className="video-screen-layer screen-layer-1" aria-hidden="true" unoptimized loading="lazy" />
            </div>
          </div>
          <div className="smoke-wrapper" aria-hidden="true">
            <Image src="/section2/efek.webp" alt="" width={1920} height={280} className="w-full h-auto" loading="lazy" />
          </div>
        </div>
        <div className="awan-transition-wrapper" aria-hidden="true">
          <Image src="/section2/awan.svg" alt="" width={1920} height={659} className="block w-full h-auto" unoptimized loading="lazy" />
        </div>
      </div>
    </DefaultLayout>
  );
}