"use client";

import { useEffect, useRef, useState } from "react";
import { clamp } from "@/utils/performance";

export function useScrollProgress<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const element = containerRef.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = clamp((window.scrollY - sectionTop) / scrollableDistance);

      setScrollProgress(nextProgress);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return { containerRef, scrollProgress };
}
