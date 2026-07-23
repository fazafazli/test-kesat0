import type { Metadata } from "next";
import Navbar from "../../src/components/NavigationBar/Navbar";
import PETA from "../../src/modules/peta/map";
import AudioButton from "../../src/components/audio/AudioButton";

export const metadata: Metadata = {
  title: "Peta 3D — PIONIR KESATRIA 2026",
  description: "Jelajahi peta 3D Fakultas Teknik UGM",
  openGraph: {
    title: "Peta 3D — PIONIR KESATRIA 2026",
    description: "Jelajahi peta 3D Fakultas Teknik UGM",
  },
};

export default function PetaPage() {
  return (
    <>
      <Navbar />
      <PETA />
      <AudioButton />
    </>
);
}