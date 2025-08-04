/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [('@tailwindcss/line-clamp')],
}



// module.exports = {
//   content: [
//     "./src/**/*.{html,js,jsx,ts,tsx}", // Update based on your folder structure
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

