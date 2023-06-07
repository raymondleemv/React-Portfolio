import { defineConfig } from 'cypress';

export default defineConfig({
	video: false,

	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},

	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
		specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
	},
});
