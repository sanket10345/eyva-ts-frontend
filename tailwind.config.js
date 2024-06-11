// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the path to your project structure
  ],
  theme: {
    extend: {
      boxShadow: {
        custom1: '0px 2px 4px -2px #1018280F',
        custom2: '0px 4px 8px -2px #1018281A',
      },
      colors: {
        customBorder: '#EAECF0',
        customBackground: '#FFFFFF',
      },
    },
  },
  plugins: [],
};