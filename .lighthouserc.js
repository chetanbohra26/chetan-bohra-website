module.exports = {
	ci: {
		collect: {
			// LHCI serves ./dist directly — no separate server needed
			staticDistDir: './dist',
			numberOfRuns: 3,
		},
		assert: {
			assertions: {
				// Hard limits: CI fails if these are breached
				'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
				'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
				// Soft warnings for tracking trend
				'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
				'categories:performance': ['warn', { minScore: 0.95 }],
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
