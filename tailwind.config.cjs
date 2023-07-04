/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3'
      },
      fontFamily: {
        sans: ['Proxima Nova', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        card: '#fff',
        background: '#E2DFDE',
        text: {
          100: '#4C4138',
          200: '#9A8975'
        },
        action: {
          100: '#FFCE99',
          400: '#F98600',
          500: '#E07400'
        },
        detail: {
          100: '#B9A9A6',
          200: '#B1A29E',
          300: '#A59794'
        },
        fig: {
          100: '#cec2b9',
          200: '#c5bab0',
          300: '#b8aea4'
        },
        green: {
          100: '#F3F7F6',
          200: '#DAE7E3',
          300: '#C1D7D0',
          400: '#77A697',
          500: '#6B9E8F',
          600: '#59887A',
          700: '#406358'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/container-queries')]
};