"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  playAmbient: () => Promise<void>;
  pauseAmbient: () => void;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/Section.mp3");

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 1;

    ambientRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const playAmbient = async () => {
    const ambient = ambientRef.current;

    if (!ambient) return;

    try {
      await ambient.play();
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
    }
  };

  const pauseAmbient = () => {
  const ambient = ambientRef.current;

  if (!ambient) return;

  ambient.pause();
  setIsPlaying(false);
};

  return (
    <AudioContext.Provider
      value={{
        playAmbient,
        pauseAmbient,
        isPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudio harus berada di dalam AudioProvider");
  }

  return context;
}
