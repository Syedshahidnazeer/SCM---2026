"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type LoadingScreenProps = {
  progress: number;
};

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smoothly interpolate the progress value for a premium feel
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      if (displayProgress < progress) {
        setDisplayProgress((prev) => Math.min(prev + 2, progress));
      }
    });
    return () => cancelAnimationFrame(timer);
  }, [progress, displayProgress]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "24rem", width: "100%", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "0.02em" }}
        >
          Syed Cycle Mart
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.85rem", marginTop: "0.25rem", color: "var(--gold)" }}
        >
          Cycle House
        </motion.div>

        <div style={{ marginTop: "3rem", position: "relative", height: "1px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
          <motion.div 
            style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              height: "100%", 
              background: "var(--gold)",
              width: `${displayProgress}%`,
              transition: "width 0.1s linear"
            }} 
          />
        </div>
        
        <div style={{ 
          marginTop: "1rem", 
          display: "flex", 
          justifyContent: "space-between", 
          fontFamily: "var(--font-body)", 
          fontSize: "0.65rem", 
          textTransform: "uppercase", 
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.4)"
        }}>
          <span>Loading Experience</span>
          <span>{displayProgress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
