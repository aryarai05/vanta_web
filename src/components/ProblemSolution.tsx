import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion, useInView } from '@/hooks';

const SCATTERED_ITEMS = [
  { label: 'Screenshot.jpg', type: 'image', color: '#1e1e2e', rotate: -8, left: '5%', top: '8%' },
  { label: 'Message thread', type: 'message', color: '#1a1a26', rotate: 5, left: '55%', top: '5%' },
  { label: 'Reference_v3.jpg', type: 'image', color: '#1c1a14', rotate: 12, left: '30%', top: '15%' },
  { label: 'Brief_FINAL.pdf', type: 'pdf', color: '#1e0c0c', rotate: -4, left: '75%', top: '20%' },
  { label: 'Feedback note', type: 'note', color: '#1a1a0e', rotate: -10, left: '12%', top: '45%' },
  { label: 'Clip_raw_004.mp4', type: 'video', color: '#0c0c1a', rotate: 7, left: '65%', top: '48%' },
  { label: 'Version notes.txt', type: 'doc', color: '#141422', rotate: 3, left: '40%', top: '55%' },
  { label: 'Slack thread (47 msgs)', type: 'message', color: '#140e1a', rotate: -6, left: '20%', top: '70%' },
  { label: 'Assets_v9_FINAL.zip', type: 'doc', color: '#0e1a14', rotate: 9, left: '75%', top: '68%' },
];

const GRID_POSITIONS = SCATTERED_ITEMS.map((_, i) => ({
  left: `${(i % 3) * 33 + 2}%`,
  top: `${Math.floor(i / 3) * 33 + 2}%`,
  rotate: 0,
}));

export default function ProblemSolution() {
  const reduced = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [solved, setSolved] = useState(false);

  return (
    <section className="relative bg-vanta-bg-soft py-24 md:py-32" aria-label="Why VANTA exists">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header */}
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
            07 — Why VANTA
          </span>
          <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tighter text-vanta-bone md:text-5xl">
            CREATIVE WORK<br />IS MESSY.
          </h2>
        </motion.div>

        {/* Phase label */}
        <div className="mt-10 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={solved ? 'solved' : 'problem'}
              className="text-base text-vanta-bone-dim md:text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {solved
                ? 'VANTA KEEPS THE VISION TOGETHER.'
                : 'EVERYTHING. EVERYWHERE. DISCONNECTED.'}
            </motion.p>
          </AnimatePresence>
          <button
            onClick={() => setSolved((s) => !s)}
            className="shrink-0 border border-vanta-border px-5 py-2.5 text-xs uppercase tracking-widest2 text-vanta-bone-dim transition-all hover:border-vanta-bone hover:text-vanta-bone"
          >
            {solved ? 'SEE THE PROBLEM' : 'SEE THE SOLUTION'}
          </button>
        </div>

        {/* Canvas */}
        <div className="relative mt-8 h-[420px] overflow-hidden border border-vanta-border bg-vanta-bg md:h-[520px]">
          {SCATTERED_ITEMS.map((item, i) => {
            const target = solved ? GRID_POSITIONS[i] : { left: item.left, top: item.top, rotate: item.rotate };
            return (
              <motion.div
                key={item.label}
                className="absolute border border-vanta-border p-2.5 shadow-lg"
                style={{ background: item.color, minWidth: 120 }}
                animate={{
                  left: target.left,
                  top: target.top,
                  rotate: reduced ? 0 : target.rotate,
                  opacity: 1,
                }}
                initial={{ opacity: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.7,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-[0.55rem] uppercase tracking-widest text-vanta-bone-faint">
                  {item.type}
                </p>
                <p className="mt-0.5 truncate font-mono text-[0.6rem] text-vanta-bone-dim">
                  {item.label}
                </p>
              </motion.div>
            );
          })}

          {/* VANTA solution overlay */}
          <AnimatePresence>
            {solved && (
              <motion.div
                className="absolute inset-0 z-10 flex items-center justify-center bg-vanta-bg/90 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <div className="text-center">
                  <p className="text-[0.6rem] uppercase tracking-widest3 text-vanta-bone-faint">
                    VANTA Workspace
                  </p>
                  <p className="mt-4 font-sans text-4xl font-semibold tracking-tighter text-vanta-bone md:text-6xl">
                    ONE PLACE.
                  </p>
                  <p className="mt-2 text-sm text-vanta-bone-dim">
                    All your references, assets, reviews and decisions — in a single visual workspace.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
