"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./IntroKesatria.css";
import Image from "next/image";

interface IntroKesatriaProps {
  onFinish?: () => void;
  onSectionAppear?: () => void;

  birdImageSrc: string;
  birdImageAlt?: string;
  logoImageSrc?: string;
  logoImageAlt?: string;

  wayangKiriAtasSrc?: string;
  wayangKiriBawahSrc?: string;
  wayangKananAtasSrc?: string;
  wayangKananBawahSrc?: string;
  wayangAlt?: string;
}

interface Spark {
  id: number;
  left: number;
  top: number;
  dx: string;
  dy: string;
  delay: number;
}

const FLYING_DELAY_MS = 2600;
const SECTION_APPEAR_DELAY_MS = 5500;
const FINISH_DELAY_MS = 5800;

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

export default function IntroKesatria({
  onFinish,
  onSectionAppear,
  birdImageSrc,
  birdImageAlt = "Burung",
  logoImageSrc,
  logoImageAlt = "Logo",
  wayangKiriAtasSrc,
  wayangKananAtasSrc,
  wayangAlt = "Wayang",
}: IntroKesatriaProps) {
  const [flying, setFlying] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const onFinishRef = useRef(onFinish);
  const onSectionAppearRef = useRef(onSectionAppear);
  useEffect(() => { onFinishRef.current = onFinish; });
  useEffect(() => { onSectionAppearRef.current = onSectionAppear; });


  useEffect(() => {
    const id = setTimeout(() => setSparks(makeSparks(40)), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const flyTimer = setTimeout(() => setFlying(true), FLYING_DELAY_MS);
    const sectionTimer = setTimeout(
      () => onSectionAppearRef.current?.(),
      SECTION_APPEAR_DELAY_MS,
    );
    const finishTimer = setTimeout(() => onFinishRef.current?.(), FINISH_DELAY_MS);
    return () => {
      clearTimeout(flyTimer);
      clearTimeout(sectionTimer);
      clearTimeout(finishTimer);
    };
  }, []);
  return (
    <div className={`rb-root${flying ? " flying" : ""}`}>
      <div className="rb-vignette" />

      <div className={`rb-red-flash${flying ? " show" : ""}`} />

      <div className="rb-frame">
        <span className="tl" />
        <span className="tr" />
        <span className="br" />
        <span className="bl" />
      </div>

      {wayangKiriAtasSrc && (
        <div className="rb-wayang-row rb-wayang-row-kiri">
          {wayangKiriAtasSrc && (
            <div className="rb-wayang rb-wayang--atas">
              <Image
                src={wayangKiriAtasSrc}
                alt={wayangAlt}
                draggable={false}
                width={950}
                height={950}
                priority
                sizes="(max-width: 450px) 250px, (max-width: 1000px) 650px, 950px"
                style={{ height: "auto" }}
              />
            </div>
          )}
        </div>
      )}
      {wayangKananAtasSrc && (
        <div className="rb-wayang-row rb-wayang-row-kanan">
          {wayangKananAtasSrc && (
            <div className="rb-wayang rb-wayang--atas">
              <Image
                src={wayangKananAtasSrc}
                alt={wayangAlt}
                draggable={false}
                width={950}
                height={950}
                priority
                sizes="(max-width: 450px) 250px, (max-width: 1000px) 650px, 950px"
                style={{ height: "auto" }}
              />
            </div>
          )}
        </div>
      )}

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
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className={`rb-bird-wrap${flying ? " flying" : ""}`}>
        <div className="rb-wing-flap">
          <Image
            className="rb-bird-img"
            src={birdImageSrc}
            alt={birdImageAlt}
            draggable={false}
            fill
            sizes="150vw"
            priority
            fetchPriority="high"
          />
        </div>
      </div>

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
                } as CSSProperties
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