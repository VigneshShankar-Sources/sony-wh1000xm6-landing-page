import Navbar from "./components/Navbar";
import CanvasSequence from "./components/CanvasSequence";
import StorytellingOverlay from "./components/StorytellingOverlay";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      {/* 
        The canvas is fixed and will render the images mapped to the scroll progress 
        of the StorytellingOverlay which creates the 400vh scrollable area.
      */}
      <CanvasSequence />
      
      {/* 
        The overlay contains the text sections that fade in/out as you scroll.
        It spans 400vh to give enough scroll room for the 240 frames.
      */}
      <StorytellingOverlay />
    </main>
  );
}
