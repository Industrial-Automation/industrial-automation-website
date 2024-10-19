const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
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
        black: '#1F1F1F',
        skyblue: '#6BCAED',
        midnight: '#020A13'
      },
      subtone: {
        white: {
          1: '#F5F5F5'
        },
        gray: {
          1: '#EEEEEE',
          2: '#E0E0E0',
          3: '#D8D8D8'
        },
        skyblue: {
          1: '#5bb3d6',
          2: '#8be3fd'
        },
        black: {
          1: '#000000B3',
          2: '#151515',
          3: '#1B1D21',
          4: '#232529',
          5: '#2C2E31'
        }
      }
    },
    fontFamily: {
      lato: ['Lato', ...defaultTheme.fontFamily.sans],
      josefin: ['Josefin Sans', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      boxShadow: {
        skyblue: '0px 0px 25px 0px rgba(29, 155, 217, 1)',
        gray: '0px 0px 4px 2px rgba(0, 0, 0, 0.15)'
      },
      backgroundImage: {
        'main-bg': "url('src/assets/images/main-bg.png')"
      }
    }
  },
  plugins: []
};
