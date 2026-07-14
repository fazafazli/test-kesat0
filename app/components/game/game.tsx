"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import DefaultLayout from "@/utils/defaultlayout";
import GamePage from "./FlappyMinigame/pages/GamePage";

export default function game() {
  const textStyle: CSSProperties = {
    background: "linear-gradient(180deg, #fcf0d6, #fcf0d6, #fae4c6, #e89324, #ffffff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    WebkitTextStroke: "2px #E8920D",
    paintOrder: "stroke fill",
  };

  return (
          <section className="relative w-full min-h-screen md:min-h-[calc(120vh-80px)] lg:min-h-[calc(180vh-80px)] bg-[#5e0609] overflow-hidden flex flex-col justify-between">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 z-[1] bg-[url('/dokumentasi/Background.svg')] bg-repeat bg-[length:100%_auto] opacity-40" />
      
            {/* Decorative Lightning */}
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
                <Image
                  src="/dokumentasi/Awan.svg"
                  alt=""
                  className="absolute top-40 sm:top-40 md:top-75 lg:top-74 left-[-6%] z-[0] w-[20vh] sm:w-[20vh] md:w-[20vh] lg:w-[45vh] h-auto transform -scale-x-100"
                  width={100}
                  height={80}
                />
              </div>
            
            <div className="animate-slideIn">
              <Image
                src="/dokumentasi/Awan.svg"
                alt=""
                className="absolute top-65 sm:top-90 md:top-120 lg:top-150 right-[-7.5%] z-[0] w-[30vh] sm:w-[30vh] md:w-[30vh] lg:w-[60vh] h-auto -scale-x-100" 
                width={100}
                height={80}
              />
            </div>

            <div className="animate-fadeInUp">
              <Image
                src="/dokumentasi/nala2.webp"
                alt=""
                className="absolute top-30 sm:top-15 md:top-45 lg:top-25 right-[13%] z-[5] w-[50vw] md:w-[40vh] lg:w-[98vh] h-auto translate-x-1/2"
                width={200}
                height={160}
              />
            </div>

        <DefaultLayout className="pt-28 px-2 w-full">

<div className="animate-fadeInUp z-[3] flex w-full flex-col items-center justify-start text-center px-4 pt-[-25px] sm:pt-6 md:pt-36 lg:mt-[30] pb-0">
          {/* Headings */}
          <h1 className="m-0 p-0 text-3xl sm:text-3xl md:text-[64px] lg:text-[84px] leading-none font-[Firlest] lowercase" style={textStyle}>
            <span className="block md:inline">permainan</span>{' '}
            <span className="block md:inline">interaktif</span>
          </h1>
          </div>


          <div className="relative mt-5 sm:mt-8 w-full max-w-[1500px] mx-auto flex justify-center lg:max-h-calc(50vh-80px)">
            <div className="w-full max-w-[1500px] aspect-[2/3] lg:aspect-auto rounded-2xl md:rounded-[32px] border-[8px] md:border-[16px] border-[#E8920D] bg-[#FDF5E6] shadow-2xl relative overflow-hidden z-10">
              <div className="relative w-full h-auto flex items-center justify-center px-4 md:px-8 ">
                <div className="w-full max-w-[720px] h-full">
                  <GamePage />
                </div>
              </div>
            </div>
          </div>


      </DefaultLayout>
       <div className="relative w-full h-[150px] md:h-[300px] lg:h-[500px] pointer-events-none">
                   <Image
                     src="/dokumentasi/bando.svg"
                     alt=""
                     className="absolute bottom-[0vh] lg:bottom-[-6vh] left-[14vw] z-[2] w-[29vw] -translate-x-1/2"
                     width={600}
                     height={100}
                   />
             
                   {/* Footer Decorations */}
                   <Image
                     src="/dokumentasi/footer_dekor.svg"
                     alt=""
                     className="absolute bottom-[13vh] md:bottom-[28vh] lg:bottom-[42vh] left-0 w-[13.5vw]"
                     width={200}
                     height={200}
                   />
             
                   <Image
                     src="/dokumentasi/footer_dekor2.svg"
                     alt=""
                     className="absolute bottom-[14vh] md:bottom-[28vh] lg:bottom-[53vh] right-0 w-[13.5vw]"
                     width={200}
                     height={200}
                   />
             
                   <Image
                     src="/dokumentasi/dekorbawahgede.svg"
                     alt=""
                     className="absolute bottom-0 left-0 w-[99vw]"
                     width={1920}
                     height={200}
                     priority
                   />
             
                   <Image
                     src="/dokumentasi/dekorbawahkiri.svg"
                     alt=""
                     className="absolute bottom-0 right-0 z-[10] w-[97vw]"
                      width={1920}
                     height={400}
                   />
             
                   <Image
                     src="/dokumentasi/sayapluar.svg"
                     alt=""
                     className="absolute bottom-0 left-[65vw] z-[5] w-[70vw] -translate-x-1/2"
                     width={1000}
                     height={300}
                   />
             
                   <Image
                     src="/dokumentasi/footer.svg"
                     alt=""
                     className="absolute bottom-[10vh] md:bottom-[20vh] lg:bottom-[27vh] left-1/2 z-[5] w-[35vw] -translate-x-1/2"
                     width={500}
                     height={200}
                   />
             
                   <Image
                     src="/dokumentasi/Dekor.svg"
                     alt=""
                     className="absolute bottom-[17vh] md:bottom-[32vh] lg:bottom-[45vh] left-1/2 z-[5] w-[6vw] -translate-x-1/2"
                     width={100}
                     height={100}
                   />
             
                   <Image
                     src="/dokumentasi/SIGNEMAS.svg"
                     alt=""
                     className="absolute bottom-[4vh] left-[18vw] z-[5] w-[24vw]"
                     width={350}
                     height={350}
                   />
                   </div>
             
                 </section>
             
           );
       
             }