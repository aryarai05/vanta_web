import { motion } from 'framer-motion';
import { TEAM, IMAGES } from '@/data/content';
import { useReducedMotion, useInView } from '@/hooks';
import { Circle } from 'lucide-react';

export default function CreativeTeam() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const reveal = reduced ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="team" className="relative bg-vanta-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <motion.div {...reveal} className="mb-12 max-w-2xl">
          <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            10 — Collaboration
          </span>
          <h2 className="mt-6 font-sans text-3xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-5xl">
            THE CREATIVE TEAM.
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          {...(reduced ? {} : { ...reveal, transition: { ...reveal.transition, delay: 0.1 } })}
          className="border border-vanta-border bg-vanta-bg-soft"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Project Status Panel */}
            <div className="border-b border-vanta-border p-8 lg:w-1/3 lg:border-b-0 lg:border-r">
              <h3 className="font-sans text-xl font-medium text-vanta-bone">NOVA / BRAND FILM</h3>
              
              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint mb-2">Project State</p>
                  <div className="flex items-center gap-2">
                    <Circle className="h-2 w-2 fill-vanta-glow text-vanta-glow" />
                    <span className="text-sm text-vanta-bone">In Review</span>
                  </div>
                </div>

                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint mb-3">Collaboration Stats</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-vanta-border pb-2">
                      <span className="text-sm text-vanta-bone-dim">Total Collaborators</span>
                      <span className="font-mono text-sm text-vanta-bone">{TEAM.length}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-vanta-border pb-2">
                      <span className="text-sm text-vanta-bone-dim">Items in Review</span>
                      <span className="font-mono text-sm text-vanta-glow">3</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-vanta-border pb-2">
                      <span className="text-sm text-vanta-bone-dim">Items Approved</span>
                      <span className="font-mono text-sm text-vanta-bone">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Grid */}
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {TEAM.map((member, i) => (
                <div key={member.name} className="group relative overflow-hidden border-b border-vanta-border p-6 sm:border-r xl:border-b-0 transition-colors hover:bg-vanta-surface">
                  <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-vanta-border group-hover:border-vanta-bone transition-colors">
                    <img src={member.avatar} alt={member.name} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" />
                  </div>
                  <h4 className="font-sans text-base font-medium text-vanta-bone">{member.name}</h4>
                  <p className="text-[0.65rem] uppercase tracking-widest2 text-vanta-bone-dim mt-1">{member.role}</p>
                </div>
              ))}
              
              {/* Invite Card */}
              <div className="flex items-center justify-center p-6 sm:border-r xl:border-b-0 border-b border-vanta-border bg-vanta-bg hover:bg-vanta-surface transition-colors cursor-pointer group">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-vanta-border group-hover:border-vanta-bone transition-colors">
                    <span className="text-xl text-vanta-bone-dim group-hover:text-vanta-bone">+</span>
                  </div>
                  <span className="text-[0.65rem] uppercase tracking-widest2 text-vanta-bone-dim group-hover:text-vanta-bone transition-colors">Invite Member</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
