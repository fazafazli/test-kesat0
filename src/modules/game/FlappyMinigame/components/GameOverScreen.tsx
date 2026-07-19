"use client";

import { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import PionirQuizModal from "./PionirQuizModal";

const GameOverScreen = () => {
  const status = useGameStore((s) => s.status);
  const score = useGameStore((s) => s.score);
  const bestScore = useGameStore((s) => s.bestScore);
  
  const revive = useGameStore((s) => s.revive);
  const hasRevived = useGameStore((s) => s.hasRevived);

  const showQuiz = useGameStore((s) => s.isQuizOpen);
  const setShowQuiz = useGameStore((s) => s.setIsQuizOpen);

  useEffect(() => {
    if (status === "gameOver" && !hasRevived) {
      setShowQuiz(true);
    }
  }, [status, hasRevived, setShowQuiz]);

  if (status !== "gameOver") return null;

  if (showQuiz) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 pointer-events-auto">
        <PionirQuizModal 
          onCorrect={() => {
            setShowQuiz(false); 
            revive();
          }} 
          onWrong={() => {
            setShowQuiz(false);
          }} 
        />
      </div>
    );
  }
  const isNewBest = score >= bestScore && score > 0;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      aria-label="Restart game"
    >
      <div className="absolute inset-0 bg-black/50 rounded-lg" />

      <div className="relative z-10 flex flex-col items-center gap-4 animate-fade-in">
        <h2 className="text-2xl text-red-500 font-game text-shadow-game">
          Game Over
        </h2>

        <div className="flex flex-col items-center gap-3 px-8 py-6 bg-amber-100/90 rounded-xl border-4 border-amber-700 shadow-lg">
          <div className="flex flex-col items-center">
            <span className="text-xs text-amber-800 font-game">Score</span>
            <span className="text-2xl text-amber-900 font-game mt-1">
              {score}
            </span>
          </div>

          <div className="w-full h-px bg-amber-700/30" />

          <div className="flex flex-col items-center">
            <span className="text-xs text-amber-800 font-game">Best</span>
            <span className="text-2xl text-amber-900 font-game mt-1">
              {bestScore}
            </span>
          </div>

          {isNewBest && (
            <div className="px-3 py-1 bg-red-500 rounded-full animate-bounce-slow">
              <span className="text-xs text-white font-game">NEW!</span>
            </div>
          )}
        </div>

        <p className="text-xs text-white font-game text-shadow-game animate-pulse-fast mt-2">
          Tap or Press Space
        </p>
        <p className="text-xs text-white/60 font-game text-shadow-game">
          to restart
        </p>
      </div>
    </div>
  );
};

export default GameOverScreen;
