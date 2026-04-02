/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f1f5ed',
          100: '#E4EAE7',
          200: '#D5DFD8',
          300: '#BCC6C0',
          400: '#A9B2AC',
          500: '#969F95', // Exact from site
          600: '#7E877D',
          700: '#626961',
          800: '#484D47',
          900: '#2E322D',
        },
        lavender: {
           100: '#F5F7FF',
           200: '#E7E4FE',
           300: '#C5C5FF', // Exact from site
           400: '#A59BFA',
           500: '#8B2DF5',
        },
        charcoal: '#292627', // Exact from site
        gold: {
          300: '#d7b7fb',
          400: '#d49341', // Exact from site
          500: '#ae3e09', 
        },
        cream: '#f1f0ef', // Exact from site
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Avenir', 'Montserrat', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
