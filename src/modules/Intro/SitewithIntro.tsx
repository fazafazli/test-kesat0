"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import IntroKesatria from "./IntroKesatria";
import "./SitewithIntro.css";
import AudioButton from "../../components/audio/AudioButton";

interface SiteWithIntroProps {
  children: React.ReactNode;
  birdImageSrc?: string;
  logoImageSrc?: string;
  wayangKiriAtasSrc?: string;
  wayangKiriBawahSrc?: string;
  wayangKananAtasSrc?: string;
  wayangKananBawahSrc?: string;
}

type Phase = "intro" | "revealing" | "done";
const REVEAL_DURATION_MS = 1500;

export default function SiteWithIntro({
  children,
  birdImageSrc = "/burung.png",
  logoImageSrc,
  wayangKiriAtasSrc,
  wayangKiriBawahSrc,
  wayangKananAtasSrc,
  wayangKananBawahSrc,
}: SiteWithIntroProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [siteRevealed, setSiteRevealed] = useState(false);
  const [locked, setLocked] = useState(true);
  const canSkip = useRef(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const reveal = useCallback(() => {
    if (!canSkip.current) return;
    canSkip.current = false;
    setLocked(false);
    setSiteRevealed(true);
    setPhase("revealing");
    setTimeout(() => setPhase("done"), REVEAL_DURATION_MS + 50);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (locked) {
      html.style.overflow = "hidden";
      html.style.height = "100%";
      body.style.overflow = "hidden";
      body.style.height = "100%";
      body.style.touchAction = "none";
      body.style.overscrollBehavior = "none";
    }
    return () => {
      html.style.overflow = "";
      html.style.height = "";
      body.style.overflow = "";
      body.style.height = "";
      body.style.touchAction = "";
      body.style.overscrollBehavior = "";
    };
  }, [locked]);

  useEffect(() => {
    const onScroll = (e: Event) => {
      if (!canSkip.current) return;
      e.preventDefault();
      reveal();
    };

    const onKeyScroll = (e: KeyboardEvent) => {
      if (!canSkip.current) return;
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          " ",
          "Space",
          "PageUp",
          "PageDown",
          "Home",
          "End",
        ].includes(e.key)
      ) {
        e.preventDefault();
        reveal();
      }
    };

    window.addEventListener("wheel", onScroll, { passive: false });
    window.addEventListener("touchmove", onScroll, { passive: false });
    window.addEventListener("keydown", onKeyScroll);

    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("keydown", onKeyScroll);
    };
  }, [reveal]);

  const handleIntroFinish = () => {
    canSkip.current = false;
    setPhase("revealing");
    setTimeout(() => {
      setPhase("done");
      setLocked(false);
    }, REVEAL_DURATION_MS + 50);
  };

  const handleSectionAppear = () => {
    setSiteRevealed(true);
  };

  return (
    <div className="site-wrap">
      {phase !== "done" && (
        <>
          {locked && (
            <style>{`
              html, body {
                overflow: hidden !important;
                height: 100% !important;
              }
              body {
                touch-action: none !important;
                overscroll-behavior: none !important;
              }
            `}</style>
          )}
          <IntroKesatria
            birdImageSrc={birdImageSrc}
            logoImageSrc={logoImageSrc}
            wayangKiriAtasSrc={wayangKiriAtasSrc}
            wayangKiriBawahSrc={wayangKiriBawahSrc}
            wayangKananAtasSrc={wayangKananAtasSrc}
            wayangKananBawahSrc={wayangKananBawahSrc}
            onFinish={handleIntroFinish}
            onSectionAppear={handleSectionAppear}
          />
          {locked && (
            <button
              onClick={reveal}
              className="intro-skip"
              aria-label="Skip intro"
            >
              Skip
            </button>
          )}
        </>
      )}

      {siteRevealed && !locked && <AudioButton />}
      
      <div
        className={`site-content${siteRevealed ? " reveal" : ""}${siteRevealed && phase !== "done" ? " slide-up" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
