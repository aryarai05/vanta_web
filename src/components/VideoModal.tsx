import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';
import { useBodyScrollLock, useEscapeKey, useReducedMotion } from '@/hooks';

type VideoModalProps = {
  src: string;
  poster?: string;
  open: boolean;
  onClose: () => void;
  title?: string;
};

export default function VideoModal({ src, poster, open, onClose, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();

  useBodyScrollLock(open);
  useEscapeKey(onClose, open);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [open]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-vanta-bg/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={reduced ? {} : { scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduced ? {} : { scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest2 text-vanta-bone-dim">{title}</span>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest2 text-vanta-bone-dim transition-colors hover:text-vanta-bone"
                  aria-label="Close video"
                >
                  Close <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="group relative overflow-hidden border border-vanta-border bg-black">
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="aspect-video w-full object-contain"
                loop
                playsInline
                controls={false}
              />
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-vanta-bone/40 bg-vanta-bg/40 backdrop-blur-sm">
                  {playing ? <Pause className="h-6 w-6 text-vanta-bone" /> : <Play className="h-6 w-6 text-vanta-bone" />}
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
