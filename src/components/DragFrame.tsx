import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useReducedMotion, useInView } from '@/hooks';

const LAYERS = [
  {
    id: 'notes',
    label: 'CREATIVE NOTES',
    sublabel: 'Pre-production',
    bg: 'bg-[#0d0d11]',
    content: (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="max-w-md space-y-4 font-mono text-xs text-vanta-bone-dim">
          <p className="text-vanta-bone-faint text-[0.6rem] uppercase tracking-widest">Director Notes — Nova Brand Film</p>
          <p>— Open on hands. Not face. The product comes after feeling.</p>
          <p>— Golden hour. No exceptions. Reschedule if needed.</p>
          <p>— Let silence breathe. 2–3 sec holds before cuts.</p>
          <p>— Lens flares ok but subtle. No artificial light leaks.</p>
          <p>— Color: warm mattes, desaturated shadows. Film print feel.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'raw',
    label: 'RAW FOOTAGE',
    sublabel: '4K / LOG-C',
    bg: 'bg-[#111118]',
    imgFilter: 'grayscale(20%) contrast(1.15) brightness(0.9)',
    content: null,
  },
  {
    id: 'grade',
    label: 'COLOR GRADE',
    sublabel: 'Rec.709 LUT Applied',
    bg: 'bg-[#0d0b09]',
    imgFilter: 'sepia(45%) contrast(1.08) saturate(0.85) brightness(0.95)',
    content: null,
  },
  {
    id: 'final',
    label: 'FINAL FILM',
    sublabel: 'Approved for delivery',
    bg: 'bg-black',
    imgFilter: 'none',
    content: null,
  },
];

const IMG = 'https://picsum.photos/id/29/1200/675';

export default function DragFrame() {
  const reduced = useReducedMotion();
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const containerRef = useRef<HTMLDivElement>(null);
  const handleY = useMotionValue(0);
  const [containerH, setContainerH] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerH(containerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Normalised progress 0→1 (top→bottom drag)
  const progress = useTransform(handleY, [0, containerH], [1, 0]);

  // Each layer's clip: layers peel from top as handle goes down
  // progress=1 (handle at top) → all layers visible
  // progress=0 (handle at bottom) → only bottom layer visible
  const layer3Clip = useTransform(progress, [0.75, 1], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);
  const layer2Clip = useTransform(progress, [0.5, 0.75], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);
  const layer1Clip = useTransform(progress, [0.25, 0.5], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);

  const handleLabel = useTransform(progress, (p) => {
    if (p > 0.75) return `FINAL FILM — ${Math.round(p * 100)}%`;
    if (p > 0.5) return `COLOR GRADE — ${Math.round(p * 100)}%`;
    if (p > 0.25) return `RAW FOOTAGE — ${Math.round(p * 100)}%`;
    return `CREATIVE NOTES — ${Math.round(p * 100)}%`;
  });

  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section className="relative bg-vanta-bg py-24 md:py-32" aria-label="Drag the frame interaction">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header */}
        <motion.div ref={sectionRef} {...reveal} className="mb-12 text-center">
          <span className="text-[0.65rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            03 — Layers
          </span>
          <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tighter text-vanta-bone md:text-5xl">
            DRAG THE FRAME
          </h2>
          <p className="mt-3 text-sm text-vanta-bone-faint">
            Peel back the layers behind a finished film.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-[0.65rem] uppercase tracking-widest2 text-vanta-bone-faint">
            <motion.span
              animate={reduced ? {} : { y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
              ↕
            </motion.span>
            <span>Drag to reveal</span>
          </div>
        </motion.div>

        {/* Frame container */}
        <motion.div
          {...(reduced ? {} : { initial: { opacity: 0 }, animate: inView ? { opacity: 1 } : { opacity: 0 }, transition: { delay: 0.3, duration: 0.8 } })}
          className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden border border-vanta-border"
          ref={containerRef}
        >
          {/* Layer 0 — Creative Notes (always bottom) */}
          <div className={`absolute inset-0 ${LAYERS[0].bg}`}>
            {LAYERS[0].content}
          </div>

          {/* Layer 1 — Raw Footage */}
          <motion.div className="absolute inset-0" style={{ clipPath: layer1Clip }}>
            <div className={`absolute inset-0 ${LAYERS[1].bg}`}>
              <img
                src={IMG}
                alt="Raw footage"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: LAYERS[1].imgFilter }}
                loading="lazy"
              />
              {/* Scanline overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
                }}
              />
            </div>
            <span className="absolute left-4 top-4 rounded bg-black/50 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-vanta-bone-faint backdrop-blur-sm">
              {LAYERS[1].label} · {LAYERS[1].sublabel}
            </span>
          </motion.div>

          {/* Layer 2 — Color Grade */}
          <motion.div className="absolute inset-0" style={{ clipPath: layer2Clip }}>
            <div className={`absolute inset-0 ${LAYERS[2].bg}`}>
              <img
                src={IMG}
                alt="Color grade"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: LAYERS[2].imgFilter }}
                loading="lazy"
              />
            </div>
            <span className="absolute left-4 top-4 rounded bg-black/50 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-vanta-bone-faint backdrop-blur-sm">
              {LAYERS[2].label} · {LAYERS[2].sublabel}
            </span>
          </motion.div>

          {/* Layer 3 — Final Film (top) */}
          <motion.div className="absolute inset-0" style={{ clipPath: layer3Clip }}>
            <div className="absolute inset-0 bg-black">
              <img
                src={IMG}
                alt="Final film"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="absolute left-4 top-4 rounded bg-black/50 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-vanta-bone-faint backdrop-blur-sm">
              {LAYERS[3].label} · {LAYERS[3].sublabel}
            </span>
          </motion.div>

          {/* Progress label */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
            <motion.span className="rounded bg-black/60 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-vanta-bone backdrop-blur-sm">
              {handleLabel}
            </motion.span>
          </div>

          {/* Draggable handle */}
          <motion.div
            drag="y"
            dragConstraints={containerRef}
            dragElastic={0.05}
            style={{ y: handleY }}
            className="drag-handle absolute left-0 right-0 z-20 flex cursor-ns-resize items-center justify-center"
            initial={{ y: 0 }}
            aria-label="Drag to reveal layers"
            role="slider"
            aria-orientation="vertical"
          >
            <div className="relative flex w-full flex-col items-center">
              {/* Horizontal line */}
              <div className="h-px w-full bg-vanta-bone/40" />
              {/* Center grip */}
              <div className="absolute -top-4 flex h-8 w-16 items-center justify-center rounded-full border border-vanta-bone/30 bg-vanta-bg/80 backdrop-blur-md">
                <div className="flex flex-col gap-0.5">
                  <div className="h-px w-5 bg-vanta-bone/60" />
                  <div className="h-px w-5 bg-vanta-bone/60" />
                  <div className="h-px w-5 bg-vanta-bone/60" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Layer index legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          {LAYERS.slice(1).reverse().map((l) => (
            <button
              key={l.id}
              onClick={() => {
                const idx = LAYERS.indexOf(l);
                const targetProgress = (idx / (LAYERS.length - 1));
                animate(handleY, containerH * (1 - targetProgress), { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
              }}
              className="text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint transition-colors hover:text-vanta-bone"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
