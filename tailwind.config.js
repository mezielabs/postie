/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/views/**/*.edge', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
}
