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
        // NOTE: will-change is intentionally NOT a static class here.
        // GSAP sets/clears `willChange` inline (see galleryTimeline.ts) only
        // for the duration the element actually animates. A permanent
        // will-change-transform class would keep this promoted to its own
        // GPU compositor layer for the element's entire lifetime — with 11
        // of these mounted at once that's 11 permanently-resident layers,
        // which is a common cause of jank/battery drain on mobile GPUs even
        // when nothing is currently animating.
        className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", className)}
        style={style}
      >
        {/*
          shadow-lg (box-shadow) recomputes on every frame the parent's
          transform changes, because box-shadow isn't a compositor-only
          property like transform/opacity — the browser has to repaint the
          shadow's bounding area each tick during the scrub animation.
          Swapping to a filter: drop-shadow gives a similar visual result
          but is cheaper to recompute alongside transforms, and rounded
          corners + overflow-hidden stay on the same element so there's
          only one clip/paint boundary instead of two nested ones.
        */}
        <div className="relative overflow-hidden rounded-xl md:rounded-3xl border-[6px] border-white/80 bg-white/10 [filter:drop-shadow(0_8px_16px_rgba(0,0,0,0.2))]">
          <Image
            src={src}
            alt="PIONIR Gallery Image"
            width={width}
            height={height}
            priority={priority}
            loading={priority ? undefined : loading ?? "lazy"}
            quality={70}
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