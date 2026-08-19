import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion, useInView } from '@/hooks';

const METADATA = [
  { label: 'LIGHT', value: 'Golden Hour' },
  { label: 'LENS', value: '50mm f/1.4' },
  { label: 'MOOD', value: 'Intimate / Warm' },
  { label: 'COLOR', value: 'Warm / Muted' },
  { label: 'REFERENCE', value: '02 / 12' },
];

export default function FrameStory() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [headingRef, headingInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [metaRef, metaInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-30, 30]);

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
          transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const, delay },
        };

  return (
    <section
      ref={sectionRef}
      id="frame-story"
      className="relative bg-vanta-bg py-24 md:min-h-screen md:py-32"
      aria-label="The story behind a frame"
    >
      {/* Section label */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div ref={headingRef} {...fadeUp(0)}>
          <span className="text-[0.65rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            04 — The Frame
          </span>
          <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tighter text-vanta-bone md:text-5xl">
            EVERY FRAME
            <br />
            HAS A STORY.
          </h2>
        </motion.div>
      </div>

      {/* Main content: image + metadata */}
      <div className="mx-auto mt-16 max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          {/* Left — Cinematic image with parallax */}
          <motion.div
            className="relative w-full overflow-hidden md:w-3/5"
            {...(reduced ? {} : { initial: { opacity: 0 }, animate: headingInView ? { opacity: 1 } : { opacity: 0 }, transition: { duration: 1.1, delay: 0.2 } })}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.img
                src="https://picsum.photos/id/1080/1200/800"
                alt="Cinematic frame — golden hour"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ y: imgY }}
                loading="lazy"
              />
              {/* Subtle vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vanta-bg/60 via-transparent to-transparent" />
            </div>

            {/* Frame timecode */}
            <div className="absolute bottom-4 left-4 font-mono text-[0.6rem] text-vanta-bone-faint">
              00:02:14:08 · NOVA BRAND FILM · FRAME 3247
            </div>
          </motion.div>

          {/* Right — Metadata + narrative */}
          <div className="flex flex-col gap-8 md:w-2/5" ref={metaRef}>
            {/* Metadata cards */}
            <div className="grid grid-cols-2 gap-3">
              {METADATA.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="border border-vanta-border bg-vanta-surface p-3"
                  {...(reduced
                    ? {}
                    : {
                        initial: { opacity: 0, x: 24 },
                        animate: metaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 },
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
                      })}
                >
                  <span className="block text-[0.55rem] uppercase tracking-widest3 text-vanta-bone-faint">
                    {m.label}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-vanta-bone">{m.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Narrative panel */}
            <motion.div
              className="border-l-2 border-vanta-border pl-5"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, x: 24 },
                    animate: metaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 },
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 },
                  })}
            >
              <p className="text-xs uppercase tracking-widest2 text-vanta-bone-faint">Why this frame?</p>
              <p className="mt-1 font-mono text-[0.65rem] text-vanta-bone-dim">— 00:02:14:08</p>

              <blockquote className="mt-4 text-base font-light italic text-vanta-bone">
                "Because the light feels human."
              </blockquote>

              <p className="mt-4 text-sm leading-relaxed text-vanta-bone-dim">
                The director chose golden hour specifically. The slight haze creates intimacy. This frame
                communicates warmth before a single word is spoken.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-vanta-bone-dim">
                Held two frames longer in the final edit. Every collaborator saw this reference before the
                shoot began.
              </p>

              <div className="mt-6 border-t border-vanta-border pt-4">
                <p className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint">
                  CREATIVE DIRECTION · NOVA BRAND FILM
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
