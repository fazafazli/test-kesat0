"use client";

import { useRef, useEffect } from "react";

/* ========================================
   useGameLoop Hook
   Provides a stable requestAnimationFrame loop.
   ======================================== */

export const useGameLoop = (
  callback: (deltaTime: number) => void,
  isRunning: boolean
): void => {
  const rafIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const callbackRef = useRef(callback);

  /* Keep callback ref current */
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  /* Define loop as a standard function. 
     Because it's a 'function' declaration, it is hoisted 
     and can safely call itself recursively! 
  */
  function loop(timestamp: number) {
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    /* Cap delta to prevent huge jumps after tab switch */
    const cappedDelta = Math.min(deltaTime, 33.33);
    callbackRef.current(cappedDelta);

    rafIdRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    if (isRunning) {
      lastTimeRef.current = 0;
      rafIdRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [isRunning]); // No need to include 'loop' here anymore
};