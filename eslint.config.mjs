import { defineConfig } from '@trenaryja/config/eslint'

export default [
	...defineConfig(),
	{
		// Pages Router page files assemble a whole route (hero + sections + footer),
		// so they're large aggregators by convention, not tangled control flow.
		files: ['src/pages/**/*.tsx'],
		rules: { 'max-lines-per-function': 'off', complexity: 'off' },
	},
	{
		// The standard `declare global { namespace NodeJS { interface ProcessEnv } }`
		// idiom for typing env vars — namespace is the only way to augment it, and
		// merging into ProcessEnv requires `interface`, so both rules must yield here.
		files: ['src/utils/index.ts'],
		rules: {
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',
		},
	},
	{
		// Notion cursor pagination: each page request needs the prior response's
		// next_cursor, so the awaits are sequential by data dependency.
		files: ['src/utils/server.ts'],
		rules: { 'no-await-in-loop': 'off' },
	},
]
