"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type TextOverlaysProps = {
  progress: number;
};

export default function TextOverlays({ progress }: TextOverlaysProps) {
  const motionProgress = useMotionValue(progress);

  useEffect(() => {
    motionProgress.set(progress);
  }, [motionProgress, progress]);

  const firstOpacity = useTransform(motionProgress, [0, 0.06, 0.24, 0.34], [0, 1, 0.95, 0]);
  const firstY = useTransform(motionProgress, [0, 0.1, 0.34], [22, 0, -16]);

  const secondOpacity = useTransform(motionProgress, [0.28, 0.42, 0.64, 0.74], [0, 1, 0.95, 0]);
  const secondY = useTransform(motionProgress, [0.28, 0.45, 0.74], [22, 0, -16]);

  const thirdOpacity = useTransform(motionProgress, [0.64, 0.76, 0.96, 1], [0, 1, 1, 0.86]);
  const thirdY = useTransform(motionProgress, [0.64, 0.8, 1], [22, 0, -6]);

  return (
    <div className="text-overlays" aria-hidden="true">
      <motion.div
        className="text-overlays__item text-overlays__item--left"
        style={{ opacity: firstOpacity, y: firstY }}
      >
        <small>01 / Whole Ride</small>
        <span>Built for Kadapa streets</span>
        <p>Start with the complete cycle: frame, wheels, comfort, and daily reliability in one view.</p>
      </motion.div>
      <motion.div
        className="text-overlays__item text-overlays__item--right"
        style={{ opacity: secondOpacity, y: secondY }}
      >
        <small>02 / Components</small>
        <span>Every part has a purpose</span>
        <p>Brakes, chains, tyres, pedals, seats, stands, and accessories become easy buying decisions.</p>
      </motion.div>
      <motion.div
        className="text-overlays__item text-overlays__item--center"
        style={{ opacity: thirdOpacity, y: thirdY }}
      >
        <small>03 / Local Service</small>
        <span>Choose the ride that fits</span>
        <p>Kids, ladies, gents, gear cycles, accessories, and repair support converge at Syed Cycle Mart.</p>
      </motion.div>
    </div>
  );
}
