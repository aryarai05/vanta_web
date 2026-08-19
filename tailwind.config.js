/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vanta: {
          // near-black background
          bg: '#07070a',
          'bg-soft': '#0c0c11',
          surface: '#121218',
          'surface-2': '#17171f',
          border: '#22222c',
          'border-soft': '#1b1b22',
          graphite: '#2a2a33',
          // warm off-white typography
          bone: '#ece7dc',
          'bone-dim': '#b8b3a8',
          'bone-faint': '#6e6a63',
          // muted violet highlight
          glow: '#8a7bd6',
          // chrome accent
          chrome: '#c9c7c1',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter2': '-0.03em',
        'tight2': '-0.015em',
        'wide2': '0.08em',
        'widest2': '0.22em',
        'widest3': '0.3em',
      },
      fontSize: {
        'display': ['clamp(2.75rem, 7vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'hero': ['clamp(2.5rem, 9vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.045em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'scroll-hint': 'scrollHint 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        scrollHint: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateY(8px)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
