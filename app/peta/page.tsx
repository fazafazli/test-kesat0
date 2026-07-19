import Navbar from "../../src/components/NavigationBar/Navbar";
import PETA from "../../src/modules/peta/map";
import AudioButton from "../../src/components/audio/AudioButton";

export default function PetaPage() {
  return (
    <>
      <Navbar />
      <PETA />
      <AudioButton />
    </>
);
}