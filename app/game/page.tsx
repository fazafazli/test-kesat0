import Navbar from "../../src/components/NavigationBar/Navbar";
import Game from "../../src/modules/game/game";
import AudioButton from "../../src/components/audio/AudioButton";

export default function gamePage() {
  return (
    <>
      <Navbar />
      <Game />
      <AudioButton />
    </> 
);
}