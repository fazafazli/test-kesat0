"use client";

import DefaultLayout from "@/utils/defaultlayout";
import Image from "next/image";
import "@/styles/sections/section-satu.css";

export default function SectionSatu() {
  return (
    <section id="section-satu" className="section-satu">
      <Image
        src="/section1/EfekWelcome.svg"
        alt=""
        aria-hidden="true"
        className="bg-efek"
        unoptimized
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '100%' }}
      />
      <Image
        src="/section1/background1.webp"
        alt=""
        aria-hidden="true"
        className="bg-main"
        priority
        fetchPriority="high"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '100%' }}
      />

      <DefaultLayout className="py-0! px-0! gap-0! justify-center! items-center! min-h-screen! max-w-none!">
        <div className="teks-wrapper">
          <h1 className="gradient-text teks-sambutan">SELAMAT DATANG</h1>
          <h1 className="gradient-text teks-judul">Kesatria Muda</h1>
          <h1 className="gradient-text teks-tahun">2026</h1>
        </div>
      </DefaultLayout>

      <div className="border-awan">
        <Image
          src="/section2/awan.svg"
          alt="AwanBorder"
          width={300}
          height={300}
          className="BorderAwan"
        />
      </div>
      <div className="burung-wrapper">
        <Image
          src="/section1/Burung2.svg"
          alt="Burung"
          width={300}
          height={300}
          className="Burung"
        />
      </div>
      <div className="awan1-wrapper">
        <Image
          src="/section1/Awan1.svg"
          alt="Awan 1"
          width={300}
          height={300}
          className="Awan1"
        />
      </div>
      <div className="awan2-wrapper">
        <Image
          src="/section1/Awan2.svg"
          alt="Awan 2"
          width={300}
          height={300}
          className="Awan2"
        />
      </div>
      <div className="tugu-wrapper">
        <Image
          src="/section1/TuguTeknik.svg"
          alt="Tugu Teknik"
          width={300}
          height={300}
          className="TuguTeknik"
        />
      </div>
    </section>
  );
}