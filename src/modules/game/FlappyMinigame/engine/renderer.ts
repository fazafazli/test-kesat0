"use client";

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PIPE,
  GROUND,
  BIRD,
} from "../constants/game";
import type { Bird, PipePair } from "../types/game";

/* ========================================
   Asset Initialization & Offscreen Caching
======================================== */
let bgImg: HTMLImageElement | null = null;
let nalaImg: HTMLImageElement | null = null;
let sayapImg: HTMLImageElement | null = null;
let arrowTopImg: HTMLImageElement | null = null;
let arrowBottomImg: HTMLImageElement | null = null;
let cloudImg: HTMLImageElement | null = null;

/* Hardware-accelerated offscreen bitmap cache buffers */
let bgCache: HTMLCanvasElement | null = null;
let cloudCache: HTMLCanvasElement | null = null;
let arrowTopCache: HTMLCanvasElement | null = null;
let arrowBottomCache: HTMLCanvasElement | null = null;

/** Helper to convert vector SVGs into static hardware bitmaps once */
const preRenderToCanvas = (
  img: HTMLImageElement,
  width: number,
  height: number
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(img, 0, 0, width, height);
  }
  return canvas;
};

if (typeof window !== "undefined") {
  // 1. Sky Background Cache
  bgImg = new Image();
  bgImg.src = "/minigame/background.svg";
  bgImg.onload = () => {
    if (bgImg) bgCache = preRenderToCanvas(bgImg, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  // 2. Mascot Sprites (Rendered directly, lightweight)
  nalaImg = new Image();
  nalaImg.src = "/minigame/nala.svg";

  sayapImg = new Image();
  sayapImg.src = "/minigame/sayap.svg";

  // 3. Top Arrow Pipe Cache
  arrowTopImg = new Image();
  arrowTopImg.src = "/minigame/arrowatas.svg";
  arrowTopImg.onload = () => {
    if (arrowTopImg) {
      const h = (PIPE.width / arrowTopImg.width) * arrowTopImg.height;
      arrowTopCache = preRenderToCanvas(arrowTopImg, PIPE.width, h);
    }
  };

  // 4. Bottom Arrow Pipe Cache
  arrowBottomImg = new Image();
  arrowBottomImg.src = "/minigame/arrowbawah.svg";
  arrowBottomImg.onload = () => {
    if (arrowBottomImg) {
      const h = (PIPE.width / arrowBottomImg.width) * arrowBottomImg.height;
      arrowBottomCache = preRenderToCanvas(arrowBottomImg, PIPE.width, h);
    }
  };

  // 5. Scrolling Clouds Cache
  cloudImg = new Image();
  cloudImg.src = "/minigame/awan.svg";
  cloudImg.onload = () => {
    if (cloudImg) {
      cloudCache = preRenderToCanvas(cloudImg, CANVAS_WIDTH, GROUND.height);
    }
  };
}

/* ========================================
   Canvas Renderer
======================================== */

/** Draw the background using the hardware-accelerated bitmap cache */
export const drawBackground = (ctx: CanvasRenderingContext2D): void => {
  if (bgCache) {
    ctx.drawImage(bgCache, 0, 0);
  } else if (bgImg && bgImg.complete) {
    ctx.drawImage(bgImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    ctx.fillStyle = "#FFF3D3";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

/** Draw all pipe pairs using high-speed offscreen cache draws */
export const drawPipes = (
  ctx: CanvasRenderingContext2D,
  pipes: PipePair[]
): void => {
  for (const pipe of pipes) {
    
    /* Top pipe ("arrowatas.svg") */
    if (arrowTopCache) {
      ctx.drawImage(
        arrowTopCache,
        pipe.x,
        pipe.topHeight - arrowTopCache.height
      );
    } else if (arrowTopImg && arrowTopImg.complete) {
      const h = (PIPE.width / arrowTopImg.width) * arrowTopImg.height;
      ctx.drawImage(arrowTopImg, pipe.x, pipe.topHeight - h, PIPE.width, h);
    } else {
      ctx.fillStyle = "#D4A017";
      ctx.fillRect(pipe.x, 0, PIPE.width, pipe.topHeight);
    }

    /* Bottom pipe ("arrowbawah.svg") */
    const bottomY = pipe.topHeight + PIPE.gap;
    
    if (arrowBottomCache) {
      ctx.drawImage(
        arrowBottomCache,
        pipe.x,
        bottomY
      );
    } else if (arrowBottomImg && arrowBottomImg.complete) {
      const h = (PIPE.width / arrowBottomImg.width) * arrowBottomImg.height;
      ctx.drawImage(arrowBottomImg, pipe.x, bottomY, PIPE.width, h);
    } else {
      const bottomHeight = GROUND.y - bottomY;
      ctx.fillStyle = "#D4A017";
      ctx.fillRect(pipe.x, bottomY, PIPE.width, bottomHeight);
    }
  }
};

/** Draw the ground with seamless scrolling clouds from bitmap cache */
export const drawGround = (
  ctx: CanvasRenderingContext2D,
  offset: number
): void => {
  if (cloudCache) {
    ctx.drawImage(cloudCache, -offset, GROUND.y);
    ctx.drawImage(cloudCache, CANVAS_WIDTH - offset - 20 , GROUND.y);
  } else if (cloudImg && cloudImg.complete) {
    ctx.drawImage(cloudImg, -offset, GROUND.y, CANVAS_WIDTH, GROUND.height);
    ctx.drawImage(cloudImg, CANVAS_WIDTH - offset, GROUND.y, CANVAS_WIDTH, GROUND.height);
  } else {
    ctx.fillStyle = "#F5DEB3";
    ctx.fillRect(0, GROUND.y, CANVAS_WIDTH, GROUND.height);
  }
};

/** Draw Nala (the bird) with rotation and wing animation */
export const drawBird = (
  ctx: CanvasRenderingContext2D,
  bird: Bird,
  flapFrame: number
): void => {
  ctx.save();

  const centerX = bird.x + bird.width / 2;
  const centerY = bird.y + bird.height / 2;
  ctx.translate(centerX, centerY);
  ctx.rotate((bird.rotation * Math.PI) / 180);

  const VISUAL_SCALE = 1.3; 
  const visualWidth = bird.width * VISUAL_SCALE;
  const visualHeight = bird.height * VISUAL_SCALE;
  const hw = visualWidth / 2;
  const hh = visualHeight / 2;

  if (nalaImg && nalaImg.complete) {
    ctx.drawImage(nalaImg, -hw, -hh, visualWidth, visualHeight);
  } else {
    ctx.beginPath();
    ctx.ellipse(0, 0, bird.width / 2, bird.height / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#D4A017";
    ctx.fill();
  }

  if (sayapImg && sayapImg.complete) {
    const wingOffset = Math.sin(flapFrame * 0.5) * 4;
    const wingWidth = visualWidth * 0.6;
    const wingHeight = visualHeight * 0.6;
    ctx.drawImage(
      sayapImg,
      -hw * 0.8, 
      -wingHeight / 2 + wingOffset, 
      wingWidth, 
      wingHeight
    );
  }

  ctx.restore();
};

/** Draw the current score on screen (HUD) */
export const drawScore = (
  ctx: CanvasRenderingContext2D,
  score: number
): void => {
  const text = String(score);
  ctx.font = 'bold 56px "Impact", sans-serif';
  ctx.textAlign = "center";
  ctx.fillStyle = "#6F4E37";
  ctx.fillText(text, CANVAS_WIDTH / 2, 80);
};

/** Draw idle state bird floating animation */
export const drawIdleBird = (
  ctx: CanvasRenderingContext2D,
  frame: number
): void => {
  const idleBird: Bird = {
    x: BIRD.x,
    y: BIRD.startY + Math.sin(frame * 0.05) * 8,
    width: BIRD.width,
    height: BIRD.height,
    velocity: 0,
    rotation: 0,
  };

  drawBird(ctx, idleBird, frame);
};

/** Clear the entire canvas */
export const clearCanvas = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};