import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.jest } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
