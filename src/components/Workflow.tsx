import { motion } from 'framer-motion';
import { WORKFLOW_STEPS } from '@/data/content';
import { useReducedMotion } from '@/hooks';

export default function Workflow() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
        };

  return (
    <section id="workflow" className="relative bg-vanta-bg py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16">
          <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            05 — Workflow
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              {...reveal(i * 0.1)}
              className="group relative border-t border-vanta-border py-10 md:py-12 lg:pr-8"
            >
              {/* large number */}
              <span className="block font-sans text-5xl font-light text-vanta-bone-faint transition-colors duration-500 group-hover:text-vanta-glow md:text-6xl">
                {step.num}
              </span>

              <h3 className="mt-6 font-sans text-lg font-semibold tracking-wide2 text-vanta-bone">
                {step.title}
              </h3>

              <p className="mt-3 text-pretty text-sm leading-relaxed text-vanta-bone-dim">
                {step.copy}
              </p>

              {/* connecting line on desktop */}
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="pointer-events-none absolute top-0 hidden h-px w-full bg-gradient-to-r from-vanta-border to-transparent lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
