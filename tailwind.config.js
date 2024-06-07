/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
      './phase-*/*.html',
      './pages/**/*.html',
      './src/**/*.{html,js}',
      './index.html',
      './phase-1/**/index.html',
      './phase-2/**/index.html',
      './phase-3/**/index.html',
      './phase-4/**/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

