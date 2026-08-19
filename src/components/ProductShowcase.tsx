import { motion } from 'framer-motion';
import {
  FolderOpen,
  LayoutGrid,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Play,
  Circle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { IMAGES, SIDEBAR_ITEMS, CREATIVE_NOTES } from '@/data/content';
import { useReducedMotion } from '@/hooks';

const ICONS = {
  FolderOpen,
  LayoutGrid,
  Image: ImageIcon,
  MessageSquare,
  Users,
} as const;

export default function ProductShowcase() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay },
        };

  return (
    <section id="product" className="relative bg-vanta-bg py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* heading */}
        <div className="max-w-3xl">
          <motion.p
            {...reveal(0)}
            className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint"
          >
            02 — The Workspace
          </motion.p>
          <motion.h2
            {...reveal(0.1)}
            className="mt-6 font-sans text-3xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-5xl"
          >
            THE WORK IS NEVER
            <br />
            JUST ONE FILE.
          </motion.h2>
          <motion.p
            {...reveal(0.2)}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-vanta-bone-dim md:text-lg"
          >
            Ideas evolve through references, frames, conversations and decisions.
            VANTA keeps the entire creative process connected.
          </motion.p>
        </div>

        {/* product UI mockup */}
        <motion.div
          {...reveal(0.3)}
          className="mt-16 overflow-hidden border border-vanta-border bg-vanta-bg-soft shadow-2xl"
        >
          {/* window chrome */}
          <div className="flex items-center gap-2 border-b border-vanta-border bg-vanta-surface px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-vanta-graphite" />
              <div className="h-2.5 w-2.5 rounded-full bg-vanta-graphite" />
              <div className="h-2.5 w-2.5 rounded-full bg-vanta-graphite" />
            </div>
            <div className="ml-4 flex items-center gap-2 text-xs text-vanta-bone-faint">
              <span className="font-mono">vanta.app</span>
              <span className="text-vanta-bone-faint">/</span>
              <span className="text-vanta-bone-dim">nova / campaign-film</span>
            </div>
          </div>

          {/* main layout */}
          <div className="flex flex-col lg:flex-row">
            {/* sidebar */}
            <aside className="flex lg:w-56 lg:flex-col border-b border-vanta-border lg:border-b-0 lg:border-r">
              <div className="hidden lg:block px-5 pt-5 pb-3">
                <span className="text-[0.6rem] font-medium uppercase tracking-widest2 text-vanta-bone-faint">
                  Workspace
                </span>
              </div>
              <div className="flex flex-row gap-1 overflow-x-auto px-3 py-3 scrollbar-hide lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-3 lg:py-2">
                {SIDEBAR_ITEMS.map((item, i) => {
                  const Icon = ICONS[item.icon as keyof typeof ICONS];
                  return (
                    <button
                      key={item.label}
                      className={`flex shrink-0 items-center gap-3 px-3 py-2 text-sm transition-colors lg:w-full ${
                        i === 0
                          ? 'text-vanta-bone'
                          : 'text-vanta-bone-dim hover:text-vanta-bone'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="whitespace-nowrap lg:whitespace-normal">{item.label}</span>
                      {i === 0 && <span className="ml-auto hidden h-1 w-1 rounded-full bg-vanta-glow lg:block" />}
                    </button>
                  );
                })}
              </div>
              <div className="hidden lg:mt-auto lg:border-t lg:border-vanta-border lg:p-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-vanta-graphite" />
                  <div>
                    <div className="text-xs text-vanta-bone">Mara K.</div>
                    <div className="text-[0.65rem] text-vanta-bone-faint">Art Director</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* main board */}
            <div className="flex-1 bg-vanta-bg-soft p-4 md:p-6">
              {/* project header */}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-sans text-lg font-medium text-vanta-bone">
                    NOVA / Campaign Film
                  </h3>
                  <p className="mt-0.5 text-xs text-vanta-bone-faint">
                    24 assets · 4 collaborators · Updated 2h ago
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 border border-vanta-border px-2.5 py-1 text-[0.65rem] uppercase tracking-wide2 text-vanta-bone-dim">
                    <Circle className="h-2 w-2 fill-vanta-glow text-vanta-glow" />
                    In Review
                  </span>
                </div>
              </div>

              {/* board grid */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {/* large visual board */}
                <div className="col-span-2 row-span-2 group relative overflow-hidden border border-vanta-border">
                  <img
                    src={IMAGES.filmStill1}
                    alt="Campaign film reference"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-vanta-bg/90 to-transparent p-3">
                    <div className="flex items-center gap-2">
                      <Play className="h-3 w-3 text-vanta-bone" />
                      <span className="text-xs text-vanta-bone">Opening Sequence — v04</span>
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 bg-vanta-bg/70 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-dim backdrop-blur-sm">
                    Video
                  </span>
                </div>

                {/* photography ref */}
                <div className="group relative col-span-2 overflow-hidden border border-vanta-border">
                  <img
                    src={IMAGES.portrait1}
                    alt="Photography reference"
                    loading="lazy"
                    className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-40"
                  />
                  <span className="absolute top-2 left-2 bg-vanta-bg/70 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-dim backdrop-blur-sm">
                    Photo Ref
                  </span>
                </div>

                {/* design ref */}
                <div className="group relative overflow-hidden border border-vanta-border">
                  <img
                    src={IMAGES.architecture1}
                    alt="Design reference"
                    loading="lazy"
                    className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-40"
                  />
                </div>

                {/* color palette */}
                <div className="border border-vanta-border p-3">
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-faint">
                    Palette
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {['#1a1a24', '#3d3528', '#8a7bd6', '#c9c7c1', '#ece7dc'].map((c) => (
                      <div
                        key={c}
                        className="h-6 w-6 border border-vanta-border"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>

                {/* notes card */}
                <div className="col-span-2 border border-vanta-border bg-vanta-surface p-3 md:col-span-2">
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-faint">
                    Project Notes
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-vanta-bone-dim">
                    Film opens on a single source of light. Build tension through
                    negative space before the first cut. Keep the grade warm but
                    restrained.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[0.65rem] text-vanta-bone-faint">
                    <CheckCircle2 className="h-3 w-3 text-vanta-glow" />
                    3 of 5 decisions logged
                  </div>
                </div>
              </div>
            </div>

            {/* right panel — creative notes */}
            <aside className="border-t border-vanta-border bg-vanta-surface p-4 lg:w-64 lg:border-l lg:border-t-0">
              <div className="mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-vanta-bone-dim" />
                <span className="text-sm font-medium text-vanta-bone">Creative Notes</span>
              </div>
              <div className="space-y-4">
                {CREATIVE_NOTES.map((note, i) => (
                  <div key={i} className="border-l-2 border-vanta-glow/40 pl-3">
                    <p className="text-xs leading-relaxed text-vanta-bone-dim">{note}</p>
                    <div className="mt-2 flex items-center gap-2 text-[0.65rem] text-vanta-bone-faint">
                      <Clock className="h-3 w-3" />
                      {i + 1}h ago
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-vanta-border pt-4">
                <div className="flex -space-x-2">
                  {['#2a2a33', '#3d3528', '#1a1a24'].map((c, i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full border-2 border-vanta-surface"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-vanta-surface bg-vanta-graphite text-[0.6rem] text-vanta-bone">
                    +1
                  </div>
                </div>
                <p className="mt-2 text-[0.65rem] text-vanta-bone-faint">4 collaborators</p>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
