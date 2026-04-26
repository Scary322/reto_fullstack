/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'page-bg',
    'card-bg',
    'text-primary',
    'text-secondary',
    'btn-dna',
    'btn-secondary',
    'input-dna',
    'border-brand',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}