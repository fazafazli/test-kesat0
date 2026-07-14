"use client";

import Image from "next/image";
import DefaultLayout from "@/utils/defaultlayout";
import FaqSection from "@/app/components/faq/FaqSection";
import PageFooter from "@/app/components/footer/Footer";
import "./faq.css";

const customQuestions = [
  {
    question: "Untuk ketentuan topi cap berwarna hitam apakah harus polos ?",
    answer:
      "Disarankan untuk polos, tetapi apabila tidak memungkinkan setidaknya terlihat dominan hitam",
  },
  {
    question: "Pembagian forum dan akses Elok dapat dilihat dimana?",
    answer:
      "Di Simaster (Akademik Kemahasiswaan -> Kemahasiswaan -> Pionir Gadjah Mada (d.h. PPSMB) -> Fakultas/Sekolah Vokasi",
  },
  {
    question: "Apakah Jurnal harus dijilid dengan metode tertentu?",
    answer: "Penjilidan untuk jurnal dengan sampul plastik mika bening",
  },
  {
    question: "Ukuran untuk tanda pengenal tas apakah ditentukan?",
    answer: "Ukuran tanda pengenal tas yaitu 100 mm x 100 mm",
  },
  {
    question:
      "Untuk perlengkapan formasi angkatan apakah cukup membawa bahan saja atau sudah dibuat dari rumah?",
    answer:
      "Perlengkapan formasi sudah harus jadi dibuat dari rumah sesuai dengan ketentuan yang telah diberikan pada Modul Atribut",
  },
  {
    question: "Apakah tas berwarna bebas?",
    answer:
      "Tas adalah tas ransel dengan warna menyesuaikan ketentuan universitas dan dilengkapi tanda pengenal tas",
  },
  {
    question:
      "Apakah soal Sejarah Fakultas Teknik di jurnal harus dikerjakan terlebih dahulu sebelum hari Pionir Kesatria 2026?",
    answer: "Tidak, jurnal diisi saat hari pelaksanaan Pionir Kesatria 2026",
  },
  {
    question:
      "Jenis kertas untuk print name tag, tanda pengenal tas, dan jurnal apakah kertas HVS biasa atau jenis kertas yang lain?",
    answer: "HVS biasa dengan ukuran sesuai dengan ketentuan pada Modul Atribut",
  },
];

export default function FAQ() {
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

      {/* Bando atas - full width */}
      <div className="animate-fadeInDown pointer-events-none">
        <Image
          src="/dokumentasi/bandoatas.svg"
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
          className="absolute top-20 md:top-32 lg:top-[130px] left-0 sm:left-[2%] md:left-[4%] lg:left-[6%] z-[0] w-[15vh] sm:w-[100px] md:w-[30vh] lg:w-[45vh] h-auto transform -scale-x-100"
          width={100}
          height={80}
        />
      </div>

      {/* Awan kanan */}
      <div className="animate-slideIn absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/dokumentasi/Awan.svg"
          alt=""
          className="absolute top-20 md:top-32 lg:top-[300px] right-0 sm:right-[2%] md:right-[4%] lg:right-[6%] z-[0] w-[15vh] sm:w-[20vh] md:w-[45vh] lg:w-[60vh] h-auto -scale-x-100"
          width={100}
          height={80}
        />
      </div>

      <DefaultLayout className="pt-28 px-2 w-full">
        <div className="z-[3] flex w-full flex-col items-center justify-start text-center px-4 pt-6 md:pt-36 lg:pt-48 pb-6">
          <h1 className="faq-title m-0 p-0 text-3xl sm:text-3xl md:text-[64px] lg:text-[84px] leading-none font-[Firlest] lowercase">
            frequently asked questions
          </h1>
          <p className="mt-2 sm:mt-3 font-[Poppins] font-normal text-xs sm:text-sm md:text-base text-[rgba(252,240,214,0.8)]">
            Ketuk pertanyaan untuk melihat jawabannya
          </p>
        </div>

        <div className="relative w-full max-w-3xl mx-auto flex flex-col gap-4 sm:gap-5 px-4 sm:px-6 md:px-0 pb-20 z-10">
          <FaqSection data={customQuestions} allowMultiple />
        </div>
      </DefaultLayout>

      <div className="relative flex justify-center pb-1 mt-4 sm:mt-0 z-[3]">
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