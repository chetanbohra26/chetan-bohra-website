import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default [
	{ ignores: ['dist'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	{
		plugins: {
			'react-hooks': pluginReactHooks,
			'react-refresh': pluginReactRefresh,
		},
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
	},
	{
		settings: {
			react: { version: 'detect' },
		},
	},
	{
		files: ['*.config.js', '*.config.ts', '*.config.cjs', '.lighthouserc.cjs'],
		languageOptions: { globals: globals.node },
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
];
