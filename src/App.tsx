import { useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FilmmakerExperience from '@/components/FilmmakerExperience';
import DragFrame from '@/components/DragFrame';
import FrameStory from '@/components/FrameStory';
import InteractiveMoodboard from '@/components/InteractiveMoodboard';
import AboutVanta from '@/components/AboutVanta';
import ProblemSolution from '@/components/ProblemSolution';
import CreativeDirectionBoard from '@/components/CreativeDirectionBoard';
import VideoReview from '@/components/VideoReview';
import EditorialTimeline from '@/components/EditorialTimeline';
import ProductWorkspace from '@/components/ProductWorkspace';
import AssetLibrary from '@/components/AssetLibrary';
import CreativeTeam from '@/components/CreativeTeam';
import FinalCTA from '@/components/FinalCTA';
import { useKonamiCode, useReducedMotion } from '@/hooks';

function App() {
  const [easterEgg, setEasterEgg] = useState(false);
  const [easterEggReset, setEasterEggReset] = useState(0);
  const reduced = useReducedMotion();

  const triggerEasterEgg = useCallback(() => {
    setEasterEgg(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setEasterEgg(false);
      setEasterEggReset((v) => v + 1);
    }, 6000);
  }, []);

  useKonamiCode(triggerEasterEgg, easterEggReset);

  const handleEnter = () => {
    document.querySelector('#workspace')?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="relative min-h-screen bg-vanta-bg">
      <Navigation />
      <main>
        {/* 01 — HERO: cinematic camera */}
        <Hero
          easterEgg={easterEgg}
          easterEggDismiss={() => {
            setEasterEgg(false);
            setEasterEggReset((v) => v + 1);
          }}
        />

        {/* 02 — FILMMAKER EXPERIENCE: video player + split screen */}
        <FilmmakerExperience />

        {/* 03 — DRAG THE FRAME: peel layers */}
        <DragFrame />

        {/* 04 — THE STORY BEHIND A FRAME: editorial + metadata */}
        <FrameStory />

        {/* 05 — MOODBOARD: 3D interactive board */}
        <InteractiveMoodboard />

        {/* 06 — ABOUT VANTA: convergence story */}
        <AboutVanta />

        {/* 07 — WHY VANTA EXISTS: problem → solution */}
        <ProblemSolution />

        {/* 08 — CREATIVE DIRECTION BOARD: editable notes */}
        <CreativeDirectionBoard />

        {/* 09 — VIDEO REVIEW: frame-accurate comments */}
        <VideoReview />

        {/* 10 — EDITORIAL TIMELINE: 6-stage journey */}
        <EditorialTimeline />

        {/* 11 — PRODUCT WORKSPACE: full app UI */}
        <ProductWorkspace />

        {/* 12 — ASSET LIBRARY */}
        <AssetLibrary />

        {/* 13 — CREATIVE TEAM */}
        <CreativeTeam />

        {/* 14 — FINAL CTA */}
        <FinalCTA onEnter={handleEnter} />
      </main>
    </div>
  );
}

export default App;
