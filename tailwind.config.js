/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  	"./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
		colors: {
			rose: {
				DEFAULT: '#ba005c',
				'50': '#fcedf1',
				'100': '#f9d6e3',
				'600': '#ac004f',
				'700': '#9e0047'
			  },
		}
	},
  },
  plugins: [],
}

