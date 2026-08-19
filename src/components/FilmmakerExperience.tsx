import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useReducedMotion, useInView } from '@/hooks';

const VIDEO_SRC = 'https://www.w3schools.com/html/mov_bbb.mp4';
const POSTER = 'https://picsum.photos/id/574/1600/900';

const KEYFRAMES = [
  { time: 0.5, label: 'OPENING' },
  { time: 4, label: 'PRODUCT SHOT' },
  { time: 7, label: 'VO START' },
  { time: 10, label: 'OUTRO' },
];

export default function FilmmakerExperience() {
  const reduced = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef<ReturnType<typeof setTimeout>>();

  // Split screen divider
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerX = useMotionValue(0.5); // 0→1 fraction
  const [dividerFraction, setDividerFraction] = useState(0.5);
  const rawClip = useTransform(dividerX, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);

  // ─── Video controls ───────────────────────────────────────────────────────
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seekTo = (t: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const requestFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  const fmt = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 2500);
  };

  useEffect(() => () => clearTimeout(controlsTimer.current), []);

  // ─── Divider drag ─────────────────────────────────────────────────────────
  const handleDividerDrag = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const onMove = (ev: PointerEvent) => {
      const frac = Math.max(0.05, Math.min(0.95, (ev.clientX - rect.left) / rect.width));
      dividerX.set(frac);
      setDividerFraction(frac);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    e.preventDefault();
  };

  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section id="filmmaker" className="relative bg-black py-0" aria-label="Filmmaker experience">
      <div ref={sectionRef} className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="px-6 pb-8 pt-24 md:px-12 md:pt-32">
          <motion.div {...reveal}>
            <span className="text-[0.65rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
              02 — Film
            </span>
            <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tighter text-vanta-bone md:text-5xl">
              NOVA BRAND FILM
            </h2>
          </motion.div>
        </div>

        {/* Video Player */}
        <motion.div
          className="relative aspect-video w-full bg-black"
          onPointerMove={handleMouseMove}
          {...(reduced ? {} : { initial: { opacity: 0 }, animate: inView ? { opacity: 1 } : { opacity: 0 }, transition: { delay: 0.2, duration: 1 } })}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER}
            className="h-full w-full object-cover"
            onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 60)}
            playsInline
            onClick={togglePlay}
          />

          {/* Label overlay */}
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3">
            <span className="bg-black/60 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-vanta-bone-dim backdrop-blur-sm">
              FILM / 01 — NOVA BRAND FILM
            </span>
            {playing && (
              <span className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-red-400 backdrop-blur-sm">
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block h-1.5 w-1.5 rounded-full bg-red-500"
                />
                REC
              </span>
            )}
          </div>

          {/* Centered play button when paused */}
          {!playing && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Play video"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-vanta-bone/30 bg-black/50 backdrop-blur-md transition-all hover:scale-105 hover:border-vanta-bone/60">
                <Play className="ml-1 h-6 w-6 text-vanta-bone" />
              </div>
            </button>
          )}

          {/* Controls bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-10"
            animate={{ opacity: showControls || !playing ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Seek bar */}
            <div
              className="relative mb-3 h-1 w-full cursor-pointer rounded-full bg-white/20"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                seekTo(((e.clientX - rect.left) / rect.width) * duration);
              }}
              role="slider"
              aria-label="Video seek"
              aria-valuenow={currentTime}
              aria-valuemin={0}
              aria-valuemax={duration}
            >
              <div
                className="h-full rounded-full bg-vanta-bone"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
              {/* Keyframe markers */}
              {KEYFRAMES.map((kf) => (
                <button
                  key={kf.label}
                  title={kf.label}
                  onClick={(e) => { e.stopPropagation(); seekTo(kf.time); }}
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-vanta-glow hover:scale-125 transition-transform"
                  style={{ left: `${(kf.time / duration) * 100}%` }}
                  aria-label={`Seek to ${kf.label}`}
                />
              ))}
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-vanta-bone transition-opacity hover:opacity-70" aria-label={playing ? 'Pause' : 'Play'}>
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <span className="font-mono text-xs text-vanta-bone-dim">
                {fmt(currentTime)} / {fmt(duration)}
              </span>
              <div className="flex-1" />
              <button onClick={toggleMute} className="text-vanta-bone transition-opacity hover:opacity-70" aria-label={muted ? 'Unmute' : 'Mute'}>
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <button onClick={requestFullscreen} className="text-vanta-bone transition-opacity hover:opacity-70" aria-label="Fullscreen">
                <Maximize className="h-4 w-4" />
              </button>
            </div>

            {/* Keyframe labels */}
            <div className="mt-2 flex justify-between font-mono text-[0.55rem] uppercase tracking-widest text-vanta-bone-faint">
              {KEYFRAMES.map((kf) => (
                <button key={kf.label} onClick={() => seekTo(kf.time)} className="hover:text-vanta-bone transition-colors">
                  {fmt(kf.time)} {kf.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Split Screen Panel */}
        <div className="border-t border-vanta-border px-6 py-10 md:px-12">
          <p className="mb-6 text-[0.65rem] uppercase tracking-widest3 text-vanta-bone-faint">
            DRAG TO COMPARE / VIEW VERSIONS
          </p>
          <div
            ref={containerRef}
            className="relative aspect-[21/6] w-full overflow-hidden border border-vanta-border"
          >
            {/* Base layer: Final Frame */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#1a1008]">
              <img
                src="https://picsum.photos/id/574/800/300"
                alt="Final frame"
                className="h-full w-full object-cover"
                style={{ filter: 'sepia(30%) contrast(1.05) saturate(0.9)' }}
              />
              <div className="absolute left-4 top-3 font-mono text-[0.6rem] uppercase tracking-widest text-vanta-bone/60">
                FINAL FRAME
              </div>
            </div>

            {/* Clipped layer: Raw Camera */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: rawClip }}
            >
              <div className="absolute inset-0 bg-[#0a0a0d]">
                <img
                  src="https://picsum.photos/id/574/800/300"
                  alt="Raw camera"
                  className="h-full w-full object-cover"
                  style={{ filter: 'grayscale(60%) contrast(1.2) brightness(0.85)' }}
                />
                <div className="absolute left-4 top-3 font-mono text-[0.6rem] uppercase tracking-widest text-vanta-bone/60">
                  RAW CAMERA
                </div>
              </div>
            </motion.div>

            {/* Director's Notes center panel (appears when divider is near center) */}
            {Math.abs(dividerFraction - 0.5) < 0.2 && (
              <div
                className="pointer-events-none absolute inset-y-0 z-10 flex items-center justify-center overflow-hidden bg-vanta-bg/90 backdrop-blur-sm"
                style={{
                  left: `${Math.max(0, dividerFraction - 0.15) * 100}%`,
                  width: '30%',
                }}
              >
                <div className="p-4 text-center">
                  <p className="text-[0.55rem] uppercase tracking-widest text-vanta-bone-faint">Director's Notes</p>
                  <p className="mt-2 font-mono text-[0.6rem] text-vanta-bone-dim leading-relaxed">
                    "Hold this shot 2 frames longer. Let the light settle before cutting."
                  </p>
                </div>
              </div>
            )}

            {/* Divider handle */}
            <div
              className="split-divider absolute inset-y-0 z-20 flex cursor-col-resize items-center"
              style={{ left: `${dividerFraction * 100}%` }}
              onPointerDown={handleDividerDrag}
              role="slider"
              aria-label="Drag to compare raw vs final"
              aria-valuenow={Math.round(dividerFraction * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') { const n = Math.max(0.05, dividerFraction - 0.05); dividerX.set(n); setDividerFraction(n); }
                if (e.key === 'ArrowRight') { const n = Math.min(0.95, dividerFraction + 0.05); dividerX.set(n); setDividerFraction(n); }
              }}
            >
              <div className="h-full w-px bg-vanta-bone/40" />
              <div className="absolute flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-vanta-bone/40 bg-vanta-bg/80">
                <span className="select-none text-[0.5rem] text-vanta-bone">⇔</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
