/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        duo: {
          green:    '#58CC02',
          'green-dark': '#46A302',
          yellow:   '#FFC800',
          blue:     '#1CB0F6',
          red:      '#FF4B4B',
          bg:       '#F7F7F7',
          card:     '#FFFFFF',
          border:   '#E5E5E5',
          text:     '#3C3C3C',
          muted:    '#777777',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
