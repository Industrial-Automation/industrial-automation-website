const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      320: '320px',
      600: '600px',
      960: '960px',
      1280: '1280px',
      1920: '1920px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      main: {
        red: '#FF0000',
        white: '#FFF',
        gold: '#FFC43F',
        orange: '#FFA500',
        purple: '#D93FFF',
        gray: '#8D9093',
        black: '#1F1F1F'
      }
    },
    fontFamily: {
      arsenal: ['Arsenal', ...defaultTheme.fontFamily.sans],
      lato: ['Lato', ...defaultTheme.fontFamily.sans],
      jost: ['Jost', ...defaultTheme.fontFamily.sans],
      josefin: ['Josefin Sans', ...defaultTheme.fontFamily.sans]
    },
    extend: {}
  },
  plugins: []
};
