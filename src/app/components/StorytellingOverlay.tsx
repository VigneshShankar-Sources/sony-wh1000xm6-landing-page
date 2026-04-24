"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function StorytellingOverlay() {
  const { scrollYProgress } = useScroll();

  // Section 1: Hero (0% - 15%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Section 2: Engineering Reveal (15% - 40%)
  const engOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const engX = useTransform(scrollYProgress, [0.15, 0.25], [-50, 0]);

  // Section 3: Noise Cancelling (40% - 65%)
  const ncOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const ncX = useTransform(scrollYProgress, [0.4, 0.5], [50, 0]);

  // Section 4: Sound & Upscaling (65% - 85%)
  const soundOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.8, 0.85], [0, 1, 1, 0]);
  const soundY = useTransform(scrollYProgress, [0.65, 0.75], [50, 0]);

  // Section 5: Reassembly & CTA (85% - 100%)
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);

  return (
    <div className="relative z-10 w-full" style={{ height: "400vh" }}>
      {/* 
        This container is 400vh tall to create the scroll space.
        Inside, we use fixed positioning for the text sections 
        so they remain in the viewport while scrolling.
      */}

      {/* Hero / Intro */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6"
      >
        <div className="relative pointer-events-auto">
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none" />
          
          <h1 className="relative z-10 text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Sony WH-1000XM6
          </h1>
          <p className="relative z-10 text-2xl md:text-3xl text-white/90 font-medium tracking-tight mb-2">
            Silence, perfected.
          </p>
          <p className="relative z-10 text-lg md:text-xl text-white/60 max-w-lg mx-auto">
            Flagship wireless noise cancelling, re-engineered for a world that never stops.
          </p>
        </div>
      </motion.div>

      {/* Engineering Reveal */}
      <motion.div
        style={{ opacity: engOpacity, x: engX }}
        className="fixed inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none"
      >
        <div className="pointer-events-auto max-w-md">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Precision-engineered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-secondary">for silence.</span>
          </h2>
          <div className="space-y-4 text-white/60 text-lg leading-relaxed">
            <p>
              Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
            </p>
            <p>
              Every component is tuned for balance, power, and comfort—hour after hour.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Noise Cancelling & Microphones */}
      <motion.div
        style={{ opacity: ncOpacity, x: ncX }}
        className="fixed inset-y-0 right-0 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none text-right md:items-end items-start"
      >
        <div className="pointer-events-auto max-w-md text-left md:text-right">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Adaptive noise cancelling, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-primary">redefined.</span>
          </h2>
          <ul className="space-y-4 text-white/60 text-lg leading-relaxed">
            <li>Multi-microphone array listens in every direction.</li>
            <li>Real-time noise analysis adjusts to your environment.</li>
            <li>Your music stays pure—planes, trains, and crowds fade away.</li>
          </ul>
        </div>
      </motion.div>

      {/* Sound & Upscaling */}
      <motion.div
        style={{ opacity: soundOpacity, y: soundY }}
        className="fixed inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none"
      >
        <div className="pointer-events-auto max-w-md">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Immersive, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00D6FF]">lifelike sound.</span>
          </h2>
          <div className="space-y-4 text-white/60 text-lg leading-relaxed">
            <p>
              High-performance drivers unlock detail, depth, and texture in every track.
            </p>
            <p>
              AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Reassembly & CTA */}
      <motion.div
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6"
      >
        <div className="relative pointer-events-auto mt-64 md:mt-96">
          {/* Subtle Glow behind CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-primary/20 blur-[80px] rounded-full z-0 pointer-events-none" />
          
          <h2 className="relative z-10 text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            Hear everything. <br className="md:hidden" /> Feel nothing else.
          </h2>
          <p className="relative z-10 text-xl text-white/60 mb-8 max-w-xl mx-auto font-medium">
            WH-1000XM6. Designed for focus, crafted for comfort.
          </p>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-black font-semibold tracking-wide transition-transform duration-300 hover:scale-105">
              <span className="relative z-10">Experience WH-1000XM6</span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-200 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="text-white/80 font-medium hover:text-white transition-colors duration-300 flex items-center gap-2">
              See full specs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className="relative z-10 text-xs text-white/40 mt-8">
            Engineered for airports, offices, and everything in between.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
