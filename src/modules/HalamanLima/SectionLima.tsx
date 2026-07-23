"use client";

import "@/styles/sections/section-lima.css";
import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "@/utils/defaultlayout";
import BoxKuning from "../../components/BoxKuning/BoxKuning";
import { useEffect } from "react";

export default function SectionLima() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    const elements = document.querySelectorAll(".fade-up");

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-lima">
      <Image
        src="./section5/SerpihanDaun1.svg"
        alt=""
        aria-hidden="true"
        width={200}
        height={200}
        className="SerpihanDaun1"
      />
      <Image
        src="./section5/SerpihanDaun2.svg"
        alt=""
        aria-hidden="true"
        width={200}
        height={200}
        className="SerpihanDaun2"
      />
      <div className="animate-wiggle">
        <Image
          src="./section5/AwanKecil1.svg"
          alt=""
          aria-hidden="true"
          width={200}
          height={200}
          className="AwanKecil1"
        />
      </div>

      <DefaultLayout className="px-0!">
        <div className="section-lima-inner fade-up">
          <div className="blok-intro">
            <h2 className="garis-text judul">Bagian 3:</h2>
            <h2 className="garis-text judul">Kesatria Muda Berkarya</h2>
            <p className="paragraf-text ParagrafPertama">
              Tentunya kesatria muda sebagai calon-calon insinyur muda akan
              menghadapi masalah-masalah yang terjadi di Indonesia baik itu dari
              sektor manufaktur, infrastruktur, dan energi. Di bagian 3 ini,
              kesatria muda akan mengerjakan sebuah masalah keteknikan yang mana
              nantinya akan melatih kemampuan berpikir kritis, problem solving,
              dan kerja sama.
            </p>
          </div>

          <div className="blok-karya">
            <div className="blok-karya-kiri">
              <h2 className="garis-text judul">Kesatria Muda Berkarya</h2>
              <p className="paragraf-text ParagrafKedua">
                Para kesatria muda diharapkan mampu mengaplikasikan pengetahuan
                dan keterampilan yang relevan serta pemahaman mendalam mengenai
                jurusan Teknik yang kesatria muda ambil untuk kontribusi mereka
                bagi bangsa dan negara di masa depan.
              </p>
              <Link
                href="https://drive.google.com/file/d/1yCOxfma_nqur0hfTd0SD_-pHxE9n5hRv/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-modul">
                  <span className="btn-modul-text">BACA MODUL</span>
                </button>
              </Link>
            </div>
            <div className="kolom-box-awan">
              <BoxKuning className="box-nala4">
                <Image
                  src="/section5/Nala4.webp"
                  alt="Nala 4"
                  width={1000}
                  height={1000}
                  className="nala-img"
                />
              </BoxKuning>
              <div className="animate-wiggleInverse">
                <Image
                  src="./section5/AwanKecil2.svg"
                  alt=""
                  aria-hidden="true"
                  width={300}
                  height={300}
                  className="AwanKecil2"
                />
              </div>
            </div>
          </div>

          <div className="blok-aplikatif">
            <div className="kolom-box-gear">
              <BoxKuning className="box-nala5">
                <Image
                  src="/section5/Nala5.webp"
                  alt="Nala 5"
                  width={1000}
                  height={1000}
                  className="nala-img"
                />
              </BoxKuning>
              <Image
                src="./section5/GEAR.svg"
                alt=""
                aria-hidden="true"
                width={300}
                height={300}
                className="GEAR"
              />
            </div>
            <div className="blok-aplikatif-kanan">
              <h2 className="garis-text judul">Karya Aplikatif</h2>
              <p className="paragraf-text ParagrafKetiga">
                Indonesia sebagai negara berkembang terus menghadapi berbagai
                tantangan dalam sektor manufaktur, infrastruktur, dan energi. Di
                era globalisasi dan revolusi industri 4.0, kebutuhan akan tenaga
                ahli di bidang teknik semakin meningkat. Kesatria muda sebagai
                calon-calon insinyur muda berperan penting dalam pembangunan
                berkelanjutan dan peningkatan kualitas hidup masyarakat.
              </p>
              <Link
                href="https://drive.google.com/file/d/1yCOxfma_nqur0hfTd0SD_-pHxE9n5hRv/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-modul">
                  <span className="btn-modul-text">BACA MODUL</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="blok-agenda-atribut">
            <div className="agenda-kiri">
              <h2 className="garis-text judul">Agenda &amp; Atribut</h2>
              <div className="agenda-tombol-wrapper">
                <Link
                  href="https://pionir.ugm.ac.id/2026/aktivitas/kegiatan/hari-3-fakultas/teknik/?from=fakultas-directory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-modul">
                    <span className="btn-modul-text">DAY 1</span>
                  </button>
                </Link>
                <Link
                  href="https://pionir.ugm.ac.id/2026/aktivitas/kegiatan/hari-4-fakultas/teknik/?from=fakultas-directory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-modul">
                    <span className="btn-modul-text">DAY 2</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="agenda-kanan">
              <Image
                src="/section5/Nala6.webp"
                alt=""
                aria-hidden="true"
                className="Nala-Agenda"
                width={1000}
                height={1000}
              />
            </div>
          </div>

          <Image
            src="./section5/SayapTerakhir.svg"
            alt=""
            aria-hidden="true"
            width={1000}
            height={1000}
            className="SayapTerakhir"
          />
        </div>
        <Image
        src="/section5/Ellipse254.svg"
        alt=""
        className="Ellipse1"
        width={300}
        height={300}
        />
      </DefaultLayout>

      <div className="footer-area">
        <Image
          src="/section5/SerpihanDaun2.svg"
          alt=""
          className="DaunFooter"
          width={300}
          height={300}
        />
        <Image
          src="/section3/PitaBaru2.svg"
          alt=""
          className="PitaFooter"
          width={300}
          height={300}
        />
        <Image
          src="/dokumentasi/footer.svg"
          alt=""
          className="Footer"
          width={500}
          height={200}
        />
        <Image
          src="/dokumentasi/SignEmas.webp"
          alt="Sign Emas"
          className="SignEmas"
          width={300}
          height={300}
        />
        <Image
          src="/section5/End1.svg"
          alt="End"
          className="End1"
          width={1600}
          height={1600}
        />
      </div>
    </section>
  );
}