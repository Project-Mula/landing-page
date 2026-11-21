import type { Config } from 'tailwindcss';

// All MŪLA colours live here as named tokens, so components never use raw hex values.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5F5F0', // page canvas, warm off-white
        surface: '#E6D8C3', // sand tile
        mist: '#E3ECE5', // pale sage tile (also the success background)
        bone: '#EEEADF', // light bone tile
        card: '#FFFFFF', // the lot card, sitting on a tile
        border: '#C2A68C', // tan rules and outlines
        sage: '#5D866C', // brand sage, decoration and large marks only
        'sage-dark': '#46664F', // buttons with white text, links
        forest: '#2F4A37', // hover, header, footer and the dark compliance band
        ink: '#2B2B26', // body text
        muted: '#4F4B42', // secondary text
        'on-dark': '#F5F5F0', // text on forest
        'on-dark-muted': '#CFDBD2', // secondary text on forest
        lime: '#E8FE85', // the one bright accent: the deadline strip
        danger: '#8E2C2C',
        'danger-bg': '#F6E1DE',
        success: '#2F4A37',
        'success-bg': '#E3ECE5',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        hero: '30px',
      },
      maxWidth: {
        page: '1200px',
        prose: '60ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)', // strong ease-out for UI
      },
    },
  },
  plugins: [],
} satisfies Config;
