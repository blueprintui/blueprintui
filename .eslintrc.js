const rulesDirPlugin = require('eslint-plugin-rulesdir');
rulesDirPlugin.RULES_DIR = ['./eslint-rules'];

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  ignorePatterns: ['**/dist/**', '**/_site/**'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:lit-a11y/recommended',
    'plugin:lit/recommended',
    'plugin:wc/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'lit',
    'lit-a11y',
    'eslint-plugin-wc',
    'rulesdir'
  ],
  rules: {
    curly: 'error',
    eqeqeq: 'error',
    'no-var': 'error',
    'no-irregular-whitespace': ['error', { skipTemplates: true }],
    'rulesdir/reserved-property-names': 'error',
    'rulesdir/reserved-event-names': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'Demo|Test' }],
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/ban-types': ['error', {
      types: {
        Array: 'use [] instead.',
        Object: 'use {} instead.',
        Boolean: 'use `boolean` instead.',
        Number: 'use `number` instead.',
        String: 'use `string` instead.',
      }
    }]
  }
};