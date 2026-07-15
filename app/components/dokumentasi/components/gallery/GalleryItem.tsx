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
    const aspectRatio = width / height;
    const baseWidthVw = aspectRatio >= 1 ? 22 : 16;
    const minWidthPx = aspectRatio >= 1 ? 140 : 110;
    const maxWidthPx = aspectRatio >= 1 ? 320 : 260;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform",
          className
        )}
        style={{
          width: `clamp(${minWidthPx}px, ${baseWidthVw}vw, ${maxWidthPx}px)`,
          aspectRatio: `${width} / ${height}`,
          ...style,
        }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-3xl border-[4px] sm:border-[6px] border-white/80 shadow-lg bg-white/10">
          <Image
            src={src}
            alt="PIONIR Gallery Image"
            fill
            priority={priority}
            loading={priority ? undefined : loading ?? "lazy"}
            quality={75}
            sizes="(max-width: 767px) 40vw, (max-width: 1024px) 30vw, 22vw"
            className="object-cover pointer-events-none select-none"
            draggable={false}
            decoding="async"
          />
        </div>
      </div>
    );
  }
);

GalleryItem.displayName = "GalleryItem";

export default GalleryItem;