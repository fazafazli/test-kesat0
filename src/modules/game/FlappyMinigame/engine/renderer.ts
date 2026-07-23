"use client";

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PIPE,
  GROUND,
  BIRD,
  COLORS,
} from "../constants/game";
import type { Bird, PipePair } from "../types/game";

let bgImg: HTMLImageElement | null = null;
let nalaImg: HTMLImageElement | null = null;
let sayapImg: HTMLImageElement | null = null;
let arrowTopImg: HTMLImageElement | null = null;
let arrowBottomImg: HTMLImageElement | null = null;
let cloudImg: HTMLImageElement | null = null;

let bgCache: HTMLCanvasElement | null = null;
let cloudCache: HTMLCanvasElement | null = null;
let arrowTopCache: HTMLCanvasElement | null = null;
let arrowBottomCache: HTMLCanvasElement | null = null;

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
  bgImg = new Image();
  bgImg.src = "/minigame/background.svg";
  bgImg.onload = () => {
    if (bgImg) bgCache = preRenderToCanvas(bgImg, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  nalaImg = new Image();
  nalaImg.src = "/minigame/nala.svg";

  sayapImg = new Image();
  sayapImg.src = "/minigame/sayap.svg";

  arrowTopImg = new Image();
  arrowTopImg.src = "/minigame/arrowatas.svg";
  arrowTopImg.onload = () => {
    if (arrowTopImg) {
      const h = (PIPE.width / arrowTopImg.width) * arrowTopImg.height;
      arrowTopCache = preRenderToCanvas(arrowTopImg, PIPE.width, h);
    }
  };

  arrowBottomImg = new Image();
  arrowBottomImg.src = "/minigame/arrowbawah.svg";
  arrowBottomImg.onload = () => {
    if (arrowBottomImg) {
      const h = (PIPE.width / arrowBottomImg.width) * arrowBottomImg.height;
      arrowBottomCache = preRenderToCanvas(arrowBottomImg, PIPE.width, h);
    }
  };

  cloudImg = new Image();
  cloudImg.src = "/minigame/awan.svg";
  cloudImg.onload = () => {
    if (cloudImg) {
      cloudCache = preRenderToCanvas(cloudImg, CANVAS_WIDTH, GROUND.height);
    }
  };
}

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

export const drawPipes = (
  ctx: CanvasRenderingContext2D,
  pipes: PipePair[]
): void => {
  for (const pipe of pipes) {
    
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

export const drawGround = (
  ctx: CanvasRenderingContext2D,
  offset: number
): void => {
  // Math for endless panning
  const scrollX = -(offset % CANVAS_WIDTH);

  const cloudHeight = GROUND.height;
  
  // FIX 1: Lock the clouds strictly to the bottom of the canvas
  const cloudY = CANVAS_HEIGHT - cloudHeight; 

  if (cloudImg && cloudImg.complete) {
    // Draw the first cloud
    ctx.drawImage(cloudImg, scrollX, cloudY, CANVAS_WIDTH, cloudHeight);
    
    // FIX 2: Subtract 1 pixel (CANVAS_WIDTH - 1) to overlap them and kill the vertical seam!
    ctx.drawImage(cloudImg, scrollX + CANVAS_WIDTH - 1, cloudY, CANVAS_WIDTH, cloudHeight);
  } else {
    ctx.fillStyle = "#e5ddc5";
    ctx.fillRect(0, cloudY, CANVAS_WIDTH, cloudHeight);
  }
};

export const clearCanvas = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const drawBirdImage = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rotation: number
): void => {
  ctx.save();
  ctx.translate(x + BIRD.width / 2, y + BIRD.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-(x + BIRD.width / 2), -(y + BIRD.height / 2));

  const w = BIRD.width;
  const h = BIRD.height;

  if (nalaImg && nalaImg.complete) {
    ctx.drawImage(nalaImg, x, y, w, h);
  } else {
    ctx.fillStyle = COLORS.birdBody;
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.birdBeak;
    ctx.beginPath();
    ctx.moveTo(x + w - 2, y + h / 2);
    ctx.lineTo(x + w + 8, y + h / 2 - 4);
    ctx.lineTo(x + w + 8, y + h / 2 + 4);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = COLORS.birdEye;
    ctx.beginPath();
    ctx.arc(x + w * 0.65, y + h * 0.35, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.birdPupil;
    ctx.beginPath();
    ctx.arc(x + w * 0.7, y + h * 0.35, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  if (sayapImg && sayapImg.complete) {
    ctx.drawImage(sayapImg, x - 5, y + h * 0.3, w * 0.5, h * 0.5);
  } else {
    ctx.fillStyle = COLORS.birdWing;
    ctx.beginPath();
    ctx.ellipse(x + w * 0.35, y + h * 0.55, w * 0.25, h * 0.18, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
};

export const drawBird = (
  ctx: CanvasRenderingContext2D,
  bird: Bird,
  _frame: number
): void => {
  drawBirdImage(ctx, bird.x, bird.y, bird.rotation);
};

export const drawIdleBird = (
  ctx: CanvasRenderingContext2D,
  frame: number
): void => {
  const floatY = Math.sin(frame * 0.08) * 6;
  const x = BIRD.x;
  const y = BIRD.startY + floatY;
  drawBirdImage(ctx, x, y, 0);
};

export const drawScore = (
  ctx: CanvasRenderingContext2D,
  score: number
): void => {
  const text = String(score);
  const fontSize = 48;
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  ctx.fillStyle = COLORS.scoreShadow;
  ctx.fillText(text, CANVAS_WIDTH / 2 + 2, 22);
  ctx.fillStyle = COLORS.scoreText;
  ctx.fillText(text, CANVAS_WIDTH / 2, 20);
};