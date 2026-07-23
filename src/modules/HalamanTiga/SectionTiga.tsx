"use client";

import DefaultLayout from "@/utils/defaultlayout";
import "@/styles/sections/section-tiga.css";
import Image from "next/image";
import Link from "next/link";
import BoxKuning from "../../components/BoxKuning/BoxKuning";
import { useCallback, useEffect, useState } from "react";

const VIDEO_ID = "QGtI48yhS7M";

function useActivateVideo() {
  const [isVideoActivated, setIsVideoActivated] = useState(false);

  const activateVideo = useCallback(() => {
    setIsVideoActivated(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateVideo();
      }
    },
    [activateVideo],
  );

  return { isVideoActivated, activateVideo, handleKeyDown };
}

export default function SectionTiga() {
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
        threshold: 0.001,
      },
    );

    const elements = document.querySelectorAll(".fade-up");

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const { isVideoActivated, activateVideo, handleKeyDown } = useActivateVideo();

  return (
    <section className="section-tiga">
      <Image
        src="/section3/SerpihanDaun2S3.svg"
        alt=""
        aria-hidden="true"
        width={300}
        height={300}
        className="SerpihanDaun2S3"
      />

      <DefaultLayout className="px-0! overflow-visible">
        <div className="section-tiga-inner fade-up">
          <div className="animate-wiggle">
            <Image
              src="./section3/AwanKecilAtas.svg"
              alt=""
              aria-hidden="true"
              width={900}
              height={900}
              className="AwanKecilAtas"
            />
          </div>
          <Image
            src="/section3/SayapPertama.svg"
            alt="Sayap Pertama"
            width={900}
            height={900}
            className="SayapPertamaImg"
          />
          <div className="bagian1">
            <h2 className="tiga-text judul-tiga">halo kesatria muda</h2>
            <h2 className="tiga-text judul-tiga">
              selamat datang di bagian 1:
            </h2>
            <h2 className="tiga-text judul-tiga">kesatria merajut karsa</h2>
          </div>
          <p className="paragraf1">
            Sebagai rumah baru bagi Kesatria Muda, Fakultas Teknik Universitas
            Gadjah Mada memiliki sejarah panjang sebagai salah satu Fakultas
            Teknik tertua di Indonesia. Dalam menapaki awal perkuliahan, sejarah
            bagaimana fakultas kita berdiri, termasuk bagaimana masa
            orientasinya dilahirkan adalah informasi yang penting untuk
            diketahui karena merupakan jati diri dari Fakultas Teknik UGM itu
            sendiri. Selain itu, jati dirimu sebagai Kesatria Muda juga perlu
            digali melalui &quot;Cita Mula Sang Arunara&quot; dan &quot;Kala Itihasa: Ketika
            Memori Bersuara&quot;.
          </p>
          <div className="BoxBesarWrapper">
            <div className="BoxBesar-inner">
              <div className="Box1Wrapper">
                <BoxKuning className="box-nala1">
                  <Image
                    src="/section3/Nala1.webp"
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
          <div className="btn-wrapper">
            <Link
              href="https://drive.google.com/file/d/12GmcCEc0uTeOdYaGil7a9AruoMJPKLhj/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="Button1">
                <span className="Button1-text">BACA MATERI</span>
              </button>
            </Link>
          </div>
          <Image
            src="./section3/AwanSedang1.svg"
            alt=""
            aria-hidden="true"
            width={300}
            height={300}
            className="AwanSedang1 animate-wiggleInverse"
          />
          <div className="bagian3">
            <div className="row-sejarah-kesatria">
              <div className="kolom-box-pita">
                <Image
                  src="./section3/AwanSedang1.svg"
                  alt=""
                  aria-hidden="true"
                  width={300}
                  height={300}
                  className="AwanSedang3 animate-wiggle"
                />

                <div
                  className={`VideoThumbWrapper${isVideoActivated ? " is-video-playing" : ""}`}
                >
                  <Image
                    src="/section2/baseVideo.svg"
                    alt=""
                    aria-hidden="true"
                    width={300}
                    height={300}
                    className="BaseVideo"
                  />

                  <div className="VideoInner">
                    {isVideoActivated ? (
                      <iframe
                        className="VideoIframe"
                        src={`https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=0&autoplay=1&rel=0&modestbranding=1`}
                        title="Video Sejarah Kesatria"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label="Putar video Sejarah Kesatria"
                        onClick={activateVideo}
                        onKeyDown={handleKeyDown}
                        style={{
                          position: "absolute",
                          inset: 0,
                          cursor: "pointer",
                        }}
                      >
                        <Image
                          src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 45vw"
                          className="object-cover"
                          aria-hidden="true"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>

                  <Image
                    src="/section2/frameVideo.svg"
                    alt=""
                    aria-hidden="true"
                    width={300}
                    height={300}
                    className="VideoVisual"
                  />
                  <Image
                    src="/section2/playVideo.svg"
                    alt="Putar"
                    width={300}
                    height={300}
                    className="PlayVideo"
                  />
                </div>

                <Image
                  src="/section3/PitaBaru2.svg"
                  alt="Pita 2"
                  width={300}
                  height={300}
                  className="PitaBaru2"
                />
              </div>

              <div className="kolom-teks-kesatria">
                <h2 className="tiga-text sejarahKesatria">Kala Itihasa: </h2>
                <h2 className="tiga-text sejarahKesatria">
                  Ketika Memori Bersuara
                </h2>
                <p className="paragraf4">
                  Fakultas Teknik Universitas Gadjah Mada lahir dari prakarsa
                  bakti dan cita-cita luhur dalam perjalanan yang panjang.
                  Sebagai mahasiswa baru, Kesatria Muda harus mengenal dekat
                  bagaimana perjalanan panjang tersebut, baik dari Fakultas
                  Teknik itu sendiri, maupun gerbang insiasi awalnya, yakni
                  PIONIR Kesatria. Video pengantar ini akan membawa Kesatria
                  Muda mengarungi alur sejarah yang dinamis, evolusi identitas
                  yang penuh makna, hingga lahirnya simbol-simbol abadi pencetak
                  para insinyur-insyinyur bangsa. Selamat menyaksikan!
                </p>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </section>
  );
}
