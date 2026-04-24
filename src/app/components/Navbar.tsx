"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -20 
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-md bg-black/60 border-b border-white/5"
    >
      {/* Logo */}
      <div className="text-white/90 font-medium text-lg tracking-tight">
        WH-1000XM6
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-8 text-sm font-medium text-white/60">
        <a href="#overview" className="hover:text-white transition-colors duration-300">Overview</a>
        <a href="#technology" className="hover:text-white transition-colors duration-300">Technology</a>
        <a href="#noise-cancelling" className="hover:text-white transition-colors duration-300">Noise Cancelling</a>
        <a href="#specs" className="hover:text-white transition-colors duration-300">Specs</a>
      </div>

      {/* CTA */}
      <div>
        <button className="relative group overflow-hidden rounded-full bg-transparent border border-white/20 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5">
          <span className="relative z-10">Experience WH-1000XM6</span>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>
      </div>
    </motion.nav>
  );
}
