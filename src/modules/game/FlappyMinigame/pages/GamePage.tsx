import { useRef, useState, useEffect, useCallback, type TouchEvent } from "react";
import GameCanvas from "../components/GameCanvas";
import StartScreen from "../components/StartScreen";
import GameOverScreen from "../components/GameOverScreen";
import SoundToggle from "../components/SoundToggle";
import { useInputHandler } from "../hooks/useInputHandler";
import { useSoundEffects } from "../hooks/useSoundEffects";
import { useGameInteraction } from "../hooks/useGameInteraction";

const GamePage = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    const el = gameAreaRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      (el.requestFullscreen ?? (el as HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen)?.()
        .then(() => setIsFullscreen(true))
        .catch(() => setIsFullscreen(Boolean(document.fullscreenElement)));
    } else {
      document.exitFullscreen?.()
        .then(() => setIsFullscreen(false))
        .catch(() => setIsFullscreen(Boolean(document.fullscreenElement)));
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  return (
    <div className="game-container w-full h-full bg-white flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div
          ref={gameAreaRef}
          className="relative overflow-hidden cursor-pointer flex items-center justify-center bg-black max-w-full max-h-full"
          style={{
            borderRadius: isFullscreen ? 0 : undefined,
            boxShadow: isFullscreen ? "none" : undefined,
            width: isFullscreen
              ? "min(100dvw, calc(100dvh * 2 / 3))"
              : "min(100%, calc(100dvh * 2 / 3))",
            height: isFullscreen
              ? "min(100dvh, calc(100dvw * 3 / 2))"
              : "min(100%, calc(100dvw * 3 / 2))",
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
