import { defineConfig } from 'eslint/config';
import css from '@eslint/css';
import noStateAttributeSelectors from '../rules/no-state-attribute-selectors.js';
import noHardcodedPx from '../rules/no-hardcoded-px.js';

const files = ['**/*.css'];
const elementCssFiles = ['**/src/**/element.css'];
const blueprintPlugin = {
  rules: {
    'no-state-attribute-selectors': noStateAttributeSelectors,
    'no-hardcoded-px': noHardcodedPx
  }
};
const ignores = [
  '**/dist/**',
  '**/node-modules/**',
  '**/.coverage/**',
  '**/.performance/**',
  '**/.drafter/**',
  '**/.wireit/**',
  '**/icons/src/shapes/**',
  '**/_site/**'
];

export default defineConfig([
  {
    files,
    ignores,
    language: 'css/css',
    plugins: { css },
    extends: ['css/recommended'],
    rules: {
      ...css.configs.recommended.rules,
      'css/no-invalid-properties': 'off',
      'css/no-important': 'off',
      'css/use-baseline': 'off',
      'css/font-family-fallbacks': 'off'
    }
  },
  {
    files: elementCssFiles,
    ignores,
    language: 'css/css',
    plugins: { css, blueprint: blueprintPlugin },
    rules: {
      'blueprint/no-state-attribute-selectors': 'error',
      'blueprint/no-hardcoded-px': 'warn' // todo
    }
  }
]);
