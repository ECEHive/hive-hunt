// @ts-check
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
	{
		ignores: ["dist", "bun.lock", "node_modules"],
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2023,
			sourceType: "module",
			parser: tsParser,
			globals: {
				window: "readonly",
				document: "readonly",
				localStorage: "readonly",
				console: "readonly",
				performance: "readonly",
				process: "readonly",
				Bun: "readonly",
				setInterval: "readonly",
				clearInterval: "readonly",
				URLSearchParams: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			react,
			"react-hooks": reactHooks,
			"jsx-a11y": jsxA11y,
		},
		settings: { react: { version: "detect" } },
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			// allow unused prop names when they are documented (like clueId monitored by effect)
			"no-unused-vars": "off",
		},
	},
	{
		files: ["tests/**/*.ts"],
		languageOptions: {
			globals: {
				test: "readonly",
				expect: "readonly",
			},
		},
	},
	{
		files: ["src/hooks/game-state.ts"],
		rules: {
			"@typescript-eslint/no-unused-vars": ["off"],
		},
	},
];
