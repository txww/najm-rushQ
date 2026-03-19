/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        'brand-primary': '#1a365d',
        'brand-secondary': '#2d3748',
        'brand-accent': '#ffd700',
        'brand-success': '#16A34A',
        'brand-warning': '#D97706',
        'brand-error': '#DC2626',
      },
      opacity: {
        85: '0.85',
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
