"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { getFrameUrl } from "@/utils/frameLoader";
import { storeInfo } from "@/utils/siteContent";

export default function StoreStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <motion.section
      ref={ref}
      className="story section-pad"
      id="story"
      initial={{ opacity: 0, y: 34 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="story__copy">
        <p className="section-kicker">Local buying, made clearer</p>
        <h2>The Syed Cycle Mart philosophy</h2>
        <p>
          A cycle shop in Kadapa has to serve more than one kind of rider. One customer is a
          parent choosing a first bicycle. Another is a student comparing gear cycles. Another
          needs a quick repair before the next school run or market trip.
        </p>
        <p>
          This site turns that everyday shop reality into a guided experience: choose by rider,
          compare use cases, understand service support, and reach the Trunk Road store without
          friction.
        </p>
        <p className="story__address">{storeInfo.address}</p>
      </div>
      <div className="story__media">
        <Image
          src={getFrameUrl(159)}
          alt="Exploded bicycle frame detail on a black background"
          width={1920}
          height={1080}
          sizes="(max-width: 980px) 100vw, 42vw"
        />
      </div>
    </motion.section>
  );
}
