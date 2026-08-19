import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Play, FileText } from 'lucide-react';
import { IMAGES, CREATIVE_NOTES, TIMELINE_MARKERS } from '@/data/content';
import { useReducedMotion, useInView } from '@/hooks';

export default function CommandCenter() {
  const reduced = useReducedMotion();
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<'MOODBOARD' | 'REVIEW' | 'ASSETS' | 'DIRECTION'>('MOODBOARD');

  const reveal = reduced ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="command" className="relative bg-vanta-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <motion.div {...reveal} className="mb-12 max-w-2xl">
          <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            11 — Command Center
          </span>
          <h2 className="mt-6 font-sans text-3xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-5xl">
            THE WHOLE PROJECT.<br />ONE PLACE.
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          {...(reduced ? {} : { ...reveal, transition: { ...reveal.transition, delay: 0.1 } })}
          className="overflow-hidden border border-vanta-border bg-vanta-bg-soft shadow-2xl flex flex-col min-h-[600px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-vanta-border bg-vanta-surface px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-vanta-graphite flex items-center justify-center">
                 <FolderOpen className="h-4 w-4 text-vanta-bone" />
              </div>
              <div>
                <h3 className="font-sans text-sm font-medium text-vanta-bone">NOVA / BRAND FILM</h3>
                <p className="text-xs text-vanta-bone-dim mt-0.5">Project Dashboard</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {['MOODBOARD', 'REVIEW', 'ASSETS', 'DIRECTION'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'MOODBOARD' | 'REVIEW' | 'ASSETS' | 'DIRECTION')}
                  className={`px-4 py-2 text-[0.65rem] font-medium uppercase tracking-widest2 transition-colors ${
                    activeTab === tab 
                      ? 'bg-vanta-bone text-vanta-bg' 
                      : 'border border-vanta-border text-vanta-bone-dim hover:text-vanta-bone hover:border-vanta-bone'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 bg-vanta-bg relative overflow-hidden p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                {activeTab === 'MOODBOARD' && <MoodboardPanel />}
                {activeTab === 'REVIEW' && <ReviewPanel />}
                {activeTab === 'ASSETS' && <AssetsPanel />}
                {activeTab === 'DIRECTION' && <DirectionPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MoodboardPanel() {
  return (
    <div className="h-full grid grid-cols-3 gap-4">
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="border border-vanta-border relative group overflow-hidden">
          <img src={IMAGES.golden1} alt="ref" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" />
          <span className="absolute top-2 left-2 bg-black/60 px-2 py-1 text-[0.6rem] text-vanta-bone backdrop-blur-sm">LIGHTING</span>
        </div>
        <div className="border border-vanta-border relative group overflow-hidden">
          <img src={IMAGES.arch1} alt="ref" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" />
          <span className="absolute top-2 left-2 bg-black/60 px-2 py-1 text-[0.6rem] text-vanta-bone backdrop-blur-sm">TEXTURE</span>
        </div>
        <div className="border border-vanta-border relative group overflow-hidden col-span-2">
          <img src={IMAGES.filmStill1} alt="ref" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" />
          <span className="absolute top-2 left-2 bg-black/60 px-2 py-1 text-[0.6rem] text-vanta-bone backdrop-blur-sm">FRAME</span>
        </div>
      </div>
      <div className="border border-vanta-border bg-vanta-surface p-4">
        <h4 className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint mb-4">Board Stats</h4>
        <div className="space-y-4">
           <div className="flex justify-between text-sm border-b border-vanta-border pb-2">
             <span className="text-vanta-bone-dim">Total References</span>
             <span className="text-vanta-bone">12</span>
           </div>
           <div className="flex justify-between text-sm border-b border-vanta-border pb-2">
             <span className="text-vanta-bone-dim">Active Contributors</span>
             <span className="text-vanta-bone">4</span>
           </div>
           <div className="mt-8">
             <span className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint block mb-2">Palette</span>
             <div className="flex gap-2">
                {['#1a1a24', '#3d3528', '#8a7bd6', '#ece7dc'].map(c => (
                  <div key={c} className="h-8 w-8 border border-vanta-border" style={{backgroundColor: c}} />
                ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ReviewPanel() {
  return (
    <div className="h-full flex gap-6">
      <div className="flex-1 border border-vanta-border relative bg-black flex items-center justify-center group">
         <img src={IMAGES.filmSet2} alt="video" className="w-full object-contain opacity-80" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-vanta-bg/80 border border-vanta-bone/30 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
              <Play className="h-6 w-6 text-vanta-bone ml-1" />
            </div>
         </div>
         <div className="absolute bottom-0 inset-x-0 h-1 bg-vanta-graphite">
            <div className="h-full bg-vanta-glow w-1/3" />
         </div>
      </div>
      <div className="w-80 flex flex-col">
        <h4 className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint mb-4">Feedback Log</h4>
        <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin">
           {TIMELINE_MARKERS.slice(0, 3).map((m, i) => (
             <div key={i} className="border border-vanta-border bg-vanta-surface p-3">
               <div className="flex justify-between items-center mb-1">
                 <span className="text-xs font-medium text-vanta-bone">{m.author}</span>
                 <span className="text-[0.65rem] font-mono text-vanta-glow">00:0{m.time}</span>
               </div>
               <p className="text-xs text-vanta-bone-dim">{m.comment}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function AssetsPanel() {
  const assets = [IMAGES.portrait1, IMAGES.arch3, IMAGES.type1, IMAGES.paint1, IMAGES.camera1, IMAGES.filmSet3];
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      {assets.map((src, i) => (
        <div key={i} className="border border-vanta-border group overflow-hidden relative">
          <img src={src} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-700" alt="asset" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-xs text-vanta-bone truncate">Asset_{i+1}.jpg</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DirectionPanel() {
  return (
    <div className="h-full grid grid-cols-2 gap-6">
      <div className="border border-vanta-border bg-vanta-surface p-6">
        <h4 className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint mb-6">Master Direction</h4>
        <p className="font-serif italic text-2xl text-vanta-bone leading-relaxed">
          Late afternoon.<br/>
          Soft contrast.<br/>
          Human.<br/>
          Cinematic.
        </p>
        <div className="mt-8 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-vanta-graphite border border-vanta-border overflow-hidden">
             <img src={IMAGES.team1} alt="Director" className="w-full h-full object-cover" />
          </div>
          <div className="text-xs text-vanta-bone-dim">
            <span className="block text-vanta-bone">Mara Kovac</span>
            Creative Director
          </div>
        </div>
      </div>
      <div className="space-y-3 overflow-y-auto pr-2 scrollbar-thin">
        {CREATIVE_NOTES.map((note, i) => (
          <div key={i} className="flex gap-3 border border-vanta-border p-4 bg-vanta-bg-soft">
             <FileText className="h-4 w-4 text-vanta-bone-dim shrink-0 mt-0.5" />
             <p className="text-sm text-vanta-bone-dim">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
