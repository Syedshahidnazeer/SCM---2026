"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useRef } from "react";
import { useCanvasRenderer } from "@/hooks/useCanvasRenderer";
import { useImageSequence } from "@/hooks/useImageSequence";
import { useResponsiveSize } from "@/hooks/useResponsiveSize";
import { getFrameUrl, TOTAL_FRAMES } from "@/utils/frameLoader";
import { clamp } from "@/utils/performance";

type BicycleCanvasProps = {
  progress: number;
};

export default function BicycleCanvas({ progress }: BicycleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = useResponsiveSize(canvasRef);
  const shouldReduceMotion = useReducedMotion();

  const frameIndex = useMemo(() => {
    if (shouldReduceMotion) {
      return 119;
    }

    return Math.round(clamp(progress) * (TOTAL_FRAMES - 1));
  }, [progress, shouldReduceMotion]);

  const { getFrame, isReady, loadedCount, loadingProgress, preloadAround } = useImageSequence(
    TOTAL_FRAMES,
    frameIndex
  );

  const source = getFrame(frameIndex);
  const scale = 1;

  useEffect(() => {
    preloadAround(frameIndex, 10);
  }, [frameIndex, preloadAround]);

  useCanvasRenderer(canvasRef, source, size);

  return (
    <div
      className="bicycle-canvas"
      data-ready={isReady}
      style={{ "--scrub-scale": scale } as CSSProperties}
    >
      {!isReady ? (
        <Image
          className="bicycle-canvas__fallback"
          src={getFrameUrl(0)}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="(max-width: 680px) 100vw, 92vw"
        />
      ) : null}
      <canvas
        ref={canvasRef}
        className="bicycle-canvas__surface"
        aria-label={`Bicycle frame ${frameIndex + 1} of ${TOTAL_FRAMES}`}
      />
      {loadingProgress < 100 ? (
        <div className="bicycle-canvas__status" aria-live="polite">
          <span>{loadingProgress}% loaded</span>
          <span>{loadedCount}/{TOTAL_FRAMES}</span>
        </div>
      ) : null}
    </div>
  );
}
