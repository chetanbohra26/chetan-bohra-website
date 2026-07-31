import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginReactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default [
	{ ignores: ['dist'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReactConfig,
	pluginReactJsxRuntime,
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
