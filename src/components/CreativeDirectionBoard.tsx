import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion, useInView } from '@/hooks';

const DIRECTION_CARDS = [
  {
    id: 'color',
    label: 'COLOR',
    value: 'Warm neutrals',
    visual: (
      <div className="flex gap-2">
        {['#c4a882', '#8c7355', '#d4c4a8', '#6b5a42', '#e8dcc8'].map((c) => (
          <div key={c} className="h-8 w-8 rounded-sm" style={{ background: c }} />
        ))}
      </div>
    ),
  },
  {
    id: 'light',
    label: 'LIGHT',
    value: 'Soft / natural',
    visual: (
      <div
        className="h-8 w-full rounded-sm"
        style={{ background: 'linear-gradient(90deg, #0d0c0a 0%, #7a5c32 50%, #e8c882 100%)' }}
      />
    ),
  },
  {
    id: 'texture',
    label: 'TEXTURE',
    value: 'Film grain',
    visual: (
      <div className="grain relative h-8 w-full rounded-sm bg-vanta-graphite" />
    ),
  },
  {
    id: 'mood',
    label: 'MOOD',
    value: 'Human / cinematic',
    visual: (
      <div className="h-12 w-full overflow-hidden rounded-sm">
        <img
          src="https://picsum.photos/id/1027/300/100"
          alt="Mood reference"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    id: 'reference',
    label: 'REFERENCE',
    value: 'Golden hour',
    visual: (
      <div className="h-12 w-full overflow-hidden rounded-sm">
        <img
          src="https://picsum.photos/id/1016/300/100"
          alt="Reference image"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    ),
  },
];

function SaveIndicator({ show }: { show: boolean }) {
  return (
    <motion.span
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="text-[0.55rem] uppercase tracking-widest text-green-500/80"
    >
      SAVED ✓
    </motion.span>
  );
}

function DirectionCard({
  card,
  delay,
  inView,
}: {
  card: (typeof DIRECTION_CARDS)[0];
  delay: number;
  inView: boolean;
}) {
  const reduced = useReducedMotion();
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  let saveTimer: ReturnType<typeof setTimeout>;

  const handleBlur = () => {
    if (note.trim()) {
      setSaved(true);
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <motion.div
      className="border border-vanta-border bg-vanta-surface p-5"
      {...(reduced
        ? {}
        : {
            initial: { opacity: 0, y: 24 },
            animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
          })}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[0.55rem] uppercase tracking-widest3 text-vanta-bone-faint">
          {card.label}
        </span>
        <SaveIndicator show={saved} />
      </div>
      <p className="mb-4 text-sm font-medium text-vanta-bone">{card.value}</p>
      {card.visual}
      <textarea
        value={note}
        onChange={(e) => { setNote(e.target.value); setSaved(false); }}
        onBlur={handleBlur}
        placeholder="Add a note..."
        rows={2}
        className="mt-4 w-full resize-none bg-transparent text-xs text-vanta-bone-dim placeholder:text-vanta-bone-faint/40 focus:outline-none"
        aria-label={`Note for ${card.label}`}
      />
    </motion.div>
  );
}

export default function CreativeDirectionBoard() {
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const reduced = useReducedMotion();

  return (
    <section
      id="direction"
      className="relative bg-vanta-bg py-24 md:py-32"
      aria-label="Creative direction board"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          ref={sectionRef}
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 30 },
                animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
              })}
        >
          <span className="text-[0.65rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            08 — Direction
          </span>
          <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tighter text-vanta-bone md:text-5xl">
            KEEP THE VISION<br />VISIBLE.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-vanta-bone-dim">
            Creative direction lives here — not in a Google Doc. The whole team sees the same references
            and notes in real time.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIRECTION_CARDS.map((card, i) => (
            <DirectionCard key={card.id} card={card} delay={i * 0.08} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
