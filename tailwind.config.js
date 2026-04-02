/** @type {import('tailwindcss').Config} */
export default {
  // Enable dark mode via class on <html>
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent — teal/cyan matching Zorvyn
        accent: {
          DEFAULT: '#06b6d4',
          dark:    '#0891b2',
        },
        // Custom dark backgrounds
        dark: {
          900: '#0a0f1a',
          800: '#111827',
          700: '#1e293b',
          600: '#334155',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
