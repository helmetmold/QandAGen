/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        'CC-blue': '#28B9EB',
        'CC-orange': '#FF7610',
        'CC-red': '#F43B3B',
        'CC-green': '#53CC3E',
        'CC-yellow': '#F4CA19',
        'CC-purple': '#B554E8'
      },


    },
  },
  plugins: [],
}
