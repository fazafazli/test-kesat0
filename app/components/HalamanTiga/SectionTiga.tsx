"use client";

import DefaultLayout from "@/utils/defaultlayout";
import "./SectionTiga.css";
import Image from "next/image";
import Link from "next/link";
import BoxKuning from "@/app/components/BoxKuning/BoxKuning";

export default function SectionTiga() {
  return (
    <section className="section-tiga">
      {/* Dekorasi absolut */}
      <Image
        src="/section3/SerpihanDaun2S3.svg"
        alt=""
        aria-hidden="true"
        width={300}
        height={300}
        className="SerpihanDaun2S3"
      />

      <DefaultLayout className="px-10! xl:px-10! 2xl:px-10! overflow-visible">
        <div className="section-tiga-inner">
          {/* Awan kecil atas + Sayap */}
          <Image
            src="./section3/AwanKecilAtas.svg"
            alt=""
            aria-hidden="true"
            width={900}
            height={900}
            className="AwanKecilAtas"
          />
          <Image
            src="/section3/SayapPertama.svg"
            alt="Sayap Pertama"
            width={900}
            height={900}
            className="SayapPertamaImg"
          />

          {/* Blok 1 — Judul */}
          <div className="bagian1">
            <h2 className="tiga-text judul-tiga">halo kesatria muda</h2>
            <h2 className="tiga-text judul-tiga">
              selamat datang di bagian 1:
            </h2>
            <h2 className="tiga-text judul-tiga">kesatria merajut karsa</h2>
          </div>

          {/* Blok 2 — Paragraf 1 */}
          <p className="paragraf1">
            Dalam mengenal Fakultas Teknik UGM sebagai lingkungan baru bagi
            Kesatria Muda yang akan menapaki dunia perkuliahan, tentunya
            membutuhkan pengetahuan tentang apa saja yang ada di Fakultas
            Teknik. Selain mengenal lingkungan baru, Kesatria Muda juga
            diharapkan dapat mulai mengenal diri sendiri melalui personal
            branding yang akan menunjukkan pribadi Kesatria Muda di lingkungan
            Fakultas Teknik UGM. Selain modul utama tentang personal branding,
            pada bagian 1 ini juga terdapat 2 video menarik yaitu "Sejarah
            Teknik" dan "Sejarah Kesatria" yang wajib ditonton sebelum kita
            bertemu secara offline di Pionir Kesatria nanti.
          </p>

          {/* Blok 3 — Box Besar + Paragraf 2 */}
          <div className="BoxBesarWrapper">
            <div className="BoxBesar-inner">
              <div className="Box1Wrapper">
                <BoxKuning className="box-nala1">
                  <Image
                    src="/section3/Nala1.svg"
                    alt="Nala 1"
                    width={900}
                    height={900}
                    className="nala-img"
                  />
                </BoxKuning>
              </div>
              <p className="paragraf2">
                Personal Branding dapat diartikan sebagai sebuah proses
                pengenalan potensi yang dimiliki seorang individu dalam
                masyarakat. Personal branding meliputi aspek seperti
                kepribadian, kemampuan, kekuatan diri, nilai, kelebihan, serta
                persepsi positif yang ada dalam diri dan dapat dituangkan dalam
                bentuk Curriculum Vitae (CV) atau resume. Get to Know FT UGM
                merupakan rangkaian pengenalan lingkungan Fakultas Teknik UGM
                yang meliputi pengetahuan umum tentang FT UGM. Pengetahuan umum
                ini berupa Sejarah berdirinya FT UGM, Kiprah FT UGM dari masa
                perjuangan hingga kini, serta perkenalan departemen dan prodi
                yang ada di FT UGM saat ini.
              </p>
            </div>
          </div>

          {/* Button 1 */}
          <div className="btn-wrapper">
            <Link href="https://drive.google.com/file/d/12GmcCEc0uTeOdYaGil7a9AruoMJPKLhj/view?usp=sharing">
              <button className="Button1">
                <span className="Button1-text">BACA MATERI</span>
              </button>
            </Link>
          </div>

          {/* Awan sedang 1 */}
          <Image
            src="./section3/AwanSedang1.svg"
            alt=""
            aria-hidden="true"
            width={300}
            height={300}
            className="AwanSedang1"
          />

          {/* Blok 4 — Sejarah Teknik */}
          <div className="grid-sejarah-teknik">
            {/* Kolom Kiri: Tugu + Teks */}
            <div className="kolom-kiri-sejarah">
              <div className="TuguSampingWrapper">
                <Image
                  src="/section3/TuguSamping.svg"
                  alt="Tugu Samping"
                  width={1200}
                  height={1200}
                  className="TuguSamping"
                />
              </div>
              <div className="bagian2">
                <h2 className="tiga-text sejarahTeknik">sejarah teknik</h2>
                <p className="paragraf3">
                  Fakultas teknik berdiri pada tahun 1949 ini menjadi salah satu
                  fakultas tertua di Universitas Gadjah Mada. Sampai saat ini
                  Fakultas Teknik terus mengalami berbagai penyesuaian dan
                  perkembangan. Mari simak video berikut ini!
                </p>
                <div className="btn-wrapper btn-wrapper--end">
                  <Link href="https://drive.google.com/file/d/12GmcCEc0uTeOdYaGil7a9AruoMJPKLhj/view?usp=sharing">
                  <button className="Button2">
                    <span className="Button2-text">BACA MATERI</span>
                  </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Pita + Box */}
            <div className="kolom-kanan-sejarah">
              <Image
                src="/section3/PitaBaru.svg"
                alt="Pita 1"
                width={900}
                height={900}
                className="PitaBaru1"
              />
              <BoxKuning className="box-nala2">
                <Image
                  src="/section3/Nala2.svg"
                  alt="Nala 2"
                  width={900}
                  height={900}
                  className="nala-img"
                />
              </BoxKuning>
              <Image
                src="./section3/AwanSedang2.svg"
                alt=""
                aria-hidden="true"
                width={300}
                height={300}
                className="AwanSedang2"
              />
            </div>
          </div>

          {/* Blok 5 — Sejarah Kesatria */}
          <div className="bagian3">
            <div className="row-sejarah-kesatria">
              {/* Kiri: Box + Pita */}
              <div className="kolom-box-pita">
                <Image
                  src="./section3/AwanSedang3.svg"
                  alt=""
                  aria-hidden="true"
                  width={300}
                  height={300}
                  className="AwanSedang3"
                />
                <BoxKuning className="box-nala3">
                  <Image
                    src="/section3/Nala3.svg"
                    alt="Nala 3"
                    width={1000}
                    height={1000}
                    className="nala-img"
                  />
                </BoxKuning>
                <Image
                  src="/section3/PitaBaru2.svg"
                  alt="Pita 2"
                  width={300}
                  height={300}
                  className="PitaBaru2"
                />
              </div>

              {/* Kanan: Teks */}
              <div className="kolom-teks-kesatria">
                <h2 className="tiga-text sejarahKesatria">sejarah kesatria</h2>
                <p className="paragraf4">
                  Indonesia sebagai negara berkembang terus menghadapi berbagai
                  tantangan dalam sektor manufaktur, infrastruktur, dan energi.
                  Di era globalisasi dan revolusi industri 4.0, kebutuhan akan
                  tenaga ahli di bidang teknik semakin meningkat. Kesatria muda
                  sebagai calon-calon insinyur muda berperan penting dalam
                  pembangunan berkelanjutan dan peningkatan kualitas hidup
                  masyarakat. Oleh karena itu, pendidikan teknik harus dapat
                  membekali pengetahuan dan keterampilan yang relevan serta
                  pemahaman mendalam tentang kontribusi mereka bagi bangsa.
                </p>
                <div className="btn-wrapper btn-wrapper--start">
                  <button className="Button3">
                    <span className="Button3-text">BACA MATERI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </section>
  );
}
