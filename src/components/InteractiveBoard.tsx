import { useRef, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useReducedMotion } from '@/hooks';

const InteractiveBoard3D = lazy(() => import('./three/InteractiveBoard3D'));

type Card = {
  id: number;
  title: string;
  subtitle: string;
  type: string;
};

const CARDS: Card[] = [
  { id: 0, title: 'NOVA / Frame 04', subtitle: 'Opening sequence — warm grade', type: 'VIDEO' },
  { id: 1, title: 'Portrait Reference', subtitle: 'Late afternoon light study', type: 'PHOTO' },
  { id: 2, title: 'Typography Study', subtitle: 'Display weight — condensed', type: 'TYPE' },
  { id: 3, title: 'Color Direction', subtitle: 'Warm neutral with violet accent', type: 'COLOR' },
  { id: 4, title: 'Production Note', subtitle: 'Hold negative space before first cut', type: 'NOTE' },
];

export default function InteractiveBoard() {
  const reduced = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section className="relative overflow-hidden bg-vanta-bg-soft py-24 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p {...reveal}>
            <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
              04 — In Motion
            </span>
          </motion.p>
          <motion.h2
            {...(reduced ? {} : { ...reveal, transition: { ...reveal.transition, delay: 0.1 } })}
            className="mt-6 font-sans text-3xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-5xl"
          >
            YOUR IDEAS, IN MOTION.
          </motion.h2>
        </div>

        {/* 3D interactive board */}
        <motion.div
          {...(reduced ? {} : { ...reveal, transition: { ...reveal.transition, delay: 0.2 } })}
          className="relative mt-16 h-[400px] w-full md:h-[560px]"
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-vanta-bone-faint">
                Loading board...
              </div>
            }
          >
            <InteractiveBoard3D
              reducedMotion={reduced}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          </Suspense>
        </motion.div>

        {/* card metadata list — syncs with 3D hover */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {CARDS.map((card) => (
            <button
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`border p-4 text-left transition-all duration-300 ${
                hoveredCard === card.id
                  ? 'border-vanta-glow/50 bg-vanta-surface glow-violet'
                  : 'border-vanta-border bg-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                {card.type === 'VIDEO' && <Play className="h-3 w-3 text-vanta-glow" />}
                <span className="text-[0.6rem] font-medium uppercase tracking-wide2 text-vanta-bone-faint">
                  {card.type}
                </span>
              </div>
              <p className="mt-2 text-sm text-vanta-bone">{card.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-vanta-bone-dim">{card.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
