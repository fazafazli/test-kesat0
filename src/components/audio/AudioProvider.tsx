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
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/Section.mp3");

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.35;

    ambientRef.current = audio;

    return () => {
      if (fadeRef.current) {
        clearInterval(fadeRef.current);
      }
      audio.pause();
    };
  }, []);

  const playAmbient = async () => {
    const ambient = ambientRef.current;

    if (!ambient) return;

    try {
      ambient.volume = 0;
      await ambient.play();

      const targetVolume = 0.35;
      const duration = 1500;
      const steps = 20;
      const increment = targetVolume / steps;
      const interval = duration / steps;

      let currentStep = 0;
      fadeRef.current = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          ambient.volume = targetVolume;
          if (fadeRef.current) {
            clearInterval(fadeRef.current);
            fadeRef.current = null;
          }
        } else {
          ambient.volume = Math.min(currentStep * increment, targetVolume);
        }
      }, interval);

      setIsPlaying(true);
    } catch (err) {
      console.error(err);
    }
  };

  const pauseAmbient = () => {
  const ambient = ambientRef.current;

  if (!ambient) return;

  if (fadeRef.current) {
    clearInterval(fadeRef.current);
    fadeRef.current = null;
  }

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
