/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'caudo-primary': '#0A2647',
        'caudo-accent': '#00C9A7',
        'caudo-bg': '#F8FAFC',
        'caudo-dark': '#051830',
        'caudo-light': '#144272',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-caudo': 'linear-gradient(135deg, #0A2647 0%, #144272 100%)',
      },
    },
  },
  plugins: [],
}
