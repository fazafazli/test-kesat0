import type { Metadata } from "next";
import Navbar from "../../src/components/NavigationBar/Navbar";
import Dokum from "../../src/modules/dokumentasi/dokum";
import AudioButton from "../../src/components/audio/AudioButton";

export const metadata: Metadata = {
  title: "Dokumentasi — PIONIR KESATRIA 2026",
  description: "Galeri dokumentasi kegiatan Pionir Kesatria 2026",
  openGraph: {
    title: "Dokumentasi — PIONIR KESATRIA 2026",
    description: "Galeri dokumentasi kegiatan Pionir Kesatria 2026",
  },
};

export default function DokumentasiPage() {
  return (
    <>
      <Navbar />
      <Dokum />
      <AudioButton />
    </>
  );
}