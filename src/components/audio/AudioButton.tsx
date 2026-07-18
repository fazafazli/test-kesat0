"use client";

import { useAudio } from "@/utils/useAudio";
import "./AudioButton.css";

export default function AudioButton() {
  const {
    playAmbient,
    pauseAmbient,
    isPlaying,
  } = useAudio();

  const handleClick = async () => {
    if (isPlaying) {
      pauseAmbient();
    } else {
      await playAmbient();
    }
  };

  return (
    <button
      className="audio-button"
      onClick={handleClick}
      aria-label="Toggle Audio"
    >
      {isPlaying ? (
        // Speaker aktif
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 9v6h4l5 4V5L7 9H3z"/>
          <path d="M16 8a5 5 0 010 8"/>
          <path d="M18.5 5.5a8.5 8.5 0 010 13"/>
        </svg>
      ) : (
        // Speaker mute
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 9v6h4l5 4V5L7 9H3z"/>
          <path
            d="M16 9l5 5M21 9l-5 5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      )}
    </button>
  );
}