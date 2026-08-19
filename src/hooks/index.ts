import { useEffect, useRef, useState, useCallback } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

export function useKonamiCode(onTrigger: () => void, resetSignal?: number): void {
  const progress = useRef<number>(0);

  useEffect(() => {
    progress.current = 0;
  }, [resetSignal]);

  useEffect(() => {
    const target = KONAMI_SEQUENCE;
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === target[progress.current]) {
        progress.current += 1;
        if (progress.current === target.length) {
          progress.current = 0;
          onTrigger();
        }
      } else {
        progress.current = key === target[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onTrigger]);
}

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return progress;
}

export function useLocalStorage<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) as T : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota errors
    }
  }, [key, value]);

  return [value, setValue];
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options?.once !== false) observer.disconnect();
      }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

export function useCustomCursor() {
  const outerCursorRef = useRef<HTMLDivElement>(null);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let outerX = x;
    let outerY = y;
    let visible = false;

    const animate = () => {
      // outer ring follows with lerp
      outerX += (x - outerX) * 0.15;
      outerY += (y - outerY) * 0.15;

      if (outerCursorRef.current) {
        outerCursorRef.current.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) translate(-50%, -50%)`;
        outerCursorRef.current.style.opacity = visible ? '1' : '0';
      }
      
      // inner dot follows instantly
      if (innerCursorRef.current) {
        innerCursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        innerCursorRef.current.style.opacity = visible ? '1' : '0';
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) visible = true;

      const el = e.target as HTMLElement;
      
      // Check for clickable elements to scale cursor
      const isClickable = el.closest('a, button, [role="button"], input, select, textarea, [data-cursor]');
      if (outerCursorRef.current) {
        if (isClickable) {
          outerCursorRef.current.classList.add('scale-150', 'bg-white/10');
          innerCursorRef.current?.classList.add('scale-50', 'opacity-0');
        } else {
          outerCursorRef.current.classList.remove('scale-150', 'bg-white/10');
          innerCursorRef.current?.classList.remove('scale-50', 'opacity-0');
        }
      }

      const cursorLabel = el.closest('[data-cursor]')?.getAttribute('data-cursor') || '';
      if (labelRef.current) {
        labelRef.current.textContent = cursorLabel;
        if (cursorLabel) {
           outerCursorRef.current?.classList.add('px-3', 'py-1', 'rounded-full', 'scale-110');
           outerCursorRef.current?.classList.remove('w-10', 'h-10');
        } else {
           outerCursorRef.current?.classList.remove('px-3', 'py-1', 'rounded-full', 'scale-110');
           outerCursorRef.current?.classList.add('w-10', 'h-10');
        }
      }
    };

    const onLeave = () => { visible = false; };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return { outerCursorRef, innerCursorRef, labelRef };
}

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [active]);
}

export function useEscapeKey(handler: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handler, active]);
}

export function smoothScrollTo(href: string, reduced: boolean) {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
}
