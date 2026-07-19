import Navbar from "../../src/components/NavigationBar/Navbar";
import Dokum from "../../src/modules/dokumentasi/dokum";
import AudioButton from "../../src/components/audio/AudioButton";

export default function DokumentasiPage() {
  return (
    <>
      <Navbar />
      <Dokum />
      <AudioButton />
    </>
  );
}