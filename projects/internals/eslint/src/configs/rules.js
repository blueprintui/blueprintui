import typescriptParser from '@typescript-eslint/parser';
import noReservedPropertyNames from '../rules/no-reserved-property-names.js';
import noInvalidEventNames from '../rules/no-invalid-event-names.js';
import noReservedEventNames from '../rules/no-reserved-event-names.js';
import noStatefulProperties from '../rules/no-stateful-properties.js';
import noComplexProperties from '../rules/no-complex-properties.js';
import noUnknownEventNames from '../rules/no-unknown-event-names.js';

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

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    files,
    ignores,
    plugins: {
      rules: {
        rules: {
          'no-reserved-property-names': noReservedPropertyNames,
          'no-invalid-event-names': noInvalidEventNames,
          'no-reserved-event-names': noReservedEventNames,
          'no-stateful-properties': noStatefulProperties,
          'no-complex-properties': noComplexProperties,
          'no-unknown-event-names': noUnknownEventNames
        }
      }
    },
    rules: {
      'rules/no-reserved-property-names': 'error',
      'rules/no-invalid-event-names': 'error',
      'rules/no-reserved-event-names': 'error',
      'rules/no-stateful-properties': ['error', { exclude: ['value'] }],
      'rules/no-complex-properties': ['error', { exclude: ['i18n'] }],
      'rules/no-unknown-event-names': [
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
  }
];
