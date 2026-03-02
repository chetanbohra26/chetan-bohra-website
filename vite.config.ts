import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Converts the emitted <link rel="stylesheet"> to a non-render-blocking preload.
// A minimal inline <style> in index.html covers above-fold critical CSS so
// there is no flash of unstyled content while the full stylesheet loads async.
function deferStylesheets(): Plugin {
	return {
		name: 'defer-stylesheets',
		apply: 'build',
		transformIndexHtml(html: string) {
			return html.replace(
				/<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
				(_, href) =>
					`<link rel="preload" as="style" crossorigin href="${href}" onload="this.rel='stylesheet'">` +
					`<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`,
			);
		},
	};
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), deferStylesheets()],
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
					utils: [
						'clsx',
						'tailwind-merge',
						'class-variance-authority',
					],
					icons: ['lucide-react'],
					calendly: ['react-calendly'],
					analytics: ['@vercel/analytics'],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
	},
});
