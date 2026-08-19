import { motion } from 'framer-motion';
import { useReducedMotion, useInView } from '@/hooks';

type FinalCTAProps = {
  onEnter?: () => void;
};

export default function FinalCTA({ onEnter }: FinalCTAProps) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  const fade = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
        };

  const handleEnter = () => {
    onEnter?.();
    document.querySelector('#workspace')?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-24 text-center"
      aria-label="Final call to action"
    >
      <div ref={ref}>
        {/* Small upper label */}
        <motion.p
          {...fade(0.3)}
          className="text-[0.65rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint"
        >
          YOUR NEXT FRAME STARTS HERE.
        </motion.p>

        {/* Main headline */}
        <motion.h2
          {...fade(0.5)}
          className="mt-8 font-sans font-semibold tracking-tighter text-vanta-bone"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1.05 }}
        >
          MAKE THE IDEA
          <br />
          IMPOSSIBLE
          <br />
          TO LOSE.
        </motion.h2>

        {/* CTA button */}
        <motion.div {...fade(0.8)} className="mt-12">
          <button
            onClick={handleEnter}
            className="border border-vanta-bone/50 px-10 py-4 text-sm font-medium tracking-wide2 text-vanta-bone transition-all duration-300 hover:bg-vanta-bone hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-vanta-glow"
          >
            ENTER VANTA
          </button>
        </motion.div>

        {/* Bottom credit */}
        <motion.p
          {...fade(1.2)}
          className="mt-16 text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint"
        >
          A creative collaboration platform.
        </motion.p>
      </div>
    </section>
  );
}
