module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#355FE5',
        secondary: '#292D41',
        basic: '#F5F5F5'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};