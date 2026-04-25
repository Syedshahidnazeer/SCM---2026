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
      setSize({
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
        dpr: Math.min(window.devicePixelRatio || 1, 2)
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
