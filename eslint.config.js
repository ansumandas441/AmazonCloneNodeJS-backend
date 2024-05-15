import globals from "globals";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-node";
import promisePlugin from "eslint-plugin-promise";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: {
      globals: globals.node,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'import': importPlugin,
      'node': nodePlugin,
      'promise': promisePlugin,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Import plugin rules
      'import/no-unresolved': 'error',
      'import/order': ['error', {
        'groups': [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      }],

      // Node.js plugin rules
      'node/no-missing-require': 'error',
      'node/no-unpublished-require': 'error',
      'node/no-deprecated-api': 'warn',

      // Promise plugin rules
      'promise/always-return': 'warn',
      'promise/catch-or-return': 'warn',

      // General JS/TS rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'consistent-return': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
