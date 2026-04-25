"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { features } from "@/utils/siteContent";

export default function ProductHighlights() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="highlights section-pad" id="service" ref={ref}>
      <div className="highlights__header">
        <p className="section-kicker">Shop paths</p>
        <h2>Built around how Kadapa actually buys cycles.</h2>
      </div>

      <div className="highlights__grid">
        {features.map((feature, index) => (
          <motion.article
            className="feature-card"
            key={feature.title}
            initial={{ opacity: 0, y: 26 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="feature-card__index">{String(index + 1).padStart(2, "0")}</span>
            <p>{feature.eyebrow}</p>
            <h3>{feature.title}</h3>
            <span>{feature.description}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
