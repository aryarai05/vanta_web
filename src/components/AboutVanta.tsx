import { motion } from 'framer-motion';
import { useReducedMotion, useInView } from '@/hooks';

const NARRATIVE_LINES = [
  'Creative work rarely begins with a finished file.',
  '',
  'It begins with a reference.',
  'A frame.',
  'A feeling.',
  'A conversation.',
  'A decision.',
  '',
  'VANTA brings those pieces together so the people making the work can stay focused on the work itself.',
];

const ELEMENTS = [
  { label: 'CAMERA', x: -220, y: -80 },
  { label: 'PHOTO', x: 200, y: -100 },
  { label: 'TYPE', x: -40, y: -160 },
  { label: 'VIDEO', x: -200, y: 60 },
  { label: 'NOTE', x: 220, y: 40 },
  { label: 'COLOR', x: -150, y: 140 },
  { label: 'FRAME', x: 160, y: 130 },
];

export default function AboutVanta() {
  const reduced = useReducedMotion();
  const [quoteRef, quoteInView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [linesRef, linesInView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [convergenceRef, convergenceInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [ctaRef, ctaInView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section id="about" className="relative bg-vanta-bg" aria-label="What is VANTA">
      {/* Part 1 — Quote */}
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <div ref={quoteRef}>
          <span className="text-[0.65rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            06 — About
          </span>
          <motion.h2
            className="mt-6 font-sans text-2xl font-semibold tracking-tighter text-vanta-bone md:text-4xl"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  animate: quoteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
                })}
          >
            WHAT IS VANTA?
          </motion.h2>

          <motion.blockquote
            className="mt-10 max-w-3xl font-sans text-2xl font-light italic leading-snug text-vanta-bone md:text-4xl"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 30 },
                  animate: quoteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
                  transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
                })}
          >
            "Vanta is the space between an idea and the final frame."
          </motion.blockquote>
        </div>
      </div>

      {/* Part 2 — Sequential narrative lines */}
      <div className="border-t border-vanta-border bg-vanta-bg-soft py-24 md:py-32">
        <div className="mx-auto max-w-[900px] px-6 md:px-12" ref={linesRef}>
          {NARRATIVE_LINES.map((line, i) =>
            line === '' ? (
              <div key={i} className="h-5" />
            ) : (
              <motion.p
                key={i}
                className={`leading-relaxed ${
                  line.startsWith('VANTA')
                    ? 'text-lg font-medium text-vanta-bone md:text-xl'
                    : i <= 1
                    ? 'text-base text-vanta-bone-dim md:text-lg'
                    : 'text-base font-light text-vanta-bone-dim'
                }`}
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, x: -20 },
                      animate: linesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
                    })}
              >
                {line}
              </motion.p>
            )
          )}
        </div>
      </div>

      {/* Part 3 — Convergence visual */}
      <div className="py-24 md:py-32" ref={convergenceRef}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="relative flex items-center justify-center" style={{ height: 380 }}>
            {/* Floating scattered elements converge toward center */}
            {ELEMENTS.map((el, i) => (
              <motion.div
                key={el.label}
                className="absolute border border-vanta-border bg-vanta-surface px-3 py-1.5 text-xs uppercase tracking-widest text-vanta-bone-dim"
                {...(reduced
                  ? {}
                  : {
                      initial: { x: el.x, y: el.y, opacity: 0 },
                      animate: convergenceInView
                        ? { x: 0, y: 0, opacity: 0.6 }
                        : { x: el.x, y: el.y, opacity: 0 },
                      transition: {
                        duration: 1.4,
                        ease: [0.16, 1, 0.3, 1],
                        delay: i * 0.08,
                      },
                    })}
              >
                {el.label}
              </motion.div>
            ))}

            {/* Center: VANTA wordmark */}
            <motion.div
              className="relative z-10 text-center"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.8 },
                    animate: convergenceInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
                    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.7 },
                  })}
            >
              <span className="block font-sans text-6xl font-semibold tracking-tighter text-vanta-bone md:text-8xl">
                VANTA
              </span>
              <span className="mt-2 block text-[0.6rem] uppercase tracking-widest3 text-vanta-bone-faint">
                One creative workspace
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Part 4 — Final statement */}
      <div className="border-t border-vanta-border py-20 text-center" ref={ctaRef}>
        <motion.p
          className="font-sans text-3xl font-semibold tracking-tighter text-vanta-bone md:text-5xl"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                animate: ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              })}
        >
          MANY PIECES.
          <br />
          ONE VISION.
        </motion.p>
      </div>
    </section>
  );
}
