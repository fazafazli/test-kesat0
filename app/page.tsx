import SiteWithIntro from "../src/modules/Intro/SitewithIntro";
import Navbar from "../src/components/NavigationBar/Navbar";
import Section1 from "../src/modules/HalamanSatu/SectionSatu";
import Section2 from "../src/modules/HalamanDua/SectionDua";
import Section3 from "../src/modules/HalamanTiga/SectionTiga";
import Section4 from "../src/modules/HalamanEmpat/SectionEmpat";
import Section5 from "../src/modules/HalamanLima/SectionLima";

export default function Home() {
  return (
    <main id="home" style={{ overflowX: "clip" }}>
      <Navbar />
      <SiteWithIntro
        birdImageSrc="/intro/bird.svg"
        logoImageSrc="/section1/LogoKesatria.svg"
        wayangKananAtasSrc="/intro/gunungannew.svg"
        wayangKiriAtasSrc="/intro/gunungannew.svg"
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
