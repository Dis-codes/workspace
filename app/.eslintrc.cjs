module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:svelte/recommended",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"]
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser"
			}
		}
	],
	rules: {
		semi: [1, "always"],
		quotes: [1, "double", "avoid-escape"],
		curly: [1, "multi-line"],
		"space-before-function-paren": [2, "never"],
		"@typescript-eslint/semi": [1, "always"],
		"@typescript-eslint/quotes": [1, "double", "avoid-escape"],
		"@typescript-eslint/space-before-function-paren": [2, "never"],
		"no-use-before-define": 0,
		"no-unused-vars": 0,
		"@typescript-eslint/no-use-before-define": 2,
		"@typescript-eslint/no-unused-vars": 2,
		"prefer-arrow-callback": 1,
		"prefer-template": 1,
		"@typescript-eslint/strict-boolean-expressions": 0,
		"@typescript-eslint/no-for-in-array": 0,
		"@typescript-eslint/no-confusing-void-expression": 0,
		"@typescript-eslint/no-non-null-assertion": 0,
		"@typescript-eslint/no-unsafe-argument": 0,
		"spaced-comment": 0
	}
};
