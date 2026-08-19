import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, RotateCcw, Filter } from 'lucide-react';
import { INITIAL_MOODBOARD, MOODBOARD_FILTERS, IMAGES, type MoodboardCard } from '@/data/content';
import { useLocalStorage, useReducedMotion, useBodyScrollLock, useEscapeKey } from '@/hooks';

type DragState = {
  id: string;
  offsetX: number;
  offsetY: number;
};

export default function InteractiveMoodboard() {
  const reduced = useReducedMotion();
  const [cards, setCards] = useLocalStorage<MoodboardCard[]>('vanta-moodboard', INITIAL_MOODBOARD);
  const [filter, setFilter] = useState<string>('ALL');
  const [selected, setSelected] = useState<string | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const boardRef = useRef<HTMLDivElement>(null);

  const filtered = filter === 'ALL' ? cards : cards.filter((c) => c.type === filter);

  const onPointerDown = useCallback((e: React.PointerEvent, card: MoodboardCard) => {
    if (reduced) return;
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    setDrag({
      id: card.id,
      offsetX: e.clientX - rect.left - (card.x / 100) * rect.width,
      offsetY: e.clientY - rect.top - (card.y / 100) * rect.height,
    });
    setSelected(card.id);
  }, [reduced]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag) return;
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    const x = ((e.clientX - rect.left - drag.offsetX) / rect.width) * 100;
    const y = ((e.clientY - rect.top - drag.offsetY) / rect.height) * 100;
    setCards((prev) => prev.map((c) =>
      c.id === drag.id ? { ...c, x: Math.max(0, Math.min(90, x)), y: Math.max(0, Math.min(90, y)) } : c
    ));
  }, [drag, setCards]);

  const onPointerUp = useCallback(() => setDrag(null), []);

  const resetLayout = () => setCards(INITIAL_MOODBOARD);

  const addCard = (type: MoodboardCard['type'], title: string, subtitle: string, image?: string) => {
    const newCard: MoodboardCard = {
      id: `m${Date.now()}`,
      type,
      title,
      subtitle,
      image: image || (type === 'IMAGE' ? IMAGES.golden2 : undefined),
      x: 10 + Math.random() * 20,
      y: 10 + Math.random() * 20,
      w: type === 'NOTE' ? 3 : 3,
      h: type === 'COLOR' ? 2 : 3,
      rotation: (Math.random() - 0.5) * 4,
    };
    setCards((prev) => [...prev, newCard]);
    setAddOpen(false);
  };

  const reveal = reduced ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="moodboard" className="relative bg-vanta-bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <motion.div {...reveal} className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
              03 — Moodboard
            </span>
            <h2 className="mt-5 font-sans text-3xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-5xl">
              BUILD THE VISUAL LANGUAGE.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-vanta-bone-faint">
              MOODBOARD / {cards.length} REFERENCES
            </span>
          </div>
        </motion.div>

        {/* toolbar */}
        <div className="mb-6 flex flex-wrap items-center gap-3 border border-vanta-border bg-vanta-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-vanta-bone-faint" />
            {MOODBOARD_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide2 transition-colors ${
                  filter === f ? 'bg-vanta-bone text-vanta-bg' : 'text-vanta-bone-dim hover:text-vanta-bone'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
              className="border border-vanta-border px-2.5 py-1 text-xs text-vanta-bone-dim transition-colors hover:text-vanta-bone"
            >
              −
            </button>
            <span className="text-[0.65rem] text-vanta-bone-faint">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
              className="border border-vanta-border px-2.5 py-1 text-xs text-vanta-bone-dim transition-colors hover:text-vanta-bone"
            >
              +
            </button>
            <button
              onClick={resetLayout}
              className="flex items-center gap-1.5 border border-vanta-border px-2.5 py-1 text-xs text-vanta-bone-dim transition-colors hover:text-vanta-bone"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
            <button
              onClick={() => setAddOpen(true)}
              data-cursor="ADD"
              className="flex items-center gap-1.5 border border-vanta-glow/40 bg-vanta-glow/10 px-3 py-1 text-xs text-vanta-glow transition-colors hover:bg-vanta-glow/20"
            >
              <Plus className="h-3 w-3" />
              ADD REFERENCE
            </button>
          </div>
        </div>

        {/* board */}
        <div
          ref={boardRef}
          className="relative h-[500px] overflow-hidden border border-vanta-border bg-vanta-bg bg-dots md:h-[650px]"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ touchAction: 'none' }}
        >
          <div className="absolute inset-0 origin-top-left" style={{ transform: `scale(${zoom})` }}>
            {filtered.map((card) => (
              <MoodboardCardItem
                key={card.id}
                card={card}
                isSelected={selected === card.id}
                isDragging={drag?.id === card.id}
                onPointerDown={onPointerDown}
                onDoubleClick={() => setSelected(card.id)}
                reduced={reduced}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex h-full items-center justify-center text-sm text-vanta-bone-faint">
              No references in this category. Add one.
            </div>
          )}
        </div>
      </div>

      <AddReferenceModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addCard} />
    </section>
  );
}

function MoodboardCardItem({
  card,
  isSelected,
  isDragging,
  onPointerDown,
  onDoubleClick,
  reduced,
}: {
  card: MoodboardCard;
  isSelected: boolean;
  isDragging: boolean;
  onPointerDown: (e: React.PointerEvent, card: MoodboardCard) => void;
  onDoubleClick: () => void;
  reduced: boolean;
}) {
  return (
    <div
      className={`absolute cursor-grab select-none touch-none transition-shadow ${
        isDragging ? 'cursor-grabbing shadow-2xl z-50' : 'shadow-lg'
      } ${isSelected ? 'ring-1 ring-vanta-glow' : ''}`}
      style={{
        left: `${card.x}%`,
        top: `${card.y}%`,
        width: `${card.w * 3}%`,
        transform: `rotate(${card.rotation}deg) ${isDragging ? 'scale(1.05)' : ''}`,
        transition: isDragging ? 'none' : 'transform 0.2s, box-shadow 0.2s',
      }}
      onPointerDown={(e) => onPointerDown(e, card)}
      onDoubleClick={onDoubleClick}
      data-cursor="DRAG"
    >
      <div className="overflow-hidden border border-vanta-border bg-vanta-surface">
        {card.image && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={card.image} alt={card.title} loading="lazy" className="h-full w-full object-cover" draggable={false} />
            {card.type === 'VIDEO' && (
              <div className="absolute inset-0 flex items-center justify-center bg-vanta-bg/20">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-vanta-bone/40 bg-vanta-bg/40 backdrop-blur-sm">
                  <span className="ml-0.5 block h-0 w-0 border-y-4 border-l-[6px] border-y-transparent border-l-vanta-bone" />
                </span>
              </div>
            )}
          </div>
        )}
        {card.color && (
          <div className="flex h-16">
            {card.color.map((c) => (
              <div key={c} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
        {card.note && (
          <div className="p-3">
            <p className="font-serif text-xs italic leading-relaxed text-vanta-bone-dim">"{card.note}"</p>
          </div>
        )}
        <div className="flex items-center justify-between px-2.5 py-2">
          <span className="truncate text-xs text-vanta-bone">{card.title}</span>
          <span className="ml-2 shrink-0 text-[0.55rem] uppercase tracking-wide2 text-vanta-bone-faint">{card.type}</span>
        </div>
      </div>
      {/* hover metadata */}
      <div className={`pointer-events-none absolute -top-7 left-0 whitespace-nowrap bg-vanta-bg/90 px-2 py-0.5 text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-dim backdrop-blur-sm transition-opacity ${
        isSelected ? 'opacity-100' : 'opacity-0'
      }`}>
        {card.subtitle}
      </div>
    </div>
  );
}

function AddReferenceModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (type: MoodboardCard['type'], title: string, subtitle: string, image?: string) => void;
}) {
  const [type, setType] = useState<MoodboardCard['type']>('IMAGE');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  useBodyScrollLock(open);
  useEscapeKey(onClose, open);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(type, title.trim(), subtitle.trim() || type);
    setTitle('');
    setSubtitle('');
    setType('IMAGE');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-vanta-bg/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md border border-vanta-border bg-vanta-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-wide2 text-vanta-bone">Add Reference</h3>
              <button onClick={onClose} aria-label="Close"><X className="h-4 w-4 text-vanta-bone-dim" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[0.65rem] uppercase tracking-wide2 text-vanta-bone-faint">Type</label>
                <div className="flex flex-wrap gap-1.5">
                  {(['IMAGE', 'VIDEO', 'TYPE', 'COLOR', 'NOTE'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide2 ${
                        type === t ? 'bg-vanta-bone text-vanta-bg' : 'border border-vanta-border text-vanta-bone-dim'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[0.65rem] uppercase tracking-wide2 text-vanta-bone-faint">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Golden Hour Study"
                  className="w-full border border-vanta-border bg-vanta-bg px-3 py-2 text-sm text-vanta-bone placeholder:text-vanta-bone-faint focus:border-vanta-glow focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.65rem] uppercase tracking-wide2 text-vanta-bone-faint">Label</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. LIGHTING REFERENCE"
                  className="w-full border border-vanta-border bg-vanta-bg px-3 py-2 text-sm text-vanta-bone placeholder:text-vanta-bone-faint focus:border-vanta-glow focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-vanta-bone/40 py-2.5 text-sm font-medium tracking-wide2 text-vanta-bone transition-colors hover:bg-vanta-bone/10"
              >
                Add to Moodboard
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
