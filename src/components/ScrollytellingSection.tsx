"use client";

import { CSSProperties } from "react";
import BicycleCanvas from "@/components/BicycleCanvas";
import TextOverlays from "@/components/TextOverlays";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const chapters = [
  { label: "Ride", progress: 0 },
  { label: "Parts", progress: 0.32 },
  { label: "Service", progress: 0.62 },
  { label: "Visit", progress: 0.86 }
];

export default function ScrollytellingSection() {
  const { containerRef, scrollProgress } = useScrollProgress<HTMLElement>();
  const activeChapter = chapters.reduce((active, chapter, index) => {
    return scrollProgress >= chapter.progress ? index : active;
  }, 0);
  const scrollPercent = Math.round(scrollProgress * 100);

  return (
    <section
      className="scrolly"
      id="cycles"
      ref={containerRef}
      style={{ "--scroll-progress": scrollProgress } as CSSProperties}
    >
      <div className="scrolly__sticky">
        <div className="scrolly__ambient" aria-hidden="true" />
        <div className="scrolly__topline">
          <span>Syed Cycle Mart / {chapters[activeChapter].label}</span>
          <span>{scrollPercent}%</span>
        </div>
        <div className="scrolly__progress" aria-hidden="true">
          <span />
        </div>
        <BicycleCanvas progress={scrollProgress} />
        <TextOverlays progress={scrollProgress} />
        <ol className="scrolly__chapters" aria-label="Scroll story chapters">
          {chapters.map((chapter, index) => (
            <li className={index === activeChapter ? "is-active" : ""} key={chapter.label}>
              <span>{chapter.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
