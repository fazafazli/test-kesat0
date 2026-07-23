"use client";

import { useState, useEffect } from "react";
import { sheQuizData, Question } from "../constants/quizData";

interface QuizModalProps {
  onCorrect: () => void;
  onWrong: () => void;
}

export default function PionirQuizModal({ onCorrect, onWrong }: QuizModalProps) {
  
  const [phase, setPhase] = useState<"question" | "correct" | "incorrect">("question");
  const [countdown, setCountdown] = useState(3);

  const [currentQ] = useState<Question>(() => {
    const randomIndex = Math.floor(Math.random() * sheQuizData.length);
    return sheQuizData[randomIndex];
  });

  useEffect(() => {
    if (phase === "correct" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === "correct" && countdown === 0) {
      onCorrect();
    }
  }, [phase, countdown, onCorrect]);

  if (!currentQ) return null;

  return (
    /* Modal Container: Cream background, thick brown border, retro shadow */
    <div className="bg-[#fdf4dc] border-4 border-[#5c4033] rounded-2xl p-6 w-[90%] max-w-[360px] shadow-[8px_8px_0px_rgba(92,64,51,1)] flex flex-col gap-4 animate-fade-in pointer-events-auto">
      
      {phase === "question" && (
        <>
          <h2 className="text-2xl font-black text-[#5c4033] border-b-2 border-dashed border-[#5c4033] pb-2 font-['Firlest'] tracking-wide">
            pionir she quiz!
          </h2>
          <p className="text-[#5c4033] text-base font-bold leading-relaxed">
            {currentQ.question}
          </p>
          
          <div className="flex flex-col gap-3 mt-2">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  if (idx === currentQ.correctAnswer) {
                    setPhase("correct");
                  } else {
                    setPhase("incorrect");
                  }
                }}
                /* Golden Buttons: Gradient, brown border, drop shadow that flattens on click */
                className="relative w-full px-4 py-3 text-sm text-left bg-gradient-to-b from-[#ffe066] to-[#f5b041] hover:from-[#fff099] hover:to-[#ffc266] rounded-xl transition-all border-2 border-[#5c4033] font-bold text-[#5c4033] shadow-[0px_4px_0px_#5c4033] active:translate-y-[4px] active:shadow-none"
              >
                {option}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#5c4033]/70 mt-2 text-center font-semibold italic">
            Jawab dengan benar untuk kesempatan kedua!
          </p>
        </>
      )}

      {phase === "correct" && (
        <div className="flex flex-col items-center justify-center text-center py-4 gap-2">
          <h2 className="text-4xl font-black text-[#27ae60] font-['Firlest'] tracking-wider drop-shadow-sm">Benar!</h2>
          <p className="text-base text-[#5c4033] font-bold">
            Bersiap-siap, permainan dilanjutkan dalam:
          </p>
          <div className="text-7xl font-black text-[#d35400] animate-pulse mt-4 font-['Firlest'] drop-shadow-md">
            {countdown > 0 ? countdown : "GO!"}
          </div>
        </div>
      )}

      {phase === "incorrect" && (
        <div className="flex flex-col text-center py-2 gap-3">
          <h2 className="text-3xl font-black text-[#c0392b] font-['Firlest'] tracking-wider drop-shadow-sm">Salah!</h2>
          
          {/* Answer Reveal Box: Dashed borders to match the scrapbook feel */}
          <div className="flex flex-col gap-1 text-left bg-[#f5b041]/20 p-4 rounded-xl border-2 border-dashed border-[#5c4033] mt-2">
            <span className="text-xs text-[#5c4033] font-black uppercase tracking-widest">
              Jawaban yang benar:
            </span>
            <span className="text-base text-[#27ae60] font-black leading-snug mt-1">
              {currentQ.options[currentQ.correctAnswer]}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onWrong(); // Proceed to Game Over
            }}
            /* Red Exit Button to contrast the golden answers */
            className="mt-4 w-full px-4 py-3 text-base text-center bg-gradient-to-b from-[#e74c3c] to-[#c0392b] hover:from-[#ff7979] hover:to-[#e74c3c] text-[#fdf4dc] rounded-xl transition-all border-2 border-[#5c4033] shadow-[0px_4px_0px_#5c4033] active:translate-y-[4px] active:shadow-none font-['Firlest'] tracking-wider"
          >
            lanjut ke game over
          </button>
        </div>
      )}

    </div>
  );
}