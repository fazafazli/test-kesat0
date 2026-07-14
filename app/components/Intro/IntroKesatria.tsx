"use client";

import React, { useEffect, useState } from "react";
import "./IntroKesatria.css";


{/*IntroKesatria*/}

interface IntroKesatriaProps {
  onFinish?: () => void;
  onSectionAppear?: () => void;
  
  birdImageSrc: string;
  birdImageAlt?: string;
  logoImageSrc?: string;
  logoImageAlt?: string;
}

interface Spark {
  id: number;
  left: number;
  top: number;
  dx: string;
  dy: string;
  delay: number;
}

const FLYING_DELAY_MS = 3500;
const SECTION_APPEAR_DELAY_MS = 7000;
const FINISH_DELAY_MS = 7300;

function makeSparks(count: number): Spark[] {
  return Array.from({ length: count }, (_, i) => {
    const dx = `${Math.random() * 320 - 160}px`;
    const dy = `${-180 - Math.random() * 340}px`;
    return {
      id: i,
      left: 50 + (Math.random() * 40 - 20),
      top: 78 + (Math.random() * 16 - 8),
      dx,
      dy,
      delay: 2.7 + Math.random() * 0.9,
    };
  });
}

export default function IntroRajaBrawijaya({
  onFinish,
  onSectionAppear,
  birdImageSrc,
  birdImageAlt = "Burung",
  logoImageSrc,
  logoImageAlt = "Logo",
}: IntroKesatriaProps) {
  const [playKey, setPlayKey] = useState(0);
  const [flying, setFlying] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => {
    setSparks(makeSparks(40));
  }, [playKey]);

  useEffect(() => {
    setFlying(false);
    const flyTimer = setTimeout(() => setFlying(true), FLYING_DELAY_MS);
    const sectionTimer = setTimeout(() => onSectionAppear?.(), SECTION_APPEAR_DELAY_MS);
    const finishTimer = setTimeout(() => onFinish?.(), FINISH_DELAY_MS);
    return () => {
      clearTimeout(flyTimer);
      clearTimeout(sectionTimer);
      clearTimeout(finishTimer);
    };
  }, [playKey]);
  useEffect(() => {
    const id = "rb-google-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Cinzel+Decorative:wght@700;900&family=EB+Garamond:ital,wght@0,400;1,400;1,500&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="rb-root" key={playKey}>
      <div className="rb-vignette" />

      {/* Latar berubah jadi merah polos begitu burung mulai terbang */}
      <div className={`rb-red-flash${flying ? " show" : ""}`} />

      <div className="rb-frame">
        <span className="tl" />
        <span className="tr" />
        <span className="br" />
        <span className="bl" />
      </div>

      <div className="rb-sparks">
        {sparks.map((s) => (
          <div
            key={s.id}
            className="rb-spark"
            style={
              {
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDelay: `${s.delay}s`,
                ["--dx" as string]: s.dx,
                ["--dy" as string]: s.dy,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Burung */}
      <div className={`rb-bird-wrap${flying ? " flying" : ""}`}>
        <div className="rb-wing-flap">
          <img className="rb-bird-img" src={birdImageSrc} alt={birdImageAlt} draggable={false} />
        </div>
      </div>

      {/* Logo */}
      <div className="rb-crest">
        <div className="rb-crest-ring">
          {logoImageSrc ? (
            <div
              className="rb-crest-logo"
              role="img"
              aria-label={logoImageAlt}
              style={
                {
                  ["--logo-url" as string]: `url(${logoImageSrc})`,
                } as React.CSSProperties
              }
            />
          ) : (
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M32 6 L40 20 L58 22 L45 34 L49 52 L32 43 L15 52 L19 34 L6 22 L24 20 Z"
                fill="none"
                stroke="#cf9d3f"
                strokeWidth={2}
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}