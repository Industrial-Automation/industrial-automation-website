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
        skyblue: '#6BCAED'
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
        }
      }
    },
    fontFamily: {
      lato: ['Lato', ...defaultTheme.fontFamily.sans],
      josefin: ['Josefin Sans', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      backgroundImage: {
        'main-bg': "url('src/assets/images/main-bg.png')"
      }
    }
  },
  plugins: []
};
