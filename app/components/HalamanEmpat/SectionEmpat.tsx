"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import DefaultLayout from "@/utils/defaultlayout";
import "./SectionEmpat.css";

const ASSET = "/section4";

const INTRO =
  "Masa perkuliahan tentunya berbeda jika dibandingkan dengan masa saat sekolah. " +
  "Di masa sekolah, segala sesuatunya teratur dan memiliki jadwal yang pasti. " +
  "Selain itu, lingkup pergaulan yang akan ditemui di masa kuliah juga semakin luas dan beragam. " +
  "Ditambah lagi dengan kesibukan akademik dan di luar akademik yang cukup kompleks semasa kuliah. " +
  "Hal-hal tersebut harus dapat dikenali terlebih dahulu untuk menjadi bekal agar nantinya bisa " +
  "menyesuaikan diri dengan lingkungan yang baru. Yuk, kita sama-sama lihat apa saja kesibukan " +
  "di luar akademik pada bagian 2 ini.";

const TABS = [
  {
    id: "lika-liku",
    label: ["lika-liku", "kesatria"] as const,
    title: "lika-liku kesatria",
    description:
      "Perkuliahan adalah jenjang lebih tinggi yang diambil oleh seseorang setelah menyelesaikan " +
      "pendidikan menengah atas (SMA/SMK) atau sederajat. Sebelum memasuki dunia perkuliahan, " +
      "sebaiknya kesatria muda harus mengenal terlebih dahulu seputar perkuliahan sehingga nantinya " +
      "dapat mempersiapkan diri untuk menyesuaikan diri dengan lingkungan yang baru.",
    moduleUrl: "",
    imageUrl: "",
  },
  {
    id: "pengenalan",
    label: ["pengenalan", "jurusan"] as const,
    title: "pengenalan jurusan",
    description:
      "Mengenal jurusan merupakan langkah awal bagi kesatria muda untuk memahami bidang studi yang " +
      "akan ditempuh. Setiap jurusan memiliki karakter, proses pembelajaran, dan peluang " +
      "pengembangan diri yang berbeda.",
    moduleUrl: "https://drive.google.com/drive/folders/1Xi1blyhtOwFkR9p1zj9uwACzJ4EJ4kpb?usp=drive_link",
    imageUrl: "",
  },
  {
    id: "jelajah",
    label: ["jelajah", "lembaga"] as const,
    title: "jelajah lembaga",
    description:
      "Lembaga kemahasiswaan menjadi ruang bagi mahasiswa untuk belajar berorganisasi, " +
      "berkolaborasi, dan berkontribusi. Melalui lembaga, kesatria muda dapat memperluas " +
      "pengalaman di luar kegiatan akademik.",
    moduleUrl: "https://drive.google.com/file/d/1DNxnEgLgVN68kVmIsTBULdifiw8PRSrj/view?usp=drive_link",
    imageUrl: "",
  },
  {
    id: "pameran",
    label: ["pameran", "karya"] as const,
    title: "pameran karya",
    description:
      "Pameran karya menjadi wadah bagi mahasiswa Teknik untuk menunjukkan ide, proses, serta " +
      "hasil kreativitasnya. Kegiatan ini membantu mahasiswa mengembangkan keberanian dalam " +
      "menyampaikan karya.",
    moduleUrl: "https://drive.google.com/file/d/1tHMWj01j0MCjI0z5qPNJh4sZj3djfXwk/view?usp=drive_link",
    imageUrl: "",
  },
  {
    id: "fasilitas",
    label: ["fasilitas", "teknik"] as const,
    title: "fasilitas teknik",
    description:
      "Fakultas Teknik memiliki berbagai fasilitas pendukung pembelajaran dan pengembangan karya, " +
      "mulai dari laboratorium, ruang diskusi, hingga fasilitas praktik yang dapat dimanfaatkan " +
      "mahasiswa.",
    moduleUrl: "https://drive.google.com/file/d/1gWa9zYExKd6zxOvax9plinHqTxY1D1cC/view?usp=drive_link",
    imageUrl: "",
  },
] as const;

const WAYANG_LEFT = [["abiyasa", "wl1"], ["batari", "wl2"], ["sadewa", "wl3"]] as const;
const WAYANG_RIGHT = [["gatotkaca", "wr1"], ["srikandi", "wr2"], ["subadra", "wr3"], ["abimanyu", "wr4"]] as const;

type TabId = (typeof TABS)[number]["id"];

function useAppearOnScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("animate-in");
        } else {
          section.classList.remove("animate-in");
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [ref]);
}

