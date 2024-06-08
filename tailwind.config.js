/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
      './phase-*/**/*.{html,js}',
      './pages/**/*.{html,js}',
      './src/**/*.{html,js}',
      './components/**/*.{html,js}'

  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

