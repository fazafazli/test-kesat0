"use client";

export interface Bird {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
  rotation: number;
}

export interface PipePair {
  x: number;
  topHeight: number;
  passed: boolean;
}

export type GameStatus = "idle" | "playing" | "gameOver";

export interface GameState {
  status: GameStatus;
  score: number;
  bestScore: number;
  bird: Bird;
  pipes: PipePair[];
  groundOffset: number;
  hasRevived: boolean;
  revive: () => void;
}

export interface GameActions {
  startGame: () => void;
  flap: () => void;
  tick: (deltaTime: number) => void;
  reset: () => void;
}
