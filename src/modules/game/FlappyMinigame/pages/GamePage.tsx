import { useRef, useState, useEffect, useCallback, type TouchEvent } from "react";
import GameCanvas from "../components/GameCanvas";
import StartScreen from "../components/StartScreen";
import GameOverScreen from "../components/GameOverScreen";
import SoundToggle from "../components/SoundToggle";
import { useInputHandler } from "../hooks/useInputHandler";
import { useSoundEffects } from "../hooks/useSoundEffects";
import { useGameInteraction } from "../hooks/useGameInteraction";

type DocWithWebkit = Document & {
  webkitExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element;
};

const GamePage = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameDims, setGameDims] = useState({ w: 400, h: 600 });

  const isTouchRef = useRef(false);

  useInputHandler();
  useSoundEffects();

  const handleInteraction = useGameInteraction();

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      isTouchRef.current = true;
      handleInteraction();
    },
    [handleInteraction]
  );

  const handleClick = useCallback(() => {
    if (isTouchRef.current) {
      isTouchRef.current = false;
      return;
    }
    handleInteraction();
  }, [handleInteraction]);

  const handleFullscreenToggle = useCallback(() => {
    const el = gameAreaRef.current as HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> } | null;
    if (!el) return;

    const doc = document as DocWithWebkit;
    const fsEl = doc.fullscreenElement ?? doc.webkitFullscreenElement;

    if (!fsEl) {
      (el.requestFullscreen ?? el.webkitRequestFullscreen)?.()
        .then(() => setIsFullscreen(true))
        .catch(() => setIsFullscreen(Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement)));
    } else {
      (doc.exitFullscreen ?? doc.webkitExitFullscreen)?.()
        .then(() => setIsFullscreen(false))
        .catch(() => setIsFullscreen(Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement)));
    }
  }, []);

  useEffect(() => {
    const onFSChange = () => {
      setIsFullscreen(Boolean(
        (document as DocWithWebkit).fullscreenElement ??
        (document as DocWithWebkit).webkitFullscreenElement
      ));
    };
    document.addEventListener("fullscreenchange", onFSChange);
    document.addEventListener("webkitfullscreenchange", onFSChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFSChange);
      document.removeEventListener("webkitfullscreenchange", onFSChange);
    };
  }, []);

  useEffect(() => {
    if (isFullscreen) return;
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const update = () => {
      const pw = parent.clientWidth;
      const ph = parent.clientHeight;
      if (pw <= 0 || ph <= 0) return;
      setGameDims({
        w: Math.round(Math.min(pw, ph * 2 / 3)),
        h: Math.round(Math.min(ph, pw * 3 / 2)),
      });
    };

    requestAnimationFrame(update);
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [isFullscreen]);

  useEffect(() => {
    if (!isFullscreen) return;

    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setGameDims({
        w: Math.round(Math.min(w, h * 2 / 3)),
        h: Math.round(Math.min(h, w * 3 / 2)),
      });
    };

    requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isFullscreen]);

  return (
    <div className="game-container w-full h-full bg-white flex items-center justify-center">
      <div ref={containerRef} className="flex flex-col items-center justify-center w-full h-full">
        <div
          ref={gameAreaRef}
          className="relative overflow-hidden rounded-lg shadow-2xl cursor-pointer bg-black"
          style={{
            width: gameDims.w,
            height: gameDims.h,
            borderRadius: isFullscreen ? 0 : undefined,
            boxShadow: isFullscreen ? "none" : undefined,
          }}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          role="application"
          aria-label="Flappy Bird Game"
        >
          <GameCanvas />
          <button
            type="button"
            className="absolute bottom-3 right-3 z-20 rounded-full bg-black/70 px-3 py-2 text-sm text-white shadow-lg transition hover:bg-black"
            onClick={(e) => {
              e.stopPropagation();
              handleFullscreenToggle();
            }}
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>

          <StartScreen />
          <GameOverScreen />

          <SoundToggle />
        </div>


      </div>
    </div>
  );
};

export default GamePage;
