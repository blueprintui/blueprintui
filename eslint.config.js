import rulesDirPlugin from 'eslint-plugin-rulesdir';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import wcPlugin from 'eslint-plugin-wc';
import litPlugin from 'eslint-plugin-lit';
import litA11yPlugin from 'eslint-plugin-lit-a11y';
import prettierPlugin from 'eslint-config-prettier';

rulesDirPlugin.RULES_DIR = ['./eslint'];

const source = ['**/**/*.ts', '**/src/*.d.ts'];
const tests = ['**/**/*.spec.ts'];
const ignores = ['**/dist/**', '**/_site/**', '**/node-modules/**', '**/dist/**', '**/coverage/*', '**/.wireit/**'];

export default [
  {
    files: [...source, ...tests],
    ignores: [...ignores],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'lit-a11y': litA11yPlugin,
      lit: litPlugin,
      rulesdir: rulesDirPlugin,
      wc: wcPlugin,
      prettier: prettierPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...litA11yPlugin.configs.recommended.rules,
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
      'lit-a11y/no-aria-slot': 'off', // check if valid
      curly: 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'no-irregular-whitespace': ['error', { skipTemplates: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'Demo|Test', argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/no-unsafe-declaration-merging': 'off', // enable
      '@typescript-eslint/ban-types': [
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
      '@typescript-eslint/no-unused-expressions': 'off', // icons???
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
  },
  {
    files: ['**/*.spec.ts', '**/test/*.ts'],
    ignores: [...ignores],
    plugins: {
      'lit-a11y': litA11yPlugin,
      lit: litPlugin
    },
    rules: {
      'rulesdir/no-unknown-event-names': 'off',
      'lit/prefer-static-styles': 'off'
    }
  }
];
