import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, MessageSquare, Plus } from 'lucide-react';
import { VIDEOS, VIDEO_POSTERS, TIMELINE_MARKERS, INITIAL_COMMENTS } from '@/data/content';
import { useReducedMotion, useInView } from '@/hooks';

export default function VideoReview() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

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

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    
    // Check if near a marker to highlight it
    const nearMarker = TIMELINE_MARKERS.find(m => Math.abs(m.time - videoRef.current!.currentTime) < 0.5);
    if (nearMarker) {
      setActiveMarker(nearMarker.time);
    } else {
      setActiveMarker(null);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const seekTo = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
    setActiveMarker(time);
    
    // Also pause the video to read the comment
    videoRef.current.pause();
    setPlaying(false);
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setComments([
      ...comments,
      {
        id: `c${Date.now()}`,
        time: currentTime,
        text: newComment,
        author: 'You',
        role: 'Collaborator',
      }
    ].sort((a, b) => a.time - b.time));
    
    setNewComment('');
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const reveal = reduced ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="review" className="relative bg-vanta-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <motion.div {...reveal} className="mb-12 max-w-2xl">
          <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint">
            06 — Video Review
          </span>
          <h2 className="mt-6 font-sans text-3xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-5xl">
            REVIEW THE FRAME.<br />NOT THE EMAIL THREAD.
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          {...(reduced ? {} : { ...reveal, transition: { ...reveal.transition, delay: 0.1 } })}
          className="flex flex-col border border-vanta-border bg-vanta-bg-soft lg:flex-row"
        >
          {/* Main Video Area */}
          <div className="flex-1 border-b border-vanta-border lg:border-b-0 lg:border-r">
            <div className="group relative bg-black">
              <video
                ref={videoRef}
                src={VIDEOS.review}
                poster={VIDEO_POSTERS.review}
                className="aspect-video w-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                playsInline
                onClick={togglePlay}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/20 pointer-events-none">
                 <button
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-vanta-bone/30 bg-vanta-bg/60 backdrop-blur-md"
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                >
                  {playing ? <Pause className="h-6 w-6 text-vanta-bone" /> : <Play className="h-6 w-6 text-vanta-bone" />}
                </button>
              </div>
              <div className="pointer-events-none absolute top-4 left-4">
                <span className="bg-vanta-bg/80 px-2.5 py-1 text-[0.65rem] uppercase tracking-widest2 text-vanta-bone-dim backdrop-blur-sm">
                  v04 — Final Grade
                </span>
              </div>
            </div>

            {/* Custom Controls & Timeline */}
            <div className="bg-vanta-surface p-4">
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="text-vanta-bone hover:text-vanta-glow transition-colors">
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <span className="font-mono text-xs text-vanta-bone-dim">
                  {formatTime(currentTime)} / {formatTime(duration || 45)}
                </span>
              </div>
              
              {/* Timeline Track */}
              <div className="relative mt-4 h-1.5 w-full rounded-full bg-vanta-graphite cursor-pointer" onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const x = e.clientX - rect.left;
                 const percentage = Math.max(0, Math.min(1, x / rect.width));
                 if (duration) seekTo(percentage * duration);
              }}>
                <div 
                  className="absolute inset-y-0 left-0 bg-vanta-glow rounded-full"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
                
                {/* Timeline Markers */}
                {TIMELINE_MARKERS.map((marker, i) => (
                  <button
                    key={i}
                    className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full border border-vanta-bg transition-colors ${activeMarker === marker.time ? 'bg-vanta-bone scale-125 z-10' : 'bg-vanta-glow hover:bg-vanta-bone'}`}
                    style={{ left: `${duration ? (marker.time / duration) * 100 : (marker.time / 45) * 100}%` }}
                    onClick={(e) => { e.stopPropagation(); seekTo(marker.time); }}
                    title={marker.label}
                  />
                ))}
              </div>
              
              <div className="mt-2 flex justify-between text-[0.6rem] uppercase tracking-widest2 text-vanta-bone-faint hidden sm:flex">
                {TIMELINE_MARKERS.map((marker, i) => (
                   <span 
                     key={i} 
                     className={`cursor-pointer hover:text-vanta-bone ${activeMarker === marker.time ? 'text-vanta-bone' : ''}`}
                     onClick={() => seekTo(marker.time)}
                   >
                     {formatTime(marker.time)} — {marker.label}
                   </span>
                ))}
              </div>
            </div>
          </div>

          {/* Comments Panel */}
          <div className="flex h-[400px] flex-col lg:h-auto lg:w-80 xl:w-96">
            <div className="border-b border-vanta-border p-4">
              <h3 className="font-sans text-sm font-medium tracking-wide2 text-vanta-bone">Comments</h3>
              <p className="text-xs text-vanta-bone-faint">{comments.length} notes on this version</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className={`flex items-start gap-3 p-3 transition-colors ${activeMarker === comment.time || Math.abs(currentTime - comment.time) < 1 ? 'bg-vanta-surface border-l-2 border-vanta-glow' : 'border-l-2 border-transparent'}`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vanta-graphite text-xs font-medium text-vanta-bone">
                    {comment.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-vanta-bone">{comment.author}</span>
                      <button 
                        onClick={() => seekTo(comment.time)}
                        className="font-mono text-[0.65rem] text-vanta-bone-dim hover:text-vanta-glow"
                      >
                        {formatTime(comment.time)}
                      </button>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-vanta-bone-dim">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="border-t border-vanta-border p-4 bg-vanta-surface">
              <form onSubmit={addComment} className="relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`Add a note at ${formatTime(currentTime)}...`}
                  className="w-full border border-vanta-border bg-vanta-bg px-3 py-2 pr-10 text-xs text-vanta-bone placeholder:text-vanta-bone-faint focus:border-vanta-glow focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center bg-vanta-bone text-vanta-bg transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
