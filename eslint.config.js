import { configs as litConfigs } from 'eslint-plugin-lit';
import { configs as wcConfigs } from 'eslint-plugin-wc';
import litA11yPlugin, { rules } from 'eslint-plugin-lit-a11y';
import typescriptParser from '@typescript-eslint/parser';
import rulesDirPlugin from 'eslint-plugin-rulesdir';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

const source = ['**/**/*.ts', '**/src/*.d.ts'];
const tests = ['**/**/*.spec.ts'];
const files = [...source, ...tests];
const ignores = [
  '**/dist/**',
  '**/_site/**',
  '**/node-modules/**',
  '**/.coverage/**',
  '**/.performance/**',
  '**/.drafter/**',
  '**/.wireit/**',
  '**/icons/src/shapes/**'
];

const languageOptions = {
  parser: typescriptParser,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  }
};

rulesDirPlugin.RULES_DIR = ['./internals/eslint'];

const eslintConfig = {
  languageOptions,
  files,
  ignores,
  rules: {
    curly: 'error',
    eqeqeq: 'error',
    'no-var': 'error',
    'no-irregular-whitespace': ['error', { skipTemplates: true }]
  }
};

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

const litA11yConfig = {
  plugins: {
    'lit-a11y': litA11yPlugin
  },
  languageOptions,
  files,
  ignores
};

const rulesdirConfig = {
  plugins: {
    rulesdir: rulesDirPlugin
  },
  languageOptions,
  files,
  ignores,
  rules: {
    'rulesdir/no-reserved-property-names': 'error',
    'rulesdir/no-invalid-event-names': 'error',
    'rulesdir/no-reserved-event-names': 'error',
    'rulesdir/no-stateful-properties': ['error', { exclude: ['value'] }],
    'rulesdir/no-complex-properties': ['error', { exclude: ['i18n'] }],
    'rulesdir/no-unknown-event-names': [
      'error',
      {
        include: [
          'bp-touchstart',
          'bp-touchmove',
          'bp-touchend',
          'bp-keychange',
          'bp-slotchange',
          'bp-textchange',
          'resize-layout',
          'resize-input',
          'size',
          'open',
          'close'
        ]
      }
    ]
  }
};

const wcConfig = {
  ...wcConfigs['flat/recommended'],
  languageOptions,
  files,
  ignores
};

const prettierConfig = {
  ...eslintConfigPrettier,
  languageOptions,
  files,
  ignores
};

const typescriptConfig = {
  languageOptions,
  files,
  ignores,
  plugins: {
    '@typescript-eslint': typescriptPlugin
  },
  rules: {
    ...typescriptPlugin.configs.recommended.rules,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'Demo|Test', argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/no-unsafe-declaration-merging': 'off', // enable
    '@typescript-eslint/no-wrapper-object-types': 'error',
    '@typescript-eslint/no-unsafe-function-type': 'error',
    '@typescript-eslint/no-empty-object-type': 'error',
    '@typescript-eslint/no-restricted-types': [
      'error',
      {
        types: {
          Array: 'use [] instead.',
          Object: 'use {} instead.',
          Boolean: 'use `boolean` instead.',
          Number: 'use `number` instead.',
          String: 'use `string` instead.'
        }
      }
    ],
    '@typescript-eslint/no-unused-expressions': 'off' // icons???
  }
};

const litTestingConfig = {
  ...litConfigs['flat/recommended'],
  languageOptions,
  files: ['**/*.spec.ts', '**/test/*.ts'],
  ignores,
  rules: {
    'rulesdir/no-unknown-event-names': 'off',
    'lit/prefer-static-styles': 'off'
  }
};

export default [
  eslintConfig,
  litConfig,
  litA11yConfig,
  rulesdirConfig,
  wcConfig,
  prettierConfig,
  typescriptConfig,
  litTestingConfig
];
