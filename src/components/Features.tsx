import { motion } from 'framer-motion';
import { Play, MessageCircle, ArrowRight, Palette, Film } from 'lucide-react';
import { IMAGES } from '@/data/content';
import { useReducedMotion } from '@/hooks';

type FeatureProps = {
  index: string;
  title: string;
  description: string;
  children: React.ReactNode;
  reverse?: boolean;
};

function FeatureSection({ index, title, description, children, reverse }: FeatureProps) {
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
    <div className="border-t border-vanta-border-soft py-20 md:py-32">
      <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 ${reverse ? 'lg:grid-flow-dense' : ''}`}>
        {/* text */}
        <motion.div
          {...reveal(0)}
          className={reverse ? 'lg:col-start-2 lg:row-start-1' : ''}
        >
          <span className="font-mono text-xs text-vanta-glow">{index}</span>
          <h3 className="mt-5 font-sans text-2xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-4xl">
            {title}
          </h3>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-vanta-bone-dim">
            {description}
          </p>
        </motion.div>

        {/* visual */}
        <motion.div {...reveal(0.15)} className={reverse ? 'lg:col-start-1 lg:row-start-1' : ''}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function Feature01Visual() {
  const images = [IMAGES.portrait5, IMAGES.architecture1, IMAGES.portrait2, IMAGES.print1];
  const labels = ['Photo', 'Color', 'Photo', 'Type']

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden border border-vanta-border ${
              i === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
            }`}
          >
            <img
              src={src}
              alt={`Moodboard reference ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute top-2 left-2 bg-vanta-bg/70 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-dim backdrop-blur-sm">
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 border border-vanta-border bg-vanta-surface p-3">
        <Palette className="h-4 w-4 text-vanta-bone-dim" />
        <span className="text-xs text-vanta-bone-dim">Moodboard — 18 references</span>
        <ArrowRight className="ml-auto h-3.5 w-3.5 text-vanta-bone-faint" />
      </div>
    </div>
  )
}

function Feature02Visual() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden border border-vanta-border">
        <img
          src={IMAGES.filmStill2}
          alt="Video review frame"
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
        {/* play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-vanta-bg/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-vanta-bone/40 bg-vanta-bg/40 backdrop-blur-sm transition-transform hover:scale-110">
            <Play className="h-5 w-5 text-vanta-bone" />
          </div>
        </div>
        {/* timeline */}
        <div className="absolute bottom-0 left-0 right-0 bg-vanta-bg/80 p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 bg-vanta-graphite">
              <div className="h-full w-1/3 bg-vanta-glow" />
            </div>
            <span className="font-mono text-[0.65rem] text-vanta-bone-faint">00:42 / 02:18</span>
          </div>
        </div>
      </div>
      {/* comments pinned to frame */}
      <div className="mt-3 space-y-2">
        {[
          { text: 'The transition here feels too fast.', time: '00:42' },
          { text: 'Can we hold this frame two beats longer?', time: '00:42' },
        ].map((c, i) => (
          <div key={i} className="flex items-start gap-3 border border-vanta-border bg-vanta-surface p-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-vanta-graphite">
              <MessageCircle className="h-3.5 w-3.5 text-vanta-bone-dim" />
            </div>
            <div>
              <p className="text-xs leading-relaxed text-vanta-bone-dim">{c.text}</p>
              <span className="mt-1 block font-mono text-[0.6rem] text-vanta-glow">@ {c.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Feature03Visual() {
  const stages = [
    { label: 'First Reference', status: 'done' },
    { label: 'Moodboard Lock', status: 'done' },
    { label: 'Storyboard v2', status: 'active' },
    { label: 'Principal Shoot', status: 'pending' },
    { label: 'Final Grade', status: 'pending' },
  ]

  return (
    <div className="border border-vanta-border bg-vanta-bg-soft p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="h-4 w-4 text-vanta-bone-dim" />
          <span className="text-xs text-vanta-bone-dim">Production Timeline</span>
        </div>
        <span className="font-mono text-[0.65rem] text-vanta-bone-faint">Stage 3 / 5</span>
      </div>
      <div className="space-y-1">
        {stages.map((s, i) => (
          <div key={i} className="flex items-center gap-4 py-2">
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.6rem] ${
                s.status === 'done'
                  ? 'border-vanta-glow bg-vanta-glow/20 text-vanta-glow'
                  : s.status === 'active'
                  ? 'border-vanta-bone bg-vanta-bone text-vanta-bg'
                  : 'border-vanta-border text-vanta-bone-faint'
              }`}
            >
              {s.status === 'done' ? '✓' : i + 1}
            </div>
            <span
              className={`text-sm ${
                s.status === 'pending' ? 'text-vanta-bone-faint' : 'text-vanta-bone-dim'
              }`}
            >
              {s.label}
            </span>
            {s.status === 'active' && (
              <span className="ml-auto text-[0.6rem] uppercase tracking-wide2 text-vanta-glow">
                In Progress
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 h-1 bg-vanta-graphite">
        <div className="h-full w-2/5 bg-gradient-to-r from-vanta-glow to-vanta-chrome" />
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative bg-vanta-bg py-20 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-12">
          <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            03 — Core Features
          </span>
        </div>

        <FeatureSection
          index="FEATURE 01"
          title="Build the visual language."
          description="Collect the references that shape an idea and keep the creative direction visible to everyone."
        >
          <Feature01Visual />
        </FeatureSection>

        <FeatureSection
          index="FEATURE 02"
          title="Review without losing the thread."
          description="Leave feedback directly where the decision happens, without burying the conversation in another tool."
          reverse
        >
          <Feature02Visual />
        </FeatureSection>

        <FeatureSection
          index="FEATURE 03"
          title="Turn direction into momentum."
          description="Keep the creative direction connected to the work as an idea moves from first reference to final frame."
        >
          <Feature03Visual />
        </FeatureSection>
      </div>
    </section>
  )
}
