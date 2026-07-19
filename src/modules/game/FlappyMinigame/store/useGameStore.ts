"use client";

import { create } from "zustand";
import {
  BIRD,
  PIPE,
  GROUND,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SCORE,
  TARGET_FRAME_MS,
} from "../constants/game";
import type { PipePair } from "../types/game"; 

export interface BirdState {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
  rotation: number;
}

export interface PionirGameStore {
  status: "idle" | "playing" | "gameOver";
  score: number;
  bestScore: number;
  hasRevived: boolean;
  isQuizOpen: boolean;
  bird: BirdState;
  pipes: PipePair[];
  groundOffset: number;

  setIsQuizOpen: (isOpen: boolean) => void;
  startGame: () => void;
  revive: () => void;
  flap: () => void;
  tick: (deltaTime: number) => void;
  reset: () => void;
}

const BEST_SCORE_KEY = "flappyBird_bestScore";

const loadBestScore = (): number => {
  try {
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
};

const saveBestScore = (score: number): void => {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch {
    /* silently fail if storage is unavailable */
  }
};

const createInitialState = () => ({
  status: "idle" as const,
  score: 0,
  bestScore: loadBestScore(),
  hasRevived: false,
  isQuizOpen: false,
  bird: {
    x: BIRD.x,
    y: BIRD.startY,
    width: BIRD.width,
    height: BIRD.height,
    velocity: 0,
    rotation: 0,
  },
  pipes: [] as PipePair[],
  groundOffset: 0,
});

const generatePipeHeight = (): number => {
  return Math.floor(
    Math.random() * (PIPE.maxHeight - PIPE.minHeight) + PIPE.minHeight
  );
};

const createPipePair = (x: number): PipePair => ({
  x,
  topHeight: generatePipeHeight(),
  passed: false,
});

const getCurrentSpeed = (score: number): number => {
  const tiers = Math.floor(score / PIPE.scoreInterval);
  const dynamicSpeed = PIPE.speed + tiers * PIPE.speedIncrement;
  return Math.min(dynamicSpeed, PIPE.maxSpeed);
};

const checkCollision = (state: PionirGameStore): boolean => {
  const { bird, pipes } = state;

  if (bird.y <= 0) return true;

  if (bird.y + bird.height >= GROUND.y) return true;

  for (const pipe of pipes) {
    const pipeRight = pipe.x + PIPE.width;
    const birdRight = bird.x + bird.width;

    if (birdRight > pipe.x && bird.x < pipeRight) {
      if (bird.y < pipe.topHeight) return true;

      const bottomPipeTop = pipe.topHeight + PIPE.gap;
      if (bird.y + bird.height > bottomPipeTop) return true;
    }
  }

  return false;
};

export const useGameStore = create<PionirGameStore>((set, get) => ({
  ...createInitialState(),

  setIsQuizOpen: (isOpen: boolean) => set({ isQuizOpen: isOpen }),

  startGame: () => {
    if (get().isQuizOpen) return;
    const initialPipes = [
      createPipePair(CANVAS_HEIGHT + 100),
      createPipePair(CANVAS_HEIGHT + 100 + PIPE.spacing),
      createPipePair(CANVAS_HEIGHT + 100 + PIPE.spacing * 2),
    ];

    set({
      status: "playing",
      score: 0,
      hasRevived: false,
      bird: {
        x: BIRD.x,
        y: BIRD.startY,
        width: BIRD.width,
        height: BIRD.height,
        velocity: BIRD.flapPower,
        rotation: BIRD.maxUpRotation,
      },
      pipes: initialPipes,
      groundOffset: 0,
    });
  },

  revive: () => {
    set((state) => {
      let safePipes = state.pipes.filter((pipe) => pipe.x > state.bird.x + 300);

      if (safePipes.length === 0) {
        safePipes = [
          createPipePair(state.bird.x + 400),
          createPipePair(state.bird.x + 400 + PIPE.spacing),
        ];
      } else if (safePipes.length === 1) {
        safePipes.push(createPipePair(safePipes[0].x + PIPE.spacing));
      }

      const isDeadOnGround = state.bird.y >= GROUND.y - state.bird.height - 20;
      const isDeadOnCeiling = state.bird.y <= 20;
      const safeY = (isDeadOnGround || isDeadOnCeiling) ? BIRD.startY : state.bird.y;

      return {
        status: "playing",
        hasRevived: true, 
        bird: {
          ...state.bird,
          y: safeY,
          velocity: BIRD.flapPower,
          rotation: BIRD.maxUpRotation,
        },
        pipes: safePipes, 
      };
    });
  },

  flap: () => {
    const { status } = get();
    if (status !== "playing") return;

    set((state) => ({
      bird: {
        ...state.bird,
        velocity: BIRD.flapPower,
        rotation: BIRD.maxUpRotation,
      },
    }));
  },

  /** Advance game state by one frame, scaled by deltaTime */
  tick: (deltaTime: number) => {
    const state = get();
    if (state.status !== "playing") return;

    const dt = Math.min(deltaTime, 33.33) / TARGET_FRAME_MS;

    const newVelocity = Math.min(
      state.bird.velocity + BIRD.gravity * dt,
      BIRD.maxVelocity
    );
    const newY = state.bird.y + newVelocity * dt;

    const targetRotation =
      newVelocity > 0
        ? Math.min(BIRD.maxDownRotation, newVelocity * 7)
        : BIRD.maxUpRotation;
    const rotationLerp = 1 - Math.pow(0.15, dt);
    const newRotation =
      state.bird.rotation +
      (targetRotation - state.bird.rotation) * rotationLerp;

    const newBird = {
      ...state.bird,
      y: newY,
      velocity: newVelocity,
      rotation: newRotation,
    };

    let newScore = state.score;
    const currentSpeed = getCurrentSpeed(state.score);
    const pipeMove = currentSpeed * dt;
    
    const newPipes = state.pipes
      .map((pipe) => {
        const newX = pipe.x - pipeMove;

        if (!pipe.passed && newX + PIPE.width < state.bird.x) {
          newScore += SCORE.pointsPerPipe;
          return { ...pipe, x: newX, passed: true };
        }

        return { ...pipe, x: newX };
      })
      .filter((pipe) => pipe.x > -PIPE.width);

    const lastPipe = newPipes[newPipes.length - 1];
    if (lastPipe && lastPipe.x < CANVAS_HEIGHT - PIPE.spacing) {
      newPipes.push(createPipePair(lastPipe.x + PIPE.spacing));
    }

    const newGroundOffset =
   (state.groundOffset + currentSpeed * dt) % CANVAS_WIDTH;

    const newState = {
      bird: newBird,
      pipes: newPipes,
      score: newScore,
      groundOffset: newGroundOffset,
    };

    const tempState = { ...state, ...newState };
    if (checkCollision(tempState)) {
      const bestScore = Math.max(newScore, state.bestScore);
      saveBestScore(bestScore);
      set({
        ...newState,
        status: "gameOver",
        bestScore,
      });
      return;
    }

    set(newState);
  },

  reset: () => {
    if (get().isQuizOpen) return;
    set({
      ...createInitialState(),
      bestScore: loadBestScore(),
    });
  },
}));