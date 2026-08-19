import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Download, Maximize2 } from 'lucide-react';
import { ASSETS, ASSET_CATEGORIES, Asset } from '@/data/content';
import { useReducedMotion, useInView } from '@/hooks';

export default function AssetLibrary() {
  const reduced = useReducedMotion();
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<typeof ASSET_CATEGORIES[number]>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = useMemo(() => {
    return ASSETS.filter((asset) => {
      const matchesCategory = activeCategory === 'ALL' || asset.category === activeCategory;
      const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            asset.project.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const reveal = reduced ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="assets" className="relative bg-vanta-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <motion.div {...reveal} className="mb-12 max-w-2xl">
          <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            07 — Asset Library
          </span>
          <h2 className="mt-6 font-sans text-3xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-5xl">
            EVERYTHING IN ONE FRAME OF MIND.
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          {...(reduced ? {} : { ...reveal, transition: { ...reveal.transition, delay: 0.1 } })}
          className="border border-vanta-border bg-vanta-bg-soft p-4 md:p-8"
        >
          {/* Controls Bar */}
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-vanta-border pb-6 md:flex-row md:items-center">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {ASSET_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-widest2 transition-colors ${
                    activeCategory === cat
                      ? 'border-vanta-glow bg-vanta-glow/10 text-vanta-glow'
                      : 'border-vanta-border text-vanta-bone-dim hover:border-vanta-bone-dim hover:text-vanta-bone'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-vanta-bone-faint" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-vanta-border bg-vanta-surface py-2 pl-9 pr-4 text-sm text-vanta-bone placeholder:text-vanta-bone-faint focus:border-vanta-glow focus:outline-none"
              />
            </div>
          </div>

          {/* Asset Grid (Masonry-like flex implementation) */}
          <div className="columns-2 gap-4 md:columns-3 xl:columns-4">
            {filteredAssets.map((asset) => (
              <div 
                key={asset.id} 
                className="group relative mb-4 break-inside-avoid overflow-hidden border border-vanta-border bg-vanta-surface cursor-pointer"
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={asset.image} 
                    alt={asset.title} 
                    loading="lazy" 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/40 transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-6 w-6 text-vanta-bone" />
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.6rem] uppercase tracking-wide2 text-vanta-bone-faint">{asset.category}</span>
                    <span className="text-[0.6rem] text-vanta-bone-dim">{asset.size}</span>
                  </div>
                  <h4 className="mt-1 font-sans text-sm font-medium text-vanta-bone truncate">{asset.title}</h4>
                </div>
              </div>
            ))}
            
            {filteredAssets.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <p className="text-vanta-bone-dim">No assets found matching your criteria.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Asset Preview Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-vanta-bg/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedAsset(null)}
          >
            <motion.div
              initial={reduced ? {} : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduced ? {} : { scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden border border-vanta-border bg-vanta-bg-soft shadow-2xl md:flex-row"
            >
              <button
                className="absolute right-4 top-4 z-10 p-1 text-vanta-bone-dim hover:text-vanta-bone md:hidden"
                onClick={() => setSelectedAsset(null)}
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex-1 bg-black overflow-hidden flex items-center justify-center">
                <img 
                  src={selectedAsset.image} 
                  alt={selectedAsset.title} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              <div className="flex w-full flex-col justify-between border-t border-vanta-border p-6 md:w-80 md:border-l md:border-t-0">
                <div>
                  <button
                    className="hidden absolute right-4 top-4 p-1 text-vanta-bone-dim hover:text-vanta-bone md:block"
                    onClick={() => setSelectedAsset(null)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <h3 className="font-sans text-xl font-medium text-vanta-bone pr-8">{selectedAsset.title}</h3>
                  <p className="mt-1 text-xs text-vanta-bone-faint">{selectedAsset.project}</p>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex justify-between border-b border-vanta-border pb-2 text-sm">
                      <span className="text-vanta-bone-dim">Type</span>
                      <span className="text-vanta-bone font-medium">{selectedAsset.category}</span>
                    </div>
                    <div className="flex justify-between border-b border-vanta-border pb-2 text-sm">
                      <span className="text-vanta-bone-dim">Dimensions</span>
                      <span className="text-vanta-bone font-mono text-xs">{selectedAsset.dimensions}</span>
                    </div>
                    <div className="flex justify-between border-b border-vanta-border pb-2 text-sm">
                      <span className="text-vanta-bone-dim">Added</span>
                      <span className="text-vanta-bone text-xs">{selectedAsset.date}</span>
                    </div>
                    <div className="flex justify-between border-b border-vanta-border pb-2 text-sm">
                      <span className="text-vanta-bone-dim">Size</span>
                      <span className="text-vanta-bone text-xs">{selectedAsset.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button className="flex w-full items-center justify-center gap-2 border border-vanta-border bg-vanta-surface px-4 py-3 text-sm font-medium tracking-wide2 text-vanta-bone transition-colors hover:bg-vanta-border hover:text-white">
                    <Download className="h-4 w-4" />
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
