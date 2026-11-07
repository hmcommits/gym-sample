/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html,astro}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: '#CCFF00',
          hover: '#D4F933',
          dark: '#A6D300',
          dim: 'rgba(204, 255, 0, 0.12)',
          border: 'rgba(204, 255, 0, 0.35)',
        },
        dark: {
          950: '#070709',
          900: '#0E0E12',
          850: '#141419',
          800: '#1B1B22',
          700: '#262630',
          600: '#3A3A46',
        }
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'Oswald', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 25px rgba(204, 255, 0, 0.35)',
        'neon-sm': '0 0 12px rgba(204, 255, 0, 0.25)',
        'neon-lg': '0 0 45px rgba(204, 255, 0, 0.5)',
        'neon-pill': '0 8px 30px rgba(204, 255, 0, 0.3)',
      },
      letterSpacing: {
        'widest-athletic': '0.18em',
      }
    },
  },
  plugins: [],
}
