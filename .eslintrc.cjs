const rulesDirPlugin = require('eslint-plugin-rulesdir');
rulesDirPlugin.RULES_DIR = ['./eslint'];

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
    'plugin:wc/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'lit', 'lit-a11y', 'eslint-plugin-wc', 'rulesdir'],
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
    'lit-a11y/no-aria-slot': 'off', // check if valid
    curly: 'error',
    eqeqeq: 'error',
    'no-var': 'error',
    'no-irregular-whitespace': ['error', { skipTemplates: true }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'Demo|Test' }],
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
  },
  overrides: [
    {
      files: ['**/*.spec.ts', '**/test/*.ts'],
      rules: {
        'rulesdir/no-unknown-event-names': 'off',
        'lit/prefer-static-styles': 'off'
      }
    }
  ]
};
