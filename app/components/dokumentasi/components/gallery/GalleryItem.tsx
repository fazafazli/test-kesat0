import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface GalleryItemProps {
  src: string;
  width: number;
  height: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
  className?: string;
  style?: React.CSSProperties;
}

const GalleryItem = forwardRef<HTMLDivElement, GalleryItemProps>(
  ({ src, width, height, priority = false, loading, className, style }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform",
          className
        )}
        style={style}
      >
        <div className="relative overflow-hidden rounded-xl md:rounded-3xl border-[6px] border-white/80 shadow-lg bg-white/10">
          <Image
            src={src}
            alt="PIONIR Gallery Image"
            width={width}
            height={height}
            priority={priority}
            loading={priority ? undefined : loading ?? "lazy"}
            quality={70}
            // Next.js now handles resizing/format negotiation (AVIF/WebP) and
            // serves a size matched to the actual rendered box instead of the
            // full 80kb source on every device. This was the main cause of
            // slow initial paint on mobile.
            sizes="(max-width: 767px) 40vw, (max-width: 1024px) 30vw, 22vw"
            className="object-cover w-full h-full pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>
    );
  }
);

GalleryItem.displayName = "GalleryItem";

export default GalleryItem;