import typescriptParser from '@typescript-eslint/parser';
import noReservedPropertyNames from '../rules/no-reserved-property-names.js';
import noInvalidEventNames from '../rules/no-invalid-event-names.js';
import noReservedEventNames from '../rules/no-reserved-event-names.js';
import noStatefulProperties from '../rules/no-stateful-properties.js';
import noComplexProperties from '../rules/no-complex-properties.js';
import noUnknownEventNames from '../rules/no-unknown-event-names.js';
// New rules
import requireAccessorKeyword from '../rules/require-accessor-keyword.js';
import noReflectStateProperties from '../rules/no-reflect-state-properties.js';
import noStatefulEventEmission from '../rules/no-stateful-event-emission.js';
import noEventVerbPrefix from '../rules/no-event-verb-prefix.js';
import requirePropertyType from '../rules/require-property-type.js';
import requireVisualPropertyReflect from '../rules/require-visual-property-reflect.js';
import controllerDecoratorNaming from '../rules/controller-decorator-naming.js';
import requirePartInternal from '../rules/require-part-internal.js';
import ariaLabelI18n from '../rules/aria-label-i18n.js';

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
    ignores
  },
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
          // Existing rules
          'no-reserved-property-names': noReservedPropertyNames,
          'no-invalid-event-names': noInvalidEventNames,
          'no-reserved-event-names': noReservedEventNames,
          'no-stateful-properties': noStatefulProperties,
          'no-complex-properties': noComplexProperties,
          'no-unknown-event-names': noUnknownEventNames,
          // New rules
          'require-accessor-keyword': requireAccessorKeyword,
          'no-reflect-state-properties': noReflectStateProperties,
          'no-stateful-event-emission': noStatefulEventEmission,
          'no-event-verb-prefix': noEventVerbPrefix,
          'require-property-type': requirePropertyType,
          'require-visual-property-reflect': requireVisualPropertyReflect,
          'controller-decorator-naming': controllerDecoratorNaming,
          'require-part-internal': requirePartInternal,
          'aria-label-i18n': ariaLabelI18n
        }
      }
    },
    rules: {
      // Existing rules - errors
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
            'bp-virtual-change',
            'bp-virtual-scroll',
            'resize-layout',
            'resize-input',
            'size',
            'open',
            'close',
            'complete',
            'copy'
          ]
        }
      ],
      // New rules - high priority (errors)
      'rules/require-accessor-keyword': 'error',
      'rules/no-reflect-state-properties': 'error',
      'rules/no-stateful-event-emission': 'error',
      'rules/aria-label-i18n': 'error',
      // New rules - medium priority (warnings)
      'rules/no-event-verb-prefix': 'warn',
      'rules/require-property-type': 'warn',
      'rules/require-visual-property-reflect': 'warn',
      'rules/controller-decorator-naming': 'warn',
      'rules/require-part-internal': 'warn'
    }
  }
];
