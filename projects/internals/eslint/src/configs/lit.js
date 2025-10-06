import { configs as litConfigs } from 'eslint-plugin-lit';
import { configs as wcConfigs } from 'eslint-plugin-wc';
import litA11yPlugin from 'eslint-plugin-lit-a11y';
import typescriptParser from '@typescript-eslint/parser';

const source = ['**/src/**/*.ts', '**/src/*.d.ts'];
const tests = ['**/src/**/*.spec.ts'];
const files = [...source, ...tests];
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

const languageOptions = {
  parser: typescriptParser,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  }
};

/** @type {import('eslint').Linter.Config} */
const litConfig = {
  ...litConfigs['flat/recommended'],
  languageOptions,
  files,
  ignores,
  rules: {
    'lit/attribute-value-entities': 'error',
    'lit/binding-positions': 'error',
    'lit/no-duplicate-template-bindings': 'error',
    'lit/no-invalid-escape-sequences': 'error',
    'lit/no-invalid-html': 'error',
    'lit/no-legacy-imports': 'error',
    'lit/no-legacy-template-syntax': 'error',
    'lit/no-native-attributes': 'error',
    'lit/no-private-properties': 'error',
    'lit/no-property-change-update': 'error',
    'lit/no-template-arrow': 'error',
    'lit/no-template-bind': 'error',
    'lit/no-this-assign-in-render': 'error',
    'lit/no-useless-template-literals': 'error',
    'lit/no-value-attribute': 'error',
    'lit/prefer-nothing': 'error',
    'lit/prefer-static-styles': 'error',
    'lit/quoted-expressions': 'error',
    'lit/value-after-constraints': 'error',
    'lit-a11y/no-aria-slot': 'off' // check if valid
  }
};

/** @type {import('eslint').Linter.Config} */
const litA11yConfig = {
  plugins: {
    'lit-a11y': litA11yPlugin
  },
  languageOptions,
  files,
  ignores
};

/** @type {import('eslint').Linter.Config} */
const wcConfig = {
  ...wcConfigs['flat/recommended'],
  languageOptions,
  files,
  ignores
};

/** @type {import('eslint').Linter.Config} */
const litTestingConfig = {
  ...litConfigs['flat/recommended'],
  languageOptions,
  files: ['**/*.spec.ts', '**/test/*.ts'],
  ignores,
  rules: {
    'lit/prefer-static-styles': 'off'
  }
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores
  },
  litConfig,
  litA11yConfig,
  wcConfig,
  litTestingConfig
];
