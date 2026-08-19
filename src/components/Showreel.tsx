import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { VIDEOS, VIDEO_POSTERS, IMAGES } from '@/data/content';
import { useReducedMotion, useInView, smoothScrollTo } from '@/hooks';
import VideoModal from './VideoModal';

export default function Showreel() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().then(() => setPlaying(true)).catch(() => {}); }
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const reveal = reduced ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="showreel" className="relative bg-vanta-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <motion.div {...reveal} className="mb-8 flex flex-col gap-2">
          <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            01 — Showreel
          </span>
          <h2 className="max-w-3xl font-sans text-2xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-4xl">
            THE IDEA BEFORE THE FINAL FRAME.
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          {...(reduced ? {} : { ...reveal, transition: { ...reveal.transition, delay: 0.1 } })}
          className="group relative overflow-hidden border border-vanta-border bg-black"
          data-cursor="OPEN"
        >
          <video
            ref={videoRef}
            src={VIDEOS.showreel}
            poster={VIDEO_POSTERS.showreel}
            className="aspect-video w-full object-cover"
            autoPlay
            muted={muted}
            loop
            playsInline
            onClick={() => setModalOpen(true)}
          />

          {/* overlay metadata */}
          <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-3">
            <span className="bg-vanta-bg/60 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wide2 text-vanta-bone-dim backdrop-blur-sm">
              VANTA / SHOWREEL 01
            </span>
          </div>
          <div className="pointer-events-none absolute top-4 right-4">
            <span className="bg-vanta-bg/60 px-2 py-1 font-mono text-[0.65rem] text-vanta-bone-dim backdrop-blur-sm">
              00:42
            </span>
          </div>

          {/* gradient bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

          {/* custom controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-vanta-bone/30 bg-vanta-bg/40 backdrop-blur-sm transition-transform hover:scale-110"
                aria-label={playing ? 'Pause' : 'Play'}
                data-cursor={playing ? 'PAUSE' : 'PLAY'}
              >
                {playing ? <Pause className="h-4 w-4 text-vanta-bone" /> : <Play className="h-4 w-4 text-vanta-bone" />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-vanta-bone/30 bg-vanta-bg/40 backdrop-blur-sm transition-transform hover:scale-110"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <VolumeX className="h-4 w-4 text-vanta-bone" /> : <Volume2 className="h-4 w-4 text-vanta-bone" />}
              </button>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-vanta-bg/60 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide2 text-vanta-bone-dim backdrop-blur-sm transition-colors hover:text-vanta-bone"
              data-cursor="OPEN"
            >
              Expand
            </button>
          </div>
        </motion.div>
      </div>

      <VideoModal
        src={VIDEOS.showreel}
        poster={VIDEO_POSTERS.showreel}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="VANTA / SHOWREEL 01"
      />
    </section>
  );
}
