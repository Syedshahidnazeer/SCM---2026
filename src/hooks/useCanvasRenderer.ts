"use client";

import { RefObject, useEffect } from "react";

type CanvasSize = {
  width: number;
  height: number;
  dpr: number;
};

type DrawRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function getSourceSize(source: CanvasImageSource) {
  if ("videoWidth" in source) {
    return { width: source.videoWidth, height: source.videoHeight };
  }

  if ("naturalWidth" in source) {
    return { width: source.naturalWidth, height: source.naturalHeight };
  }

  if ("displayWidth" in source) {
    return { width: source.displayWidth, height: source.displayHeight };
  }

  if ("width" in source && "height" in source) {
    return { width: Number(source.width), height: Number(source.height) };
  }

  return { width: 1920, height: 1080 };
}

function getResponsiveDrawRect(size: CanvasSize, sourceSize: { width: number; height: number }): DrawRect {
  const sourceAspect = sourceSize.width / sourceSize.height;
  const isPortrait = size.width < size.height;
  const xPadding = Math.min(Math.max(size.width * 0.035, 12), isPortrait ? 22 : 72);
  const yPadding = Math.min(Math.max(size.height * 0.07, 54), isPortrait ? 118 : 92);
  const availableWidth = Math.max(1, size.width - xPadding * 2);
  const availableHeight = Math.max(1, size.height - yPadding * 2);
  const scale = Math.min(availableWidth / sourceSize.width, availableHeight / sourceSize.height);
  const targetWidth = sourceSize.width * scale;
  const targetHeight = sourceSize.height * scale;
  const x = (size.width - targetWidth) / 2;
  const y = (size.height - targetHeight) / 2;

  return {
    x,
    y,
    width: targetWidth,
    height: targetHeight
  };
}

export function useCanvasRenderer(
  canvasRef: RefObject<HTMLCanvasElement>,
  source: CanvasImageSource | null,
  size: CanvasSize
) {
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !source || !size.width || !size.height) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });

    if (!context) {
      return;
    }

    const targetWidth = Math.floor(size.width * size.dpr);
    const targetHeight = Math.floor(size.height * size.dpr);

    if (canvas.width !== targetWidth) {
      canvas.width = targetWidth;
    }

    if (canvas.height !== targetHeight) {
      canvas.height = targetHeight;
    }

    context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
    context.fillStyle = "#000000";
    context.fillRect(0, 0, size.width, size.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    const sourceSize = getSourceSize(source);
    const rect = getResponsiveDrawRect(size, sourceSize);

    context.drawImage(source, rect.x, rect.y, rect.width, rect.height);
  }, [canvasRef, source, size]);
}
