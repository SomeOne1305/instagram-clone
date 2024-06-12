/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
				screens: {
					sm: '100%',
					md: '748px',
					lg: '1004px',
					xl: '1200px',
					'2xl': '1440px',
					'3xl': '1440px',
				},
			},
			screens: {
				xs: '400px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
			},
			colors: {
				light: '#fefefe',
				dark: '#060707',
			},
			fontFamily: {
				satisfy: '"Satisfy", cursive',
				lobster: '"Lobster", sans-serif',
			},
		},
	},
	plugins: [],
}
