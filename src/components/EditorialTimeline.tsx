import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion, useInView } from '@/hooks';

const STAGES = [
  {
    id: '01',
    name: 'IDEA',
    desc: 'The creative brief. A feeling. A reference that inspires.',
    img: 'https://picsum.photos/id/101/800/600',
  },
  {
    id: '02',
    name: 'REFERENCES',
    desc: 'Building the visual language before a single frame is shot.',
    img: 'https://picsum.photos/id/1043/800/600',
  },
  {
    id: '03',
    name: 'SHOOT',
    desc: 'The camera rolls. Every frame is a decision.',
    img: 'https://picsum.photos/id/1054/800/600',
  },
  {
    id: '04',
    name: 'EDIT',
    desc: 'The story takes shape. Cut by cut. Frame by frame.',
    img: 'https://picsum.photos/id/338/800/600',
  },
  {
    id: '05',
    name: 'REVIEW',
    desc: 'Collaboration in context. Comments on frames, not emails.',
    img: 'https://picsum.photos/id/26/800/600',
  },
  {
    id: '06',
    name: 'FINAL',
    desc: 'Delivered. The idea made visible.',
    img: 'https://picsum.photos/id/167/800/600',
  },
];

export default function EditorialTimeline() {
  const reduced = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section className="relative overflow-hidden bg-vanta-bg py-24 md:py-32" aria-label="Editorial timeline">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12" ref={sectionRef}>
        <motion.div {...reveal}>
          <span className="text-[0.65rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            10 — The Journey
          </span>
          <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tighter text-vanta-bone md:text-5xl">
            FROM IDEA TO FRAME.
          </h2>
        </motion.div>

        {/* Active stage preview */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16"
          {...(reduced ? {} : { initial: { opacity: 0 }, animate: inView ? { opacity: 1 } : { opacity: 0 }, transition: { delay: 0.3, duration: 0.9 } })}
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden border border-vanta-border">
            <motion.img
              key={active}
              src={STAGES[active].img}
              alt={STAGES[active].name}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[0.6rem] uppercase tracking-widest text-vanta-bone/60">
              {STAGES[active].id} / {STAGES[active].name}
            </div>
          </div>

          {/* Stage description */}
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-vanta-bone-faint">
              {STAGES[active].id} of 06
            </p>
            <motion.h3
              key={`title-${active}`}
              className="mt-3 font-sans text-2xl font-semibold tracking-tighter text-vanta-bone md:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {STAGES[active].name}
            </motion.h3>
            <motion.p
              key={`desc-${active}`}
              className="mt-4 max-w-sm text-base leading-relaxed text-vanta-bone-dim"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              {STAGES[active].desc}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Film strip timeline (horizontal scroll) */}
      <div className="mt-16 px-6 md:px-12">
        {/* Sprocket holes top */}
        <div className="flex w-full gap-1 overflow-hidden pb-1" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="h-2 w-4 shrink-0 rounded-[2px] bg-vanta-graphite/40" />
          ))}
        </div>

        {/* Stage cards */}
        <div
          ref={scrollRef}
          className="flex gap-0 overflow-x-auto scrollbar-hide snap-x snap-mandatory border-t border-b border-vanta-border/30"
        >
          {STAGES.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => setActive(i)}
              className={`group snap-center shrink-0 flex-1 min-w-[160px] border-r border-vanta-border/20 py-6 px-5 text-left transition-all duration-300 ${
                active === i ? 'bg-vanta-surface' : 'bg-vanta-bg hover:bg-vanta-bg-soft'
              }`}
              aria-pressed={active === i}
            >
              <p className={`text-[0.55rem] uppercase tracking-widest ${active === i ? 'text-vanta-bone-faint' : 'text-vanta-bone-faint/50'}`}>
                {stage.id}
              </p>
              <p className={`mt-1 font-sans text-sm font-semibold tracking-wide transition-colors ${active === i ? 'text-vanta-bone' : 'text-vanta-bone-dim group-hover:text-vanta-bone'}`}>
                {stage.name}
              </p>
              {/* Active indicator bar */}
              {active === i && <div className="mt-3 h-px w-full bg-vanta-bone" />}
            </button>
          ))}
        </div>

        {/* Sprocket holes bottom */}
        <div className="flex w-full gap-1 overflow-hidden pt-1" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="h-2 w-4 shrink-0 rounded-[2px] bg-vanta-graphite/40" />
          ))}
        </div>
      </div>
    </section>
  );
}
