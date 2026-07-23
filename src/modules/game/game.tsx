"use client";

import Image from "next/image";
import DefaultLayout from "@/utils/defaultlayout";
import dynamic from "next/dynamic";
import PageFooter from "../../components/footer/Footer";
import "./game.css";

const GamePage = dynamic(
  () => import("../../modules/game/FlappyMinigame/pages/GamePage"),
  { ssr: false },
);

export default function game() {
  return (
    <section className="relative w-full min-h-screen md:min-h-[calc(120vh-80px)] lg:min-h-[calc(180vh-80px)] bg-[#5e0609] overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[url('/section1/PatternMerah.svg')] bg-repeat bg-[length:100%_auto] opacity-5" />

      <div className="absolute inset-0 z-[3] opacity-10">
        <Image
          src="/dokumentasi/lightning.svg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="animate-slideInInverse inset-0 w-full h-full pointer-events-none">
        <div className="animate-wiggleInverse">
          <Image
            src="/dokumentasi/Awan.svg"
            alt=""
            className="absolute top-40 sm:top-40 md:top-75 lg:top-74 left-[-6%] z-[0] w-[20vh] sm:w-[20vh] md:w-[20vh] lg:w-[45vh] h-auto transform -scale-x-100"
            width={100}
            height={80}
          />
        </div>
      </div>

      <div className="animate-slideIn">
        <div className="animate-wiggle">
          <Image
            src="/dokumentasi/Awan.svg"
            alt=""
            className="absolute top-65 sm:top-90 md:top-120 lg:top-150 right-[-7.5%] z-[0] w-[30vh] sm:w-[30vh] md:w-[30vh] lg:w-[60vh] h-auto -scale-x-100"
            width={100}
            height={80}
          />
        </div>
      </div>

      <DefaultLayout className="px-2 w-full" style={{ paddingTop: "180px" }}>
        <div className="hero-title-area">
          <div className="animate-fadeInDown">
            <h1 className="hero-title page-title m-0 p-0 text-3xl sm:text-3xl md:text-[64px] lg:text-[84px] leading-none font-Firlest lowercase">
              permainan
            </h1>
            <h1 className="hero-title page-title m-0 p-0 text-3xl sm:text-3xl md:text-[64px] lg:text-[84px] leading-none font-Firlest lowercase">
              interaktif
            </h1>
          </div>
        </div>

        <div className="relative mt-5 sm:mt-8 w-full max-w-[1500px] mx-auto flex justify-center">
          <div className="relative w-full max-w-[1500px] [--nala-w:220px] sm:[--nala-w:320px] md:[--nala-w:420px] lg:[--nala-w:520px]">
            <Image
              src="/dokumentasi/nala2.webp"
              alt=""
              className="animate-fadeInUp pointer-events-none absolute right-[-5rem] -top-10 z-0 h-auto -translate-y-1/2 object-contain md:-top-13 md:right-[-6rem] lg:-top-15 lg:right-[-10rem]"
              style={{ width: "var(--nala-w)" }}
              width={400}
              height={360}
            />
            <div className="w-full aspect-[2/3] rounded-2xl md:rounded-[32px] border-[8px] md:border-[16px] border-[#E8920D] bg-[#FDF5E6] shadow-2xl relative overflow-hidden z-10 max-h-[calc(100dvh-280px)]">
              <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 ">
                <div className="w-full max-w-[840px] h-full">
                  <GamePage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>

      <div className="relative flex justify-center pb-1 mt-4 sm:mt-0">
        <Image
          src="/dokumentasi/Dekor.svg"
          alt=""
          className="w-[10vw] sm:w-[8vw] md:w-[6vw] max-w-[80px]"
          width={100}
          height={100}
        />
      </div>

      <PageFooter />
    </section>
  );
}
