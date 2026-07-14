"use client";

import DefaultLayout from "@/utils/defaultlayout";
import Image from "next/image";
import "./SectionSatu.css";

export default function SectionSatu() {
  return (
    <section id="section-satu" className="section-satu">
      {/* Background images */}
      <img src="/section1/EfekWelcome.svg" alt="" aria-hidden="true" className="bg-efek" />
      <img src="/section1/background1.svg" alt="" aria-hidden="true" className="bg-main" />

      {/* Teks utama */}
      <DefaultLayout className="py-0! px-0! gap-0! justify-center! items-center! min-h-screen! max-w-none!">
        <div className="teks-wrapper">
          <h1 className="gradient-text teks-sambutan">SELAMAT DATANG</h1>
          <h1 className="gradient-text teks-judul">Kesatria Muda</h1>
          <h1 className="gradient-text teks-tahun">2026</h1>
        </div>
      </DefaultLayout>

      {/* Dekorasi */}
      <div className="burung-wrapper">
        <Image src="/section1/Burung2.svg" alt="Burung" width={300} height={300} className="Burung" />
      </div>
      <div className="awan1-wrapper">
        <Image src="/section1/Awan1.svg" alt="Awan 1" width={300} height={300} className="Awan1" />
      </div>
      <div className="awan2-wrapper">
        <Image src="/section1/Awan2.svg" alt="Awan 2" width={300} height={300} className="Awan2" />
      </div>
      <div className="tugu-wrapper">
        <Image src="/section1/TuguTeknik.svg" alt="Tugu Teknik" width={300} height={300} className="TuguTeknik" />
      </div>
    </section>
  );
}