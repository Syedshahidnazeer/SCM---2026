"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { closeFrame, loadFrame } from "@/utils/frameLoader";
import { cancelIdle, scheduleIdle } from "@/utils/performance";

function uniqueFrames(frames: number[], totalFrames: number) {
  return Array.from(new Set(frames.filter((frame) => frame >= 0 && frame < totalFrames)));
}

export function useImageSequence(totalFrames: number, priorityIndex = 0) {
  const cacheRef = useRef<Map<number, CanvasImageSource>>(new Map());
  const loadingRef = useRef<Set<number>>(new Set());
  const isMountedRef = useRef(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const requestFrame = useCallback(
    async (index: number) => {
      if (index < 0 || index >= totalFrames || !isMountedRef.current) {
        return;
      }

      const cache = cacheRef.current;
      const loading = loadingRef.current;

      if (cache.has(index) || loading.has(index)) {
        return;
      }

      loading.add(index);

      try {
        const source = await loadFrame(index);

        if (!isMountedRef.current || cache.has(index)) {
          closeFrame(source);
          loading.delete(index);
          return;
        }

        cache.set(index, source);
        loading.delete(index);

        const nextLoadedCount = cache.size;
        setLoadedCount(nextLoadedCount);
        setLoadingProgress(Math.round((nextLoadedCount / totalFrames) * 100));
      } catch {
        loading.delete(index);
      }
    },
    [totalFrames]
  );

  useEffect(() => {
    const idleHandles: number[] = [];
    const cache = cacheRef.current;
    const loading = loadingRef.current;
    isMountedRef.current = true;

    const loadCriticalFrames = async () => {
      const criticalFrames = uniqueFrames(
        [
          ...Array.from({ length: Math.min(24, totalFrames) }, (_, index) => index),
          59,
          119,
          179,
          totalFrames - 1
        ],
        totalFrames
      );

      await Promise.all(criticalFrames.map((index) => requestFrame(index)));

      idleHandles.push(
        scheduleIdle(() => {
          for (let index = 24; index < totalFrames; index += 4) {
            void requestFrame(index);
          }
        })
      );

      idleHandles.push(
        scheduleIdle(() => {
          for (let index = 24; index < totalFrames; index += 1) {
            if (index % 4 !== 0) {
              void requestFrame(index);
            }
          }
        })
      );
    };

    void loadCriticalFrames();

    return () => {
      isMountedRef.current = false;
      idleHandles.forEach(cancelIdle);
      cache.forEach(closeFrame);
      cache.clear();
      loading.clear();
    };
  }, [requestFrame, totalFrames]);

  useEffect(() => {
    const priorityWindow = uniqueFrames(
      Array.from({ length: 19 }, (_, index) => {
        const radius = Math.ceil(index / 2);
        const direction = index % 2 === 0 ? 1 : -1;
        return priorityIndex + radius * direction;
      }),
      totalFrames
    );

    for (const index of priorityWindow) {
      void requestFrame(index);
    }
  }, [priorityIndex, requestFrame, totalFrames]);

  const getFrame = useCallback(
    (targetIndex: number) => {
      const cache = cacheRef.current;
      const exact = cache.get(targetIndex);

      if (exact) {
        return exact;
      }

      for (let radius = 1; radius < totalFrames; radius += 1) {
        const previous = cache.get(targetIndex - radius);

        if (previous) {
          return previous;
        }

        const next = cache.get(targetIndex + radius);

        if (next) {
          return next;
        }
      }

      return null;
    },
    [totalFrames]
  );

  const preloadAround = useCallback(
    (targetIndex: number, radius = 8) => {
      for (let offset = -radius; offset <= radius; offset += 1) {
        void requestFrame(targetIndex + offset);
      }
    },
    [requestFrame]
  );

  return {
    getFrame,
    preloadAround,
    loadedCount,
    loadingProgress,
    isReady: loadedCount > 0
  };
}
