import { useRef, useState, useEffect, useCallback, type TouchEvent } from "react";
import GameCanvas from "../components/GameCanvas";
import StartScreen from "../components/StartScreen";
import GameOverScreen from "../components/GameOverScreen";
import SoundToggle from "../components/SoundToggle";
import { useInputHandler } from "../hooks/useInputHandler";
import { useSoundEffects } from "../hooks/useSoundEffects";
import { useGameInteraction } from "../hooks/useGameInteraction";

// --- TYPESCRIPT FIXES ---
type WebkitContainer = HTMLDivElement & {
  webkitRequestFullscreen?: () => Promise<void>;
};

type CustomDocument = Document & {
  fullscreenElement?: Element | null;
  exitFullscreen?: () => Promise<void>;
};

const GamePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFauxFullscreen, setIsFauxFullscreen] = useState(false);

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

  // --- FULLSCREEN LOGIC WITH IOS FALLBACK & TYPE FIXES ---
  const handleFullscreenToggle = useCallback(async () => {
    // 1. Cast the container ONCE at the top so TypeScript remembers the type
    const container = containerRef.current as WebkitContainer | null;
    const doc = document as CustomDocument; 

    if (!container) return;

    if (!doc.fullscreenElement && !isFauxFullscreen) {
      try {
        // Try Native Fullscreen (Android/Desktop/iPad)
        if (container.requestFullscreen) {
          await container.requestFullscreen?.(); // Added ?.() for ultimate TS safety
          setIsFullscreen(true);
        } else if (container.webkitRequestFullscreen) {
          // 2. Safely call it now that TypeScript natively knows what it is
          await container.webkitRequestFullscreen?.(); 
          setIsFullscreen(true);
        } else {
          // Force error if no API exists (iPhones)
          throw new Error("Native API missing");
        }
      } catch (error) {
        // iOS Fallback: Catch the rejection and use CSS!
        console.warn("Native fullscreen blocked, using CSS fallback", error);
        setIsFauxFullscreen(true);
      }
    } else {
      // Exit logic (handles both native and faux)
      if (doc.fullscreenElement && doc.exitFullscreen) {
        await doc.exitFullscreen?.(); // Added ?.() for ultimate TS safety
        setIsFullscreen(false);
      }
      if (isFauxFullscreen) {
        setIsFauxFullscreen(false);
      }
    }
  }, [isFauxFullscreen]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const doc = document as CustomDocument; // Safely cast document
      setIsFullscreen(Boolean(doc.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef} 
      // --- DYNAMIC WRAPPER FOR IOS FALLBACK ---
      className={
        isFauxFullscreen 
          ? "fixed inset-0 z-[9999] w-screen h-[100dvh] bg-black flex flex-col items-center justify-center touch-none" 
          : "game-container w-full h-full bg-white flex items-center justify-center"
      }
    >
      <div className="flex flex-col items-center justify-center w-full h-full min-h-0 min-w-0">
        <div
          className="relative overflow-hidden rounded-lg shadow-2xl cursor-pointer aspect-[2/3] max-w-full max-h-full flex items-center justify-center bg-black"
          style={{
            width: "min(100%, calc(100dvh * 2 / 3))",
            height: "min(100%, calc(100dvw * 3 / 2))",
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
            {isFullscreen || isFauxFullscreen ? "Exit Fullscreen" : "Fullscreen"}
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
