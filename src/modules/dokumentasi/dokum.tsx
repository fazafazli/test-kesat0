"use client";
import { useRef, useEffect } from "react";
import DefaultLayout from "@/utils/defaultlayout";
import Image from "next/image";
import GalleryExperience from "./components/gallery/galleryExperience";
import PageFooter from "../../components/footer/Footer";
import "./dokum.css";

export default function Dokum() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#5e0609] pointer-events-none">
        <div className="absolute inset-0 bg-[url('/section1/PatternMerah.svg')] bg-repeat bg-[length:100%_auto] opacity-5" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/dokumentasi/lightning.svg"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>

      <section className="relative z-10 w-full overflow-hidden flex flex-col">
        <div ref={heroRef} className="hero-header">
          <div className="animate-slideInInverse">
            <div className="animate-wiggle">
            <Image
              src="/dokumentasi/Awan.svg"
              alt=""
              className="hero-cloud hero-cloud-left"
              width={100}
              height={80}
            />
            </div>
          </div>

          <div className="animate-slideIn">
            <div className="animate-wiggleInverse">
            <Image
              src="/dokumentasi/Awan.svg"
              alt=""
              className="hero-cloud hero-cloud-right -scale-x-100"
              width={100}
              height={80}
            />
            </div>
          </div>

          <div className="animate-fadeInDown">
            <Image
              src="/dokumentasi/Sayap_kanan.svg"
              alt=""
              className="hero-wing hero-wing-right"
              width={569}
              height={260}
              priority
            />
            <Image
              src="/dokumentasi/Sayap_kiri.svg"
              alt=""
              className="hero-wing hero-wing-left"
              width={569}
              height={260}
              priority
            />
          </div>

          <DefaultLayout>
            <div className="hero-title-area">
              <div className="animate-fadeInDown">
                <h1 className="hero-title page-title m-0 p-0 text-3xl sm:text-3xl md:text-[64px] lg:text-[84px] leading-none font-Firlest lowercase">
                  dokumentasi
                </h1>
                <h1 className="hero-title page-title m-0 p-0 text-3xl sm:text-3xl md:text-[64px] lg:text-[84px] leading-none font-Firlest lowercase">
                  pionir kesatria 2026
                </h1>
                <p className="mt-2 sm:mt-3 font-Poppins font-normal text-xs sm:text-sm md:text-base text-[rgba(252,240,214,0.8)]">
                  Ikuti anak panah untuk menelusuri dokumentasi kegiatan Pionir Kesatria 2026
                </p>
              </div>
            </div>
          </DefaultLayout>

          <div className="scroll-hint animate-fadeInUp" aria-hidden="true">
            <Image
              src="/dokumentasi/anakPanah.webp"
              alt=""
              width={42}
              height={42}
              className="scroll-hint-arrow scroll-hint-arrow-1"
              unoptimized
              style={{ height: "auto" }}
            />
            <Image
              src="/dokumentasi/anakPanah.webp"
              alt=""
              width={42}
              height={42}
              className="scroll-hint-arrow scroll-hint-arrow-2"
              style={{ height: "auto" }}
            />
            <Image
              src="/dokumentasi/anakPanah.webp"
              alt=""
              width={42}
              height={42}
              className="scroll-hint-arrow scroll-hint-arrow-3"
              style={{ height: "auto" }}
            />
          </div>
        </div>

        <div className="gallery-pin-section relative h-[400vh] w-full">
          <GalleryExperience heroRef={heroRef} />
        </div>

        <div className="relative flex justify-center pb-1">
          <Image
            src="/dokumentasi/Dekor.svg"
            alt=""
            className="w-[6vw]"
            width={100}
            height={100}
          />
        </div>
        <PageFooter />
      </section>
    </>
  );
}