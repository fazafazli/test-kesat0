"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/NavigationBar/Navbar";

export default function NotFound() {
  return (
    <div className="relative min-h-dvh w-full bg-[#5e0609] overflow-hidden flex flex-col">
      <img src="/section1/EfekWelcome.svg" alt="" aria-hidden="true" className="absolute top-[-50px] left-0 w-full h-full object-cover opacity-40 z-[2] pointer-events-none" />
      <img src="/section1/background1.svg" alt="" aria-hidden="true" className="absolute top-[5%] left-0 w-full h-full object-cover z-[1] pointer-events-none" />

      <div className="relative z-[50]">
        <Navbar />
      </div>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-16 py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 max-w-6xl w-full animate-[nf-fade-up_0.7s_ease-out_both]">

          {/* Tugu — kolom kiri */}
          <div className="relative shrink-0">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-60 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(232,147,36,0.35) 0%, transparent 70%)",
                transform: "scale(1.5)",
              }}
            />
            <div
              className="relative w-[clamp(200px,24vw,380px)] aspect-[873/871] drop-shadow-[0_18px_30px_rgba(0,0,0,0.4)]"
              style={{ animation: "nf-float 4.5s ease-in-out infinite" }}
            >
              <Image
                src="/section3/TuguSamping.svg"
                alt=""
                fill
                className="object-contain"
                sizes="(max-width:768px) 200px, 380px"
                priority
              />
            </div>
          </div>

          {/* Teks — kolom kanan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1
              className="font-Firlest font-[500] leading-[0.9] m-0 select-none"
              style={{
                fontSize: "clamp(5rem, 10vw, 9rem)",
                background: "linear-gradient(180deg,#fcf0d6,#fcf0d6,#fae4c6,#e89324,#ffffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                WebkitTextStroke: "clamp(1px,0.2vw,2.5px) #e8920d",
                paintOrder: "stroke fill",
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.35))",
              }}
            >
              404
            </h1>

            <p
              className="font-Poppins font-[500] leading-[1.6] m-0 mt-2"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.75rem)",
                background: "linear-gradient(180deg,#fcf0d6,#fae9d0,#f9e3c8,#f7dcc0,#fae4c6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Halaman yang anda cari tidak ada
            </p>

            <Link
              href="/"
              className="group inline-block mt-8 px-[clamp(1.8rem,3.5vw,2.6rem)] py-[clamp(0.8rem,1.6vw,1.1rem)] whitespace-nowrap bg-[#f5ecd4] border-[3px] border-[#c8973a] outline outline-[3px] outline-[#e8b86d] outline-offset-[-6px] rounded-2xl font-Poppins font-bold tracking-[2px] shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_3px_rgba(255,255,255,0.4)] transition-all duration-300 hover:bg-[#eedfc0] hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-[0_10px_28px_rgba(0,0,0,0.6),inset_0_1px_3px_rgba(255,255,255,0.4)] active:translate-y-[1px] active:scale-100"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)" }}
            >
              <span
                style={{
                  background: "linear-gradient(180deg,#ce817e,#c0626a,#b03040,#a01326)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(2px 2px 1px rgba(58,6,8,0.6))",
                  WebkitTextStroke: "0.5px #a01326",
                  paintOrder: "stroke fill",
                }}
              >
                KEMBALI KE BERANDA
              </span>
            </Link>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes nf-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes nf-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}