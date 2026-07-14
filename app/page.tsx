import SiteWithIntro from "./components/Intro/SitewithIntro";
import Navbar from "./components/NavigationBar/Navbar";
import Section1 from "./components/HalamanSatu/SectionSatu";
import Section2 from "./components/HalamanDua/SectionDua";
import Section3 from "./components/HalamanTiga/SectionTiga";
import Section4 from "./components/HalamanEmpat/SectionEmpat";
import Section5 from "./components/HalamanLima/SectionLima";

export default function Home() {
  return (
    <main id="home" style={{ overflowX: "clip" }}>
      <Navbar />
      <SiteWithIntro
        birdImageSrc="/intro/bird.svg"
        logoImageSrc="/section1/LogoKesatria.svg"
      >
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </SiteWithIntro>
    </main>
  );
}
