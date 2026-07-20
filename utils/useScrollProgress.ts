"use client";

import { useEffect, useRef } from "react";

export function useScrollProgress<T extends HTMLElement>(options?: {
  viewportStart?: number;
  cssVar?: string;
  reducedMotionValue?: number;

  mirrorTo?: { ref: React.RefObject<HTMLElement | null>; cssVar: string }[];
  smoothing?: number;
}) {
  const measureRef = useRef<T | null>(null);
  const {
    viewportStart = 0.45,
    cssVar = "--scroll-progress",
    reducedMotionValue = 1,
    mirrorTo,
    smoothing = 0.13,
  } = options ?? {};

  useEffect(() => {
    const el: T = measureRef.current!;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId: number | null = null;
    let isVisible = true;
    let currentValue = 0;
    let targetValue = 0;
    let hasSetInitial = false;

    const setProgress = (progress: number) => {
      const value = String(progress);
      el.style.setProperty(cssVar, value);
      mirrorTo?.forEach(({ ref, cssVar: mirrorVar }) =>
        ref.current?.style.setProperty(mirrorVar, value)
      );
    };

    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    const computeTarget = (): number => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startOffset = vh * viewportStart;
      const range = startOffset + rect.height - vh;
      const raw =
        range > 0 ? Math.min(Math.max((startOffset - rect.top) / range, 0), 1) : 1;
      return smoothstep(raw);
    };

    const tick = () => {
      animationFrameId = null;

      if (reducedMotion.matches) {
        setProgress(reducedMotionValue);
        return;
      }
      if (!isVisible) return;

      targetValue = computeTarget();

      if (!hasSetInitial) {
        currentValue = targetValue;
        hasSetInitial = true;
        setProgress(currentValue);
        return;
      }

      const delta = targetValue - currentValue;

      if (Math.abs(delta) < 0.0005) {
        currentValue = targetValue;
        setProgress(currentValue);
        return;
      }

      currentValue += delta * smoothing;
      setProgress(currentValue);
      animationFrameId = window.requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (animationFrameId !== null) return;
      animationFrameId = window.requestAnimationFrame(tick);
    };
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) schedule();
      },
      { threshold: 0, rootMargin: "20% 0px 20% 0px" }
    );
    visibilityObserver.observe(el);

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(el);

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    reducedMotion.addEventListener("change", schedule);

    return () => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      reducedMotion.removeEventListener("change", schedule);
      if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
    };
  }, [viewportStart, cssVar, reducedMotionValue, mirrorTo, smoothing]);

  return measureRef;
}