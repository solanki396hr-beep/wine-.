/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          50: '#fbf4f5',
          100: '#f7e7e9',
          200: '#f0d2d7',
          300: '#e2afb8',
          400: '#d08191',
          500: '#b8566b',
          600: '#9e3a51',
          700: '#832a3f',
          800: '#6f2436',
          900: '#4a0e17',
          950: '#2c060d',
        },
        gold: {
          50: '#fdfbf2',
          100: '#fbf5df',
          200: '#f5e7b8',
          300: '#edd487',
          400: '#e2ba52',
          500: '#d4af37',
          600: '#b88d27',
          700: '#926a20',
          800: '#785420',
          900: '#66451f',
          950: '#3c250c',
        },
        cellar: {
          800: '#1e1a20',
          900: '#141116',
          950: '#0c0a0e',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

