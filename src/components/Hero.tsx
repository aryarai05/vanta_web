import { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import { useReducedMotion, useIsMobile, useScrollProgress } from '@/hooks';
import HeroFallback from './HeroFallback';

const Hero3D = lazy(() => import('./three/Hero3D'));


type HeroProps = {
  easterEgg: boolean;
  easterEggDismiss: () => void;
};

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export default function Hero({ easterEgg, easterEggDismiss }: HeroProps) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const scrollProgress = useScrollProgress();
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setWebglAvailable(detectWebGL());
    setMounted(true);
  }, []);

  const scrollToNext = () => {
    document.querySelector('#filmmaker')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  const fade = (delay: number) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay } };

  // text fades out as user scrolls into the scene
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden grain" aria-label="VANTA hero">
      {/* 3D / fallback layer */}
      <div className="absolute inset-0">
        {mounted && webglAvailable ? (
          <Suspense fallback={<HeroFallback easterEgg={easterEgg} />}>
            <Hero3D easterEgg={easterEgg} reducedMotion={reduced} isMobile={isMobile} scrollProgress={scrollProgress} />
          </Suspense>
        ) : (
          <HeroFallback easterEgg={easterEgg} />
        )}
      </div>

      {/* overlays */}
      <div className="pointer-events-none absolute inset-0 vignette" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-vanta-bg to-transparent" />

      {/* text content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center" style={{ opacity: textOpacity }}>
        <motion.div {...fade(0.3)}>
          <span className="text-[0.65rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            Creative Collaboration Platform
          </span>
        </motion.div>

        <motion.h1 {...fade(0.4)} className="mt-6 font-sans text-hero font-semibold tracking-tightest text-vanta-bone">
          VANTA
        </motion.h1>

        <motion.p {...fade(0.55)} className="mt-5 max-w-2xl font-sans text-xl font-light leading-tight2 tracking-tight2 text-vanta-bone-dim md:text-3xl md:leading-tight2">
          WHERE CREATIVE TEAMS
          <br />
          BRING IDEAS TO LIFE.
        </motion.p>

        <motion.p {...fade(0.7)} className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-vanta-bone-faint md:text-base">
          One workspace for references, direction, feedback and the work itself.
        </motion.p>

        <motion.div {...fade(0.85)} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={scrollToContact}
            className="group relative w-full overflow-hidden border border-vanta-bone/40 px-8 py-3.5 text-sm font-medium tracking-wide2 text-vanta-bone transition-all hover:border-vanta-bone hover:bg-vanta-bone hover:text-vanta-bg sm:w-auto"
          >
            <span className="relative z-10">ENTER VANTA</span>
          </button>
          <button
            onClick={scrollToNext}
            className="flex w-full items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium tracking-wide2 text-vanta-bone-dim transition-colors hover:text-vanta-bone sm:w-auto"
          >
            <Play className="h-3.5 w-3.5" />
            EXPLORE THE PROCESS
          </button>
        </motion.div>
      </div>

      {/* scroll hint */}
      {scrollProgress < 0.05 && (
        <motion.button
          onClick={scrollToNext}
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-vanta-bone-faint"
          aria-label="Scroll to showreel"
        >
          <span className="text-[0.6rem] uppercase tracking-widest2">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-scroll-hint" />
        </motion.button>
      )}

      {/* easter egg overlay */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <div className="border border-vanta-glow/40 bg-vanta-bg/80 px-8 py-6 glow-violet backdrop-blur-md">
              <p className="font-serif text-lg italic text-vanta-glow">YOU FOUND THE HIDDEN FRAME.</p>
              <button onClick={easterEggDismiss} className="mt-3 text-xs uppercase tracking-widest2 text-vanta-bone-faint hover:text-vanta-bone">
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
