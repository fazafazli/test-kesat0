"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import PionirQuizModal from "./PionirQuizModal"; // Make sure this path is correct based on where you saved it

/* ========================================
   GameOverScreen Component
   Visual overlay shown when the game ends.
   All interactions are handled by the parent GamePage.
   ======================================== */

const GameOverScreen = () => {
  const status = useGameStore((s) => s.status);
  const score = useGameStore((s) => s.score);
  const bestScore = useGameStore((s) => s.bestScore);
  
  // 1. Pull the new revive logic from your updated store
  const revive = useGameStore((s) => s.revive);
  const hasRevived = useGameStore((s) => s.hasRevived);

  // 2. Local state to trigger the quiz modal
  const showQuiz = useGameStore((s) => s.isQuizOpen);
  const setShowQuiz = useGameStore((s) => s.setIsQuizOpen);

  // 3. Trigger the quiz when the game ends, IF they haven't used their second chance yet
  useEffect(() => {
    if (status === "gameOver" && !hasRevived) {
      setShowQuiz(true);
    }
  }, [status, hasRevived]);

  if (status !== "gameOver") return null;

  // 4. The Interceptor: Show the Quiz instead of the normal Game Over screen
  if (showQuiz) {
    return (
      // Note: pointer-events-auto ensures the user can actually click the quiz buttons!
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 pointer-events-auto">
        <PionirQuizModal 
          onCorrect={() => {
            setShowQuiz(false); 
            revive(); // Correct! Clear pipes, reset bird height, and resume game!
          }} 
          onWrong={() => {
            setShowQuiz(false); // Wrong! Close modal and proceed to the normal Game Over UI below.
          }} 
        />
      </div>
    );
  }

  // ==========================================
  // Default Game Over UI (Only shows if they fail the quiz or already revived once)
  // ==========================================
  const isNewBest = score >= bestScore && score > 0;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      aria-label="Restart game"
    >
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-black/50 rounded-lg" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 animate-fade-in">
        {/* Game Over title */}
        <h2 className="text-2xl text-red-500 font-game text-shadow-game">
          Game Over
        </h2>

        {/* Score panel */}
        <div className="flex flex-col items-center gap-3 px-8 py-6 bg-amber-100/90 rounded-xl border-4 border-amber-700 shadow-lg">
          {/* Current score */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-amber-800 font-game">Score</span>
            <span className="text-2xl text-amber-900 font-game mt-1">
              {score}
            </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-amber-700/30" />

          {/* Best score */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-amber-800 font-game">Best</span>
            <span className="text-2xl text-amber-900 font-game mt-1">
              {bestScore}
            </span>
          </div>

          {/* New best badge */}
          {isNewBest && (
            <div className="px-3 py-1 bg-red-500 rounded-full animate-bounce-slow">
              <span className="text-xs text-white font-game">NEW!</span>
            </div>
          )}
        </div>

        {/* Restart instruction */}
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
