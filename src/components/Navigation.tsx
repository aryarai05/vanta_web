import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/data/content';
import { useReducedMotion } from '@/hooks';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  const scrollToHero = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={reduced ? {} : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-vanta-border-soft bg-vanta-bg/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
          <button
            onClick={scrollToHero}
            className="font-sans text-xl font-semibold tracking-tight2 text-vanta-bone transition-opacity hover:opacity-70"
            aria-label="VANTA home"
          >
            VANTA
          </button>

          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium tracking-wide2 text-vanta-bone-dim transition-colors hover:text-vanta-bone"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick('#contact')}
              className="rounded-none border border-vanta-bone/30 px-5 py-2.5 text-sm font-medium tracking-wide2 text-vanta-bone transition-all hover:border-vanta-glow hover:bg-vanta-glow/10"
            >
              Enter VANTA
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-vanta-bone" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-vanta-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-xl font-semibold tracking-tight2">VANTA</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-vanta-bone" />
              </button>
            </div>
            <motion.div
              initial={reduced ? {} : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col gap-2 px-6 pt-8"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={reduced ? {} : { x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  onClick={() => handleNavClick(link.href)}
                  className="border-b border-vanta-border-soft py-5 text-left font-serif text-3xl text-vanta-bone transition-colors hover:text-vanta-glow"
                >
                  {link.label}
                </motion.button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="mt-8 border border-vanta-bone/30 py-4 text-center text-sm font-medium tracking-wide2 text-vanta-bone"
              >
                Enter VANTA
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
