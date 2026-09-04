/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka"', 'ui-rounded', 'sans-serif'],
        body: ['"Nunito"', 'sans-serif'],
      },
      colors: {
        blush: {
          50: '#FFF6F8',
          100: '#FFE9EF',
          200: '#FFD3E0',
          300: '#FFB0C7',
          400: '#FF87A8',
          500: '#FF5D8B',
          600: '#F13E70',
        },
        lilac: {
          100: '#F3E8FF',
          200: '#E2CCFB',
          300: '#CBA6F5',
          400: '#B084E8',
          500: '#8F5FD1',
        },
        plum: {
          700: '#4A2545',
          800: '#3A1B38',
          900: '#2B1229',
        },
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(174, 68, 118, 0.25)',
        card: '0 20px 60px -15px rgba(122, 46, 96, 0.35)',
      },
      backgroundImage: {
        'blush-gradient': 'radial-gradient(120% 120% at 50% 0%, #FFE9EF 0%, #FFD3E0 45%, #E2CCFB 100%)',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(-110vh) translateX(var(--drift, 20px))', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        floatUp: 'floatUp linear infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
