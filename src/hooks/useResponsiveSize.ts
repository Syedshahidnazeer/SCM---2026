"use client";

import { RefObject, useEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
  dpr: number;
};

export function useResponsiveSize<T extends HTMLElement>(ref: RefObject<T>) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let frame = 0;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const isMobile =
        window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(pointer: coarse)").matches;
      const maxDpr = isMobile ? 1.25 : 2;

      setSize((prev) => {
        const newWidth = Math.max(1, Math.round(rect.width));
        const newHeight = Math.max(1, Math.round(rect.height));
        
        // Prevent aggressive canvas resizing on mobile when the address bar hides/shows
        if (isMobile && prev.width === newWidth && Math.abs(prev.height - newHeight) < 120 && prev.height !== 0) {
          return prev;
        }

        return {
          width: newWidth,
          height: newHeight,
          dpr: Math.min(window.devicePixelRatio || 1, maxDpr)
        };
      });
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();

    const observer = new ResizeObserver(requestUpdate);
    observer.observe(element);
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", requestUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [ref]);

  return size;
}
