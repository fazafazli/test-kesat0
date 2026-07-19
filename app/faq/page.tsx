import Navbar from "../../src/components/NavigationBar/Navbar";
import FAQ from "../../src/modules/faq/faq";
import AudioButton from "../../src/components/audio/AudioButton";

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <FAQ />
      <AudioButton />
    </>
  );
}