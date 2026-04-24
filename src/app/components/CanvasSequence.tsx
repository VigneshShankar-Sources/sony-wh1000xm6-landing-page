"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 240;

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress (0 to 1) to frame index (1 to FRAME_COUNT)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits, e.g., 001, 012, 120
      const imgNumber = i.toString().padStart(3, "0");
      img.src = `/images/sequence/ezgif-frame-${imgNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          // All images loaded, initial draw
          setImages(loadedImages);
          drawFrame(loadedImages[0]);
        }
      };
      loadedImages.push(img);
    }
    
    // In case they load from cache extremely fast, trigger a draw if already full
    if (loadedCount === FRAME_COUNT && loadedImages.length > 0) {
        setImages(loadedImages);
        drawFrame(loadedImages[0]);
    }
  }, []);

  const drawFrame = (img: HTMLImageElement | undefined) => {
    if (!img || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window (or high DPI if needed, but keeping it simple for now)
    // Actually, setting to window size might stretch the image if we don't calculate aspect ratio
    // Let's use standard object-fit: contain/cover logic on canvas
    const { width, height } = canvas;
    
    const hRatio = width / img.width;
    const vRatio = height / img.height;
    const ratio = Math.max(hRatio, vRatio); // cover behavior
    // For contain: const ratio = Math.min(hRatio, vRatio);
    // Since images have #050505 background matching our CSS, cover or contain works well. 
    // Contain is safer to not crop the headphones. Let's use 'contain' and clear with #050505.
    
    const centerShift_x = (width - img.width * ratio) / 2;
    const centerShift_y = (height - img.height * ratio) / 2;

    // Clear with #050505 background
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame
        if (images.length > 0) {
            const currentFrame = Math.round(frameIndex.get()) - 1;
            drawFrame(images[Math.max(0, currentFrame)]);
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing
    
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  // Redraw when scroll changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length > 0) {
      const index = Math.round(latest) - 1;
      const validIndex = Math.max(0, Math.min(index, FRAME_COUNT - 1));
      
      // Use requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        drawFrame(images[validIndex]);
      });
    }
  });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
