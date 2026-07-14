import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface GalleryItemProps {
  src: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const GalleryItem = forwardRef<HTMLDivElement, GalleryItemProps>(
  ({ src, width, height, priority = false, className, style }, ref) => {
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
            quality={75}
            className="object-cover w-full h-full pointer-events-none" 
          />
        </div>
      </div>
    );
  }
);

GalleryItem.displayName = "GalleryItem";

export default GalleryItem;