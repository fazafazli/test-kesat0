import { useRef, useState, useEffect, useCallback, type TouchEvent } from "react";
import GameCanvas from "../components/GameCanvas";
import StartScreen from "../components/StartScreen";
import GameOverScreen from "../components/GameOverScreen";
import SoundToggle from "../components/SoundToggle";
import { useInputHandler } from "../hooks/useInputHandler";
import { useSoundEffects } from "../hooks/useSoundEffects";
import { useGameInteraction } from "../hooks/useGameInteraction";

/* ========================================
   GamePage
   Main game page that composes canvas and UI overlays.
   The container dynamically scales to fill the viewport
   while maintaining the native 2:3 aspect ratio.
   ======================================== */

const GamePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /**
   * Track whether the last interaction came from a touch event.
   * This prevents the subsequent synthetic click from firing a second action.
   */
  const isTouchRef = useRef(false);

  /* Bind keyboard/touch input handlers */
  useInputHandler();

  /* Reactive sound effects (score, hit, swoosh) */
  useSoundEffects();

  /* Shared action dispatcher used by both touch and click inputs */
  const handleInteraction = useGameInteraction();

  /** Handle touch: act immediately, flag to skip the subsequent click */
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      isTouchRef.current = true;
      handleInteraction();
    },
    [handleInteraction]
  );

  /** Handle click: skip if this click was synthesized from a touch */
  const handleClick = useCallback(() => {
    if (isTouchRef.current) {
      isTouchRef.current = false;
      return;
    }
    handleInteraction();
  }, [handleInteraction]);

  const handleFullscreenToggle = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.()
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
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <div ref={containerRef} className="game-container w-full h-full bg-white flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div
          className="relative overflow-hidden rounded-lg shadow-2xl cursor-pointer aspect-[2/3] max-w-full max-h-full w-auto h-auto flex items-center justify-center bg-black"
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          role="application"
          aria-label="Flappy Bird Game"
        >
          {/* Canvas game rendering */}
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

          {/* UI Overlays */}
          <StartScreen />
          <GameOverScreen />

          {/* Sound mute / unmute control */}
          <SoundToggle />
        </div>

        {/* Footer */}
        <footer className="sign mt-3 text-center text-[10px] text-gray-500 tracking-wider">
          Created by{" "}
          <a
            href="https://serkanbayraktar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Serkanby
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/Serkanbyx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Github
          </a>
        </footer>
      </div>
    </div>
  );
};

export default GamePage;
