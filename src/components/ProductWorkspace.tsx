import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderOpen, LayoutGrid, Image as ImageIcon, MessageSquare, Clock, Users,
  Play, Circle, CheckCircle2, FileText,
} from 'lucide-react';
import { IMAGES, SIDEBAR_ITEMS, WORKSPACE_TABS, CREATIVE_NOTES } from '@/data/content';
import { useReducedMotion } from '@/hooks';

const ICONS = { FolderOpen, LayoutGrid, Image: ImageIcon, MessageSquare, Clock, Users };

export default function ProductWorkspace() {
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [activeSidebar, setActiveSidebar] = useState(0);

  const reveal = reduced ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="workspace" className="relative bg-vanta-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <motion.div {...reveal} className="mb-12 max-w-2xl">
          <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            02 — The Workspace
          </span>
          <h2 className="mt-6 font-sans text-3xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-5xl">
            THE REAL VANTA INTERFACE.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-vanta-bone-dim">
            Not a screenshot. This is the actual application — boards, assets, review and direction, connected.
          </p>
        </motion.div>

        <motion.div
          {...(reduced ? {} : { ...reveal, transition: { ...reveal.transition, delay: 0.15 } })}
          className="overflow-hidden border border-vanta-border bg-vanta-bg-soft shadow-2xl"
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
              <span>/</span>
              <span className="text-vanta-bone-dim">nova / brand-film</span>
            </div>
          </div>

          {/* main layout */}
          <div className="flex flex-col lg:flex-row">
            {/* sidebar */}
            <aside className="border-b border-vanta-border lg:w-56 lg:border-b-0 lg:border-r lg:flex-col">
              <div className="hidden px-5 pt-5 pb-2 lg:block">
                <span className="font-sans text-sm font-semibold tracking-tight2 text-vanta-bone">VANTA</span>
              </div>
              <div className="hidden px-5 pb-3 lg:block">
                <span className="text-[0.6rem] font-medium uppercase tracking-widest2 text-vanta-bone-faint">WORKSPACE</span>
              </div>
              <div className="flex flex-row gap-1 overflow-x-auto px-3 py-3 scrollbar-hide lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-3 lg:py-1">
                {SIDEBAR_ITEMS.map((item, i) => {
                  const Icon = ICONS[item.icon as keyof typeof ICONS];
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveSidebar(i)}
                      className={`flex shrink-0 items-center gap-3 px-3 py-2 text-sm transition-colors lg:w-full ${
                        activeSidebar === i ? 'text-vanta-bone' : 'text-vanta-bone-dim hover:text-vanta-bone'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="whitespace-nowrap lg:whitespace-normal">{item.label}</span>
                      {activeSidebar === i && <span className="ml-auto hidden h-1 w-1 rounded-full bg-vanta-glow lg:block" />}
                    </button>
                  );
                })}
              </div>
              <div className="hidden lg:mt-auto lg:border-t lg:border-vanta-border lg:p-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-vanta-graphite" />
                  <div>
                    <div className="text-xs text-vanta-bone">Mara K.</div>
                    <div className="text-[0.65rem] text-vanta-bone-faint">Creative Director</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* main area */}
            <div className="flex-1 bg-vanta-bg-soft">
              {/* project header + tabs */}
              <div className="border-b border-vanta-border px-4 py-3 md:px-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-sans text-base font-medium text-vanta-bone md:text-lg">NOVA — BRAND FILM</h3>
                    <p className="mt-0.5 text-xs text-vanta-bone-faint">24 assets · 5 collaborators · Updated 2h ago</p>
                  </div>
                  <span className="flex items-center gap-1.5 border border-vanta-border px-2.5 py-1 text-[0.65rem] uppercase tracking-wide2 text-vanta-bone-dim">
                    <Circle className="h-2 w-2 fill-vanta-glow text-vanta-glow" />
                    In Review
                  </span>
                </div>
                {/* tabs */}
                <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                  {WORKSPACE_TABS.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(i)}
                      className={`shrink-0 border-b-2 px-3 py-2 text-xs font-medium tracking-wide2 transition-colors md:text-sm ${
                        activeTab === i
                          ? 'border-vanta-glow text-vanta-bone'
                          : 'border-transparent text-vanta-bone-faint hover:text-vanta-bone-dim'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* tab content */}
              <div className="p-4 md:p-6">
                {activeTab === 0 && <OverviewTab />}
                {activeTab === 1 && <DirectionTab />}
                {activeTab === 2 && <AssetsTab />}
                {activeTab === 3 && <ReviewTab />}
                {activeTab === 4 && <ProductionTab />}
              </div>
            </div>

            {/* right panel */}
            <aside className="border-t border-vanta-border bg-vanta-surface p-4 lg:w-64 lg:border-l lg:border-t-0">
              <span className="text-[0.6rem] font-medium uppercase tracking-widest2 text-vanta-bone-faint">
                CREATIVE DIRECTION
              </span>
              <p className="mt-3 font-serif text-sm italic leading-relaxed text-vanta-bone">
                Late afternoon.
                <br />
                Soft contrast.
                <br />
                Human.
                <br />
                Cinematic.
              </p>
              <div className="mt-6 space-y-4">
                {CREATIVE_NOTES.slice(0, 3).map((note, i) => (
                  <div key={i} className="border-l-2 border-vanta-glow/40 pl-3">
                    <p className="text-xs leading-relaxed text-vanta-bone-dim">{note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-vanta-border pt-4">
                <span className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint">Team</span>
                <div className="mt-3 flex -space-x-2">
                  {['#2a2a33', '#3d3528', '#1a1a24', '#22222c'].map((c, i) => (
                    <div key={i} className="h-7 w-7 rounded-full border-2 border-vanta-surface" style={{ backgroundColor: c }} />
                  ))}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-vanta-surface bg-vanta-graphite text-[0.6rem] text-vanta-bone">
                    +1
                  </div>
                </div>
                <p className="mt-2 text-[0.65rem] text-vanta-bone-faint">5 collaborators</p>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OverviewTab() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      <div className="col-span-2 row-span-2 group relative overflow-hidden border border-vanta-border">
        <img src={IMAGES.filmStill1} alt="Opening sequence" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-vanta-bg/90 to-transparent p-3">
          <div className="flex items-center gap-2">
            <Play className="h-3 w-3 text-vanta-bone" />
            <span className="text-xs text-vanta-bone">Opening Sequence — v04</span>
          </div>
        </div>
        <span className="absolute top-2 left-2 bg-vanta-bg/70 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-dim backdrop-blur-sm">Video</span>
      </div>
      <div className="group relative col-span-2 overflow-hidden border border-vanta-border">
        <img src={IMAGES.portrait1} alt="Photography reference" loading="lazy" className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-40" />
        <span className="absolute top-2 left-2 bg-vanta-bg/70 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-dim backdrop-blur-sm">Photo Ref</span>
      </div>
      <div className="group relative overflow-hidden border border-vanta-border">
        <img src={IMAGES.arch1} alt="Design reference" loading="lazy" className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-40" />
      </div>
      <div className="border border-vanta-border p-3">
        <span className="text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-faint">Palette</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {['#1a1a24', '#3d3528', '#8a7bd6', '#c9c7c1', '#ece7dc'].map((c) => (
            <div key={c} className="h-6 w-6 border border-vanta-border" style={{ backgroundColor: c }} title={c} />
          ))}
        </div>
      </div>
      <div className="col-span-2 border border-vanta-border bg-vanta-surface p-3 md:col-span-2">
        <span className="text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-faint">Project Notes</span>
        <p className="mt-2 text-xs leading-relaxed text-vanta-bone-dim">
          Film opens on a single source of light. Build tension through negative space before the first cut.
        </p>
        <div className="mt-3 flex items-center gap-2 text-[0.65rem] text-vanta-bone-faint">
          <CheckCircle2 className="h-3 w-3 text-vanta-glow" />
          3 of 5 decisions logged
        </div>
      </div>
    </div>
  );
}

function DirectionTab() {
  return (
    <div className="space-y-4">
      <div className="border border-vanta-border bg-vanta-surface p-4">
        <span className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint">Creative Direction</span>
        <p className="mt-3 font-serif text-base italic leading-relaxed text-vanta-bone">
          Late afternoon. Soft contrast. Human. Cinematic.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {CREATIVE_NOTES.map((note, i) => (
          <div key={i} className="flex items-start gap-3 border border-vanta-border bg-vanta-surface p-3">
            <FileText className="h-4 w-4 shrink-0 text-vanta-bone-dim" />
            <p className="text-xs leading-relaxed text-vanta-bone-dim">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssetsTab() {
  const items = [IMAGES.filmStill1, IMAGES.portrait1, IMAGES.arch1, IMAGES.portrait3, IMAGES.golden1, IMAGES.camera1, IMAGES.arch3, IMAGES.portrait6];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((img, i) => (
        <div key={i} className="group relative overflow-hidden border border-vanta-border">
          <img src={img} alt={`Asset ${i + 1}`} loading="lazy" className="h-24 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-32" />
        </div>
      ))}
    </div>
  );
}

function ReviewTab() {
  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden border border-vanta-border">
        <img src={IMAGES.filmStill1} alt="Review frame" loading="lazy" className="aspect-video w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-vanta-bg/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-vanta-bone/40 bg-vanta-bg/40 backdrop-blur-sm">
            <Play className="h-5 w-5 text-vanta-bone" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {["Let's hold this shot two frames longer.", 'Try the warmer grade here.'].map((c, i) => (
          <div key={i} className="flex items-start gap-3 border border-vanta-border bg-vanta-surface p-3">
            <MessageSquare className="h-3.5 w-3.5 shrink-0 text-vanta-bone-dim" />
            <p className="text-xs leading-relaxed text-vanta-bone-dim">{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductionTab() {
  const stages = [
    { label: 'First Reference', status: 'done' },
    { label: 'Moodboard Lock', status: 'done' },
    { label: 'Storyboard v2', status: 'active' },
    { label: 'Principal Shoot', status: 'pending' },
    { label: 'Final Grade', status: 'pending' },
  ];
  return (
    <div className="space-y-1">
      {stages.map((s, i) => (
        <div key={i} className="flex items-center gap-4 py-2">
          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.6rem] ${
            s.status === 'done' ? 'border-vanta-glow bg-vanta-glow/20 text-vanta-glow'
            : s.status === 'active' ? 'border-vanta-bone bg-vanta-bone text-vanta-bg'
            : 'border-vanta-border text-vanta-bone-faint'
          }`}>
            {s.status === 'done' ? '✓' : i + 1}
          </div>
          <span className={`text-sm ${s.status === 'pending' ? 'text-vanta-bone-faint' : 'text-vanta-bone-dim'}`}>{s.label}</span>
          {s.status === 'active' && <span className="ml-auto text-[0.6rem] uppercase tracking-wide2 text-vanta-glow">In Progress</span>}
        </div>
      ))}
      <div className="mt-4 h-1 bg-vanta-graphite">
        <div className="h-full w-2/5 bg-gradient-to-r from-vanta-glow to-vanta-chrome" />
      </div>
    </div>
  );
}
