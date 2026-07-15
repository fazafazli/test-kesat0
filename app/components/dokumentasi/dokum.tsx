"use client";
import DefaultLayout from "@/utils/defaultlayout";
import Image from "next/image";
import GalleryExperience from "./components/gallery/galleryExperience";
import PageFooter from "@/app/components/footer/Footer";
import "./dokum.css";

export default function Dokum() {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#5e0609] pointer-events-none">
        <div className="absolute inset-0 bg-[url('/dokumentasi/background.svg')] bg-repeat bg-[length:100%_auto] opacity-40" />
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

      <section className="relative z-10 w-full min-h-[100svh] sm:min-h-[110svh] md:min-h-[calc(120vh-80px)] lg:min-h-[calc(220vh-100px)] overflow-hidden flex flex-col justify-between">

      <div className="absolute inset-0 w-full h-full pointer-events-none animate-slideInInverse">
        <Image
          src="/dokumentasi/Awan.svg"
          alt=""
          className="absolute top-20 md:top-36 lg:top-44 left-[2.5%] z-[5] w-[60px] sm:w-[100px] md:w-[140px] lg:w-[25vh] h-auto"
          width={100}
          height={80}
        />
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none animate-slideIn">
        <Image
          src="/dokumentasi/Awan.svg"
          alt=""
          className="absolute top-20 md:top-36 lg:top-44 right-[2.5%] z-[5] w-[60px] sm:w-[100px] md:w-[140px] lg:w-[25vh] h-auto -scale-x-100"
          width={100}
          height={80}
        />
      </div>

      <div className="animate-fadeInDown">
        <Image
          src="/dokumentasi/Sayap_kanan.svg"
          alt=""
          className="absolute top-24 sm:top-32 md:top-46 lg:top-44 left-[25%] z-[5] w-[46vw] sm:w-[50vw] md:w-[40vh] lg:w-[65vh] h-auto -translate-x-1/2"
          width={400}
          height={200}
          priority
        />
        <Image
          src="/dokumentasi/Sayap_kiri.svg"
          alt=""
          className="absolute top-24 sm:top-32 md:top-46 lg:top-44 left-[75%] z-[5] w-[46vw] sm:w-[50vw] md:w-[40vh] lg:w-[65vh] h-auto -translate-x-1/2"
          width={400}
          height={200}
          priority
        />
      </div>

      <DefaultLayout>
        <div className="z-[3] flex w-full flex-col items-center justify-start text-center px-4 pt-28 sm:pt-40 md:pt-56 lg:pt-40 pb-8 sm:pb-10">
          <div className="animate-fadeInDown">
            <h1 className="page-title m-0 p-0 text-[clamp(1.75rem,7vw,5.25rem)] leading-none font-[Firlest] lowercase">
              dokumentasi
            </h1>
            <h1 className="page-title m-0 p-0 text-[clamp(1.75rem,7vw,5.25rem)] leading-none font-[Firlest] lowercase mt-2">
              pionir kesatria 2026
            </h1>
          </div>
        </div>
      </DefaultLayout>

      <section className="gallery-pin-section relative h-[400vh] w-full">
        <GalleryExperience />
      </section>

      <div className="relative flex justify-center pb-1">
        <Image
          src="/dokumentasi/Dekor.svg"
          alt=""
          className="w-[10vw] sm:w-[8vw] md:w-[6vw]"
          width={100}
          height={100}
        />
      </div>
      <PageFooter />
      </section>
    </>
  );
}