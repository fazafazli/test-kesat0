import type { Metadata } from "next";
import Navbar from "../../src/components/NavigationBar/Navbar";
import Game from "../../src/modules/game/game";
import AudioButton from "../../src/components/audio/AudioButton";

export const metadata: Metadata = {
  title: "Game — PIONIR KESATRIA 2026",
  description: "Mainkan Permainan di Pionir Kesatria 2026",
  openGraph: {
    title: "Game — PIONIR KESATRIA 2026",
    description: "Mainkan Permainan di Pionir Kesatria 2026",
  },
};

export default function gamePage() {
  return (
    <>
      <Navbar />
      <Game />
      <AudioButton />
    </> 
);
}