"use client";

import { useRef, useEffect, useCallback } from "react";

export const useGameLoop = (
  callback: (deltaTime: number) => void,
  isRunning: boolean
): void => {
  const rafIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Wrap loop in useCallback and use a ref pattern for recursion
  const loopRef = useRef<(timestamp: number) => void>(() => {});

  const loop = useCallback((timestamp: number) => {
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    const cappedDelta = Math.min(deltaTime, 33.33);
    callbackRef.current(cappedDelta);

    rafIdRef.current = requestAnimationFrame((t) => loopRef.current(t));
  }, []);

  // Keep loopRef updated to the latest useCallback instance
  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  useEffect(() => {
    if (isRunning) {
      lastTimeRef.current = 0;
      rafIdRef.current = requestAnimationFrame((t) => loopRef.current(t));
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [isRunning, loop]); // <-- Now 'loop' is included, and the linter is happy!
};