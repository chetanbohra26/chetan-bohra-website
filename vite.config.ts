import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					// Separate vendor chunks for better caching
					vendor: ['react', 'react-dom'],
					radix: [
						'@radix-ui/react-avatar',
						'@radix-ui/react-label',
						'@radix-ui/react-separator',
						'@radix-ui/react-slot',
						'@radix-ui/react-tooltip',
					],
					utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
					icons: ['lucide-react'],
					calendly: ['react-calendly'],
					analytics: ['@vercel/analytics'],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
	},
});
