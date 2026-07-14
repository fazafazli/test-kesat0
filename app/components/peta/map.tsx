"use client";

import Image from "next/image";
import DefaultLayout from "@/utils/defaultlayout";
import PageFooter from "@/app/components/footer/Footer";
import "./map.css";

export default function PETA() {
  return (
    <section className="relative w-full min-h-screen bg-[#5e0609] overflow-hidden flex flex-col justify-between">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-[1] bg-[url('/dokumentasi/background.svg')] bg-repeat bg-[length:100%_auto] opacity-40" />

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

      {/* Bando atas - full width di semua ukuran layar */}
      <div className="animate-fadeInDown pointer-events-none">
        <Image
          src="/dokumentasi/awanbesaratas.svg"
          alt=""
          className="absolute top-5 md:top-15 lg:top-0 left-1/2 -translate-x-1/2 z-[2] w-screen max-w-none h-auto"
          width={1920}
          height={350}
        />
      </div>

      {/* Awan kiri */}
      <div className="animate-slideInInverse absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/dokumentasi/Awan.svg"
          alt=""
          className="absolute top-20 md:top-120 lg:top-150 left-0 sm:left-[2%] md:left-[4%] lg:left-[6%] z-[0] w-[15vh] sm:w-[100px] md:w-[30vh] lg:w-[45vh] h-auto transform -scale-x-100"
          width={100}
          height={80}
        />
      </div>

      {/* Awan kanan */}
      <div className="animate-slideIn absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/dokumentasi/Awan.svg"
          alt=""
          className="absolute top-20 md:top-80 lg:top-74 right-0 sm:right-[2%] md:right-[4%] lg:right-[6%] z-[0] w-[15vh] sm:w-[20vh] md:w-[45vh] lg:w-[60vh] h-auto -scale-x-100"
          width={100}
          height={80}
        />
      </div>

      <DefaultLayout className="pt-28 px-2 w-full">
        <div className="animate-fadeInUp z-[3] flex w-full flex-col items-center justify-start text-center px-4 pt-[-25px] sm:pt-6 md:pt-36 lg:mt-[30] pb-20">
          {/* Headings */}
          <h1 className="peta-title m-0 p-0 text-3xl sm:text-3xl md:text-[64px] lg:text-[84px] leading-none font-[Firlest] lowercase">
            3D maps fakultas teknik
          </h1>

          {/* Peringatan mode desktop */}
          <p className="mt-2 sm:mt-3 font-[Poppins] font-normal text-xs sm:text-sm md:text-base text-[rgba(252,240,214,0.8)] md:hidden">
            Gunakan mode desktop untuk pengalaman yang lebih baik
          </p>
        </div>

        <div className="relative mt-5 sm:mt-8 w-full max-w-[1100px] mx-auto flex justify-center px-3 sm:px-0">
          <div className="w-full max-w-[1100px] aspect-square xs:aspect-[4/3] sm:aspect-video rounded-xl sm:rounded-2xl md:rounded-[32px] border-4 sm:border-[8px] md:border-[16px] border-[#E8920D] bg-[#FDF5E6] shadow-2xl relative flex items-center justify-center p-2 sm:p-4 md:p-6 z-10">
            <iframe
              src="https://ft-ugm.world/"
              title="Digital Twin 3D FT UGM"
              className="w-full h-full border-none rounded-lg sm:rounded-[12px] md:rounded-[20px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
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