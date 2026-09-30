/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // ─── 12-column Grid System ────────────────────────────────
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      // ─── Design Tokens: Color System ─────────────────────────
      // Palette: Black 70% / White 30%, high contrast
      colors: {
        // Base surfaces (dark dominant)
        background: {
          DEFAULT: '#0d0d0d',   // deepest background
          secondary: '#1a1a1a', // card / surface
          tertiary: '#262626',  // elevated surface, hover
        },
        // Text (white spectrum)
        foreground: {
          DEFAULT: '#f5f5f5',   // primary text
          muted:   '#a3a3a3',   // secondary / placeholder
          subtle:  '#525252',   // disabled / hint
        },
        // Border
        border: {
          DEFAULT: '#2e2e2e',
          strong:  '#404040',
        },
        // CTA / Accent: pure white for max contrast on dark bg
        primary: {
          DEFAULT:  '#ffffff',
          hover:    '#e5e5e5',
          active:   '#d4d4d4',
          foreground: '#0d0d0d', // text ON primary button
        },
        // Subject color accents (used for badges only)
        subject: {
          math:    '#818cf8', // indigo-400
          english: '#fbbf24', // amber-400
          thai:    '#f87171', // red-400
          social:  '#34d399', // emerald-400
        },
        // Semantic
        danger:  { DEFAULT: '#f87171', foreground: '#0d0d0d' },
        success: { DEFAULT: '#34d399', foreground: '#0d0d0d' },
        warning: { DEFAULT: '#fbbf24', foreground: '#0d0d0d' },
        // Priority
        priority: {
          high:   '#f87171',
          medium: '#fbbf24',
          low:    '#a3a3a3',
        },
      },

      // ─── Typography ───────────────────────────────────────────
      fontFamily: {
        // Heading / Display — Playpen Sans Thai (playful, modern)
        heading: ['"Playpen Sans Thai"', 'cursive'],
        // Body / Content — Sarabun (readable Thai)
        body:    ['"Sarabun"', 'sans-serif'],
        // Monospace (code blocks)
        mono:    ['"JetBrains Mono"', 'monospace'],
      },

      // ─── Font Sizes (Visual Hierarchy scale) ─────────────────
      fontSize: {
        'display-xl': ['3rem',    { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display':    ['1.875rem',{ lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-xl': ['1.5rem',  { lineHeight: '1.3',  fontWeight: '600' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.4',  fontWeight: '600' }],
        'heading':    ['1.125rem',{ lineHeight: '1.4',  fontWeight: '600' }],
        'body-lg':    ['1.0625rem',{ lineHeight: '1.75' }],
        'body':       ['1rem',    { lineHeight: '1.75' }],
        'body-sm':    ['0.9375rem',{ lineHeight: '1.65' }],
        'caption':    ['0.8125rem',{ lineHeight: '1.5' }],
        'overline':   ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
      },

      // ─── Spacing scale (8px base) ────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
      },

      // ─── Border Radius ────────────────────────────────────────
      borderRadius: {
        'card':  '16px',
        'input': '10px',
        'badge': '6px',
        'pill':  '9999px',
      },

      // ─── Box Shadow (subtle on dark bg) ──────────────────────
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.7)',
        'input-focus':'0 0 0 2px rgba(255,255,255,0.15)',
        'glow':       '0 0 20px rgba(255,255,255,0.06)',
      },

      // ─── Animation ───────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'skeleton': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
      animation: {
        'fade-in':  'fade-in 0.25s ease-out both',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
