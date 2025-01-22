export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        greyBg: '#f4f7f8',
        greyColor: '#f47775',
        sunnyBg: '#f7e9b9',
        sunnyColor: '#2a5510',
        wetBg: '#a3def7',
        wetColor: '#164a68',
        snowBg: '#c3e9f6',
        snowColor: '#848ff0',
        defaultBg: '#91c8af',
        defaultColor: '#31326f',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans'],
      },
      animation: {
        scale: 'scale 4000ms ease-in-out alternate infinite',
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.2)' },
        },
      },
      transformOrigin: {
        'left-top': 'left top',
      },
    },
  },
  plugins: [],
};
