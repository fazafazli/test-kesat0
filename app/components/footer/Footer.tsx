import Image from "next/image";

type PageFooterProps = {
  showDecor?: boolean;
};

export default function PageFooter({ showDecor = true }: PageFooterProps) {
  return (
    <div className="relative w-full h-[150px] md:h-[300px] lg:h-[500px] pointer-events-none">
      <Image
        src="/dokumentasi/bando.svg"
        alt=""
        className="absolute bottom-[0vh] lg:bottom-[-6vh] left-[14vw] z-[2] w-[29vw] -translate-x-1/2"
        width={600}
        height={100}
      />

      <Image
        src="/dokumentasi/footer_dekor.svg"
        alt=""
        className="absolute bottom-[13vh] md:bottom-[28vh] lg:bottom-[42vh] left-0 w-[13.5vw]"
        width={200}
        height={200}
      />

      <Image
        src="/dokumentasi/footer_dekor2.svg"
        alt=""
        className="absolute bottom-[14vh] md:bottom-[28vh] lg:bottom-[53vh] right-0 w-[13.5vw]"
        width={200}
        height={200}
      />

    <Image
    src="/dokumentasi/dekorbawahgede.svg"
    alt=""
    className="absolute bottom-0 left-0 w-[99vw]"
    width={1920}
    height={200}
    priority
    />

    <Image
    src="/dokumentasi/dekorbawahkiri.svg"
    alt=""
    className="absolute bottom-0 right-0 z-[10] w-[97vw]"
    width={1920}
    height={400}
    />

      <Image
        src="/dokumentasi/sayapluar.svg"
        alt=""
        className="absolute bottom-0 left-[65vw] z-[5] w-[70vw] -translate-x-1/2"
        width={1000}
        height={300}
      />

      <Image
        src="/dokumentasi/footer.svg"
        alt=""
        className="absolute bottom-[10vh] md:bottom-[20vh] lg:bottom-[27vh] left-1/2 z-[5] w-[35vw] -translate-x-1/2"
        width={500}
        height={200}
      />
{/* 
        <Image
            src="/dokumentasi/Dekor.svg"
            alt=""
            className="absolute bottom-[17vh] md:bottom-[32vh] lg:bottom-[45vh] left-1/2 z-[5] w-[6vw] -translate-x-1/2"
            width={100}
            height={100}
        /> */}

      <Image
        src="/dokumentasi/SIGNEMAS.svg"
        alt=""
        className="absolute bottom-[4vh] left-[18vw] z-[5] w-[24vw]"
        width={350}
        height={350}
      />
    </div>
  );
}
