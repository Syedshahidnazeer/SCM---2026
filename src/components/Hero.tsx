"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getFrameUrl } from "@/utils/frameLoader";
import { storeInfo } from "@/utils/siteContent";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <Image
        className="hero__image"
        src={getFrameUrl(0)}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero__scrim" />

      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="hero__eyebrow">{storeInfo.locationLine}</p>
        <h1>{storeInfo.name}</h1>
        <p className="hero__lede">
          A cinematic guide to cycles, accessories, and daily service from Trunk Road, Ganagapeta.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#cycles">
            Scroll to explore
          </a>
          <a className="button button--ghost" href={storeInfo.mapUrl} target="_blank" rel="noreferrer">
            Visit store
          </a>
        </div>
      </motion.div>

      <a className="scroll-cue" href="#cycles" aria-label="Scroll to explore the cycle animation">
        <span>Scroll to Explore</span>
        <span className="scroll-cue__line" aria-hidden="true" />
      </a>
    </section>
  );
}