const WayangGroup = memo(function WayangGroup({
  items,
  side,
}: {
  items: ReadonlyArray<readonly [name: string, cls: string]>;
  side: "left" | "right";
}) {
  return (
    <div className={`bd-wgroup bd-w${side}`} aria-hidden="true">
      {items.map(([name, cls]) => (
        <div key={name} className={`bd-wchar ${cls}`}>
          <Image
            src={`${ASSET}/${name}.svg`}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 34vw, 22vw"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
});

export default function SectionEmpat() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<TabId>("lika-liku");

  useAppearOnScroll(sectionRef);

  const active = useMemo(() => TABS.find((t) => t.id === activeId) ?? TABS[0], [activeId]);

  const focusTab = useCallback((index: number) => {
    const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']");
    buttons?.[index]?.focus();
  }, []);

  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const delta = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (delta !== undefined) {
        e.preventDefault();
        const next = (currentIndex + delta + TABS.length) % TABS.length;
        setActiveId(TABS[next].id);
        focusTab(next);
        return;
      }
      if (e.key === "Home") { e.preventDefault(); setActiveId(TABS[0].id); focusTab(0); }
      if (e.key === "End") { e.preventDefault(); setActiveId(TABS[TABS.length - 1].id); focusTab(TABS.length - 1); }
    },
    [focusTab],
  );

  return (
    <div className="bd-section-wrapper">
      <div className="bd-stage" aria-hidden="true">
        <WayangGroup side="left" items={WAYANG_LEFT} />
        <WayangGroup side="right" items={WAYANG_RIGHT} />
      </div>

      <DefaultLayout className="!p-0 !gap-0" aria-label="Bagian 2: Lika-liku Kesatria">
        <div id="bagian-dua" ref={sectionRef} className="bd-section" aria-label="Bagian 2: Lika-liku Kesatria">
            <div className="bd-kain-transition-wrapper" aria-hidden="true">
            <Image
              src={`/section2/kain.svg`}
              alt=""
              width={1920}
              height={383}
              className="block w-full h-auto"
              unoptimized
              loading="lazy"
            />
          </div>

          <div className="bd-bg" aria-hidden="true">
            <Image
              src={`${ASSET}/background.svg`}
              alt=""
              fill
              unoptimized
              sizes="100vw"
              className="bd-bg-art"
            />
          </div>

          <div className="bd-cloud" aria-hidden="true">
            <Image
              src={`${ASSET}/awan.svg`}
              alt=""
              fill
              unoptimized
              sizes="120vw"
              className="bd-cloud-img"
              draggable={false}
            />
          </div>

          <div className="bd-inner">
            <div className="font-[Poppins] relative mx-auto flex w-full flex-col items-center gap-0 px-4 py-0 sm:px-8 xl:px-30 xl:py-0 2xl:px-60">
              <div className="relative w-full max-w-[1440px]">
                <div className="bd-content">
                  <header className="bd-header">
                    <span className="bd-grad bd-eyebrow" aria-hidden="true">bagian 2:</span>
                    <h2 className="bd-grad bd-title">lika-liku kesatria</h2>
                  </header>

                  <p className="bd-intro">{INTRO}</p>

                  <article id="bd-panel" className="bd-card" role="tabpanel" aria-labelledby={`bd-tab-${active.id}`}>
                    <div key={active.id} className="bd-card-body">
                      <h3 className="bd-grad bd-card-title">{active.title}</h3>

                      <div className="bd-grid">
                        <div className="bd-frame">
                          <div className="bd-frame-inner">
                            {active.imageUrl ? (
                              <Image
                                src={active.imageUrl}
                                alt={active.title}
                                fill
                                unoptimized
                                sizes="(max-width: 640px) 60vw, 18vw"
                                className="bd-frame-img"
                              />
                            ) : (
                              <span className="bd-empty">foto<br />belum tersedia</span>
                            )}
                          </div>
                        </div>

                        <div className="bd-copy">
                          <div className="bd-desc-box">
                            <p className="bd-desc">{active.description}</p>
                          </div>

                          {active.moduleUrl && (
                            <a href={active.moduleUrl} target="_blank" rel="noopener noreferrer" className="bd-cta">
                              Baca Materi
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>

                  <div ref={tabListRef} className="bd-tablist" role="tablist" aria-label="Pilihan informasi bagian dua">
                    {TABS.map((tab, i) => {
                      const isActive = tab.id === activeId;
                      return (
                        <button
                          key={tab.id}
                          id={`bd-tab-${tab.id}`}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-controls="bd-panel"
                          tabIndex={isActive ? 0 : -1}
                          className={`bd-tab${isActive ? " is-on" : ""}`}
                          onClick={() => setActiveId(tab.id)}
                          onKeyDown={(e) => handleTabKeyDown(e, i)}
                        >
                          <Image
                            src={`${ASSET}/${isActive ? "but1.svg" : "but2.svg"}`}
                            alt=""
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 16.5vw, 8.5vw"
                            className="bd-tab-bg"
                            aria-hidden="true"
                            draggable={false}
                          />
                          <span className="bd-tab-label" aria-label={tab.label.join(" ")}>
                            <span>{tab.label[0]}</span>
                            <span>{tab.label[1]}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}