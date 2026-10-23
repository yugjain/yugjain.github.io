/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0B0B0C',
          surface: '#141416',
          card: '#161618',
          subtle: '#1C1C1F',
          border: '#27272A',
          muted: '#3F3F46',
          text: '#F4F4F5',
          soft: '#A1A1AA'
        },
        light: {
          DEFAULT: '#FFFFFF',
          neutral: '#F7F7F5',
          subtle: '#F1F1EE',
          border: '#E4E4E7',
          text: '#0B0B0C',
          soft: '#52525B'
        },
        accent: {
          DEFAULT: 'var(--accent-color, #A3E635)',
          hover: 'var(--accent-hover, #BEF264)',
          text: 'var(--accent-text, #0B0B0C)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"General Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
