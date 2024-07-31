/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        stardom: ['stardom', 'sans'],
        satoshi: ['satoshi', 'sans'],
      },
    },
  },
  plugins: [],
}
