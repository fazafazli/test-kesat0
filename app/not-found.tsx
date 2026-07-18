import Link from "next/link";
import Image from "next/image";
import Navbar from "../src/components/NavigationBar/Navbar";

export default function NotFound() {
  return (
    <div className="relative min-h-dvh w-full bg-[#5e0609] overflow-hidden flex flex-col
      before:content-[''] before:absolute before:inset-0 before:z-[1] before:pointer-events-none before:bg-[url('/section1/background1.svg')] before:bg-cover before:[background-position:center_5%]
      after:content-[''] after:absolute after:inset-0 after:z-[2] after:pointer-events-none after:bg-[url('/section1/EfekWelcome.svg')] after:bg-cover after:[background-position:center_top_-50px] after:opacity-40">

      <div className="relative z-[50]">
        <Navbar />
      </div>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-16 py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 max-w-6xl w-full animate-fadeInUp">

          <div className="relative shrink-0">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-60 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(232,147,36,0.35) 0%, transparent 70%)",
                transform: "scale(1.5)",
              }}
            />
            <div className="relative w-[clamp(200px,24vw,380px)] aspect-[873/871] drop-shadow-[0_18px_30px_rgba(0,0,0,0.4)] animate-float">
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

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="font-Firlest font-[500] leading-[0.9] m-0 select-none text-[clamp(5rem,10vw,9rem)] text-transparent bg-clip-text bg-gradient-to-b from-[#fcf0d6] via-[#fae4c6] to-[#e89324] [-webkit-text-stroke:clamp(1px,0.2vw,2.5px)_#e8920d] [paint-order:stroke_fill] drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
              404
            </h1>

            <p className="font-Poppins font-[500] leading-[1.6] m-0 mt-2 text-[clamp(1.1rem,2vw,1.75rem)] text-transparent bg-clip-text bg-gradient-to-b from-[#fcf0d6] via-[#fae9d0] to-[#fae4c6]">
              Halaman yang anda cari tidak ada
            </p>

            <Link
              href="/"
              className="group inline-block mt-8 px-[clamp(1.8rem,3.5vw,2.6rem)] py-[clamp(0.8rem,1.6vw,1.1rem)] whitespace-nowrap bg-[#f5ecd4] border-[3px] border-[#c8973a] outline outline-[3px] outline-[#e8b86d] outline-offset-[-6px] rounded-2xl font-Poppins font-bold tracking-[2px] shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_3px_rgba(255,255,255,0.4)] transition-all duration-300 hover:bg-[#eedfc0] hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-[0_10px_28px_rgba(0,0,0,0.6),inset_0_1px_3px_rgba(255,255,255,0.4)] active:translate-y-[1px] active:scale-100 text-[clamp(1rem,1.6vw,1.3rem)]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ce817e] via-[#c0626a] to-[#a01326] drop-shadow-[2px_2px_1px_rgba(58,6,8,0.6)] [-webkit-text-stroke:0.5px_#a01326] [paint-order:stroke_fill]">
                KEMBALI KE BERANDA
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
