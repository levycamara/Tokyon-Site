
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'tokyon-black': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'tokyon-gray': '#1f1f1f',
        'tokyon-orange': '#FF4500',
        'tokyon-orangeHover': '#FF5714',
        'tokyon-dark': '#0a0a0a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        mono: ['monospace'],
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'shutter-in': 'shutterIn 0.8s cubic-bezier(0.87, 0, 0.13, 1) forwards',
        'shutter-out': 'shutterOut 0.8s cubic-bezier(0.87, 0, 0.13, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shutterIn: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        shutterOut: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
