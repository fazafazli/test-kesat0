"use client";

import { useState, useEffect } from "react";
import { sheQuizData, Question } from "../constants/quizData";

interface QuizModalProps {
  onCorrect: () => void;
  onWrong: () => void;
}

export default function PionirQuizModal({ onCorrect, onWrong }: QuizModalProps) {
  
  // 1. New States to handle the different UI phases
  const [phase, setPhase] = useState<"question" | "correct" | "incorrect">("question");
  const [countdown, setCountdown] = useState(3);

  // Pick a random question when the modal mounts
  const [currentQ, setCurrentQ] = useState<Question>(() => {
  const randomIndex = Math.floor(Math.random() * sheQuizData.length);
  return sheQuizData[randomIndex];
});

  // 2. The Countdown Timer Logic
  useEffect(() => {
    if (phase === "correct" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer); // Cleanup to prevent memory leaks
    } else if (phase === "correct" && countdown === 0) {
      // When it hits 0, trigger the revive!
      onCorrect();
    }
  }, [phase, countdown, onCorrect]);

  if (!currentQ) return null;

  return (
    <div className="bg-white rounded-xl p-5 w-[90%] max-w-[340px] shadow-2xl flex flex-col gap-3 animate-fade-in pointer-events-auto">
      
      {/* ======================================= */}
      {/* PHASE 1: ASKING THE QUESTION */}
      {/* ======================================= */}
      {phase === "question" && (
        <>
          <h2 className="text-lg font-bold text-red-600 border-b pb-1">
            PIONIR SHE Quiz!
          </h2>
          <p className="text-gray-800 text-sm font-medium leading-snug">
            {currentQ.question}
          </p>
          
          <div className="flex flex-col gap-2 mt-1">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent ghost clicks
                  if (idx === currentQ.correctAnswer) {
                    setPhase("correct");
                  } else {
                    setPhase("incorrect");
                  }
                }}
                className="px-3 py-2 text-sm text-left bg-gray-100 hover:bg-amber-100 hover:text-amber-900 rounded-lg transition-colors border border-gray-200 font-semibold text-gray-700"
              >
                {option}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 mt-1 text-center">
            Jawab dengan benar untuk kesempatan kedua!
          </p>
        </>
      )}

      {/* ======================================= */}
      {/* PHASE 2: CORRECT ANSWER (COUNTDOWN) */}
      {/* ======================================= */}
      {phase === "correct" && (
        <div className="flex flex-col items-center justify-center text-center py-4 gap-2">
          <h2 className="text-xl font-bold text-green-600">Jawaban Benar!</h2>
          <p className="text-sm text-gray-600 font-medium">
            Bersiap-siap, permainan dilanjutkan dalam:
          </p>
          <div className="text-5xl font-black text-amber-500 animate-pulse mt-2">
            {countdown > 0 ? countdown : "GO!"}
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* PHASE 3: INCORRECT ANSWER (SHOW RIGHT ANSWER) */}
      {/* ======================================= */}
      {phase === "incorrect" && (
        <div className="flex flex-col text-center py-2 gap-3">
          <h2 className="text-xl font-bold text-red-600">Jawaban Salah!</h2>
          
          <div className="flex flex-col gap-1 text-left bg-green-50/50 p-3 rounded-lg border border-green-200 mt-1">
            <span className="text-xs text-green-700 font-bold uppercase tracking-wider">
              Jawaban yang benar:
            </span>
            <span className="text-sm text-gray-800 font-semibold leading-snug">
              {currentQ.options[currentQ.correctAnswer]}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onWrong(); // Proceed to Game Over
            }}
            className="mt-2 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors shadow-md"
          >
            Lanjut ke Game Over
          </button>
        </div>
      )}

    </div>
  );
}