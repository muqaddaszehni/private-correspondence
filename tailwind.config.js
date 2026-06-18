/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0E1B2E',
        ink: '#1C1C1C',
        ivory: '#F7F4EE',
        bone: '#FBF9F4',
        brass: '#B0904F',
        'brass-deep': '#8C7038',
        hairline: '#D8D2C6',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        tc: ['"Noto Serif TC"', '"Cormorant Garamond"', 'serif'],
        sc: ['"Noto Serif SC"', '"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        label: '0.22em',
        wordmark: '0.14em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,27,46,0.04), 0 18px 40px -28px rgba(14,27,46,0.28)',
        lift: '0 2px 4px rgba(14,27,46,0.06), 0 26px 60px -32px rgba(14,27,46,0.40)',
      },
      maxWidth: {
        page: '1360px',
      },
    },
  },
  plugins: [],
}
