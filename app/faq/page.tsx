import type { Metadata } from "next";
import Navbar from "../../src/components/NavigationBar/Navbar";
import FAQ from "../../src/modules/faq/faq";
import AudioButton from "../../src/components/audio/AudioButton";

export const metadata: Metadata = {
  title: "FAQ — PIONIR KESATRIA 2026",
  description: "Pertanyaan yang sering diajukan tentang Pionir Kesatria 2026",
  openGraph: {
    title: "FAQ — PIONIR KESATRIA 2026",
    description: "Pertanyaan yang sering diajukan tentang Pionir Kesatria 2026",
  },
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <FAQ />
      <AudioButton />
    </>
  );
}