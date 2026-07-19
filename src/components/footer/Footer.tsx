import Image from "next/image";

type PageFooterProps = {
  showDecor?: boolean;
};

export default function PageFooter({ showDecor = true }: PageFooterProps) {
  return (
    <div className="relative w-full h-[180px] md:h-[300px] lg:h-[500px] pointer-events-none">
      <Image
        src="/section3/PitaBaru2.svg"
        alt=""
        className="absolute bottom-[2vh] max-md:landscape:bottom-[6vh] lg:bottom-[18vh] -left-[3vw] z-[2] w-[55vw] -translate-x-1/2"
        width={600}
        height={100}
        loading="lazy"
      />

      <Image
        src="/dokumentasi/footer_dekor.svg"
        alt=""
        className="absolute bottom-[7vh] max-md:landscape:bottom-[11vh] md:bottom-[28vh] lg:bottom-[42vh] left-0 w-[13.5vw]"
        width={200}
        height={200}
        loading="lazy"
      />

      <Image
        src="/dokumentasi/footer_dekor2.svg"
        alt=""
        className="absolute bottom-[8vh] max-md:landscape:bottom-[12vh] md:bottom-[28vh] lg:bottom-[53vh] right-0 w-[13.5vw]"
        width={200}
        height={200}
        loading="lazy"
      />

    <Image
    src="/dokumentasi/dekorbawahgede.svg"
    alt=""
    className="absolute bottom-0 left-0 w-[99vw]"
    width={1920}
    height={200}
    loading="lazy"
    />

    <Image
    src="/dokumentasi/dekorbawahkiri.svg"
    alt=""
    className="absolute bottom-0 right-0 z-[10] w-[97vw]"
    width={1920}
    height={400}
    loading="lazy"
    />

      <Image
        src="/dokumentasi/sayapluar.svg"
        alt=""
        className="absolute bottom-0 left-[65vw] z-[5] w-[70vw] -translate-x-1/2"
        width={1000}
        height={300}
        loading="lazy"
      />

      <Image
        src="/dokumentasi/footer.svg"
        alt=""
        className="absolute bottom-[9vh] max-md:landscape:bottom-[13vh] md:bottom-[18vh] lg:bottom-[27vh] left-1/2 z-[5] w-[70vw] md:w-[65vw] lg:w-[45vw] -translate-x-1/2"
        width={500}
        height={200}
        loading="lazy"
      />

      <Image
        src="/dokumentasi/SignEmas.webp"
        alt=""
        className="absolute bottom-[1vh] max-md:landscape:bottom-[5vh] left-[18vw] z-[5] w-[24vw]"
        width={350}
        height={350}
        loading="lazy"
      />
    </div>
  );
}