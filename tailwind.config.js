/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00aaff',
        dark: {
          100: '#e0e0e0',
          200: '#ccc',
          800: '#1a1a2e',
          900: '#0a0a0a',
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'float-orb': 'floatOrb 15s infinite ease-in-out',
        'rotate-shapes': 'rotateShapes 30s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        floatOrb: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: '0.6'
          },
          '25%': { 
            transform: 'translateY(-100px) translateX(50px) scale(1.2)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translateY(-50px) translateX(-30px) scale(0.8)',
            opacity: '0.4'
          },
          '75%': { 
            transform: 'translateY(30px) translateX(-50px) scale(1.1)',
            opacity: '0.7'
          },
        },
        rotateShapes: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      }
    },
  },
  plugins: [],
}
