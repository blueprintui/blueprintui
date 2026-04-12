import tseslint from 'typescript-eslint';
import noReservedPropertyNames from '../rules/no-reserved-property-names.js';
import noInvalidEventNames from '../rules/no-invalid-event-names.js';
import noReservedEventNames from '../rules/no-reserved-event-names.js';
import noStatefulProperties from '../rules/no-stateful-properties.js';
import noComplexProperties from '../rules/no-complex-properties.js';
import noUnknownEventNames from '../rules/no-unknown-event-names.js';
import requireAccessorKeyword from '../rules/require-accessor-keyword.js';
import noReflectStateProperties from '../rules/no-reflect-state-properties.js';
import noStatefulEventEmission from '../rules/no-stateful-event-emission.js';
import noEventVerbPrefix from '../rules/no-event-verb-prefix.js';
import requirePropertyType from '../rules/require-property-type.js';
import requireVisualPropertyReflect from '../rules/require-visual-property-reflect.js';
import controllerDecoratorNaming from '../rules/controller-decorator-naming.js';
import requirePartInternal from '../rules/require-part-internal.js';
import ariaLabelI18n from '../rules/aria-label-i18n.js';
import requireRelativeImportExtension from '../rules/require-relative-import-extension.js';
import requireExamplesExports from '../rules/require-examples-exports.js';
import requireComponentRegistration from '../rules/require-component-registration.js';

const source = ['**/src/**/*.ts', '**/src/*.d.ts'];
const sourceOnly = ['**/src/**/element.ts', '**/src/**/*.controller.ts'];
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

const allRules = {
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
  'aria-label-i18n': ariaLabelI18n,
  'require-relative-import-extension': requireRelativeImportExtension,
  'require-examples-exports': requireExamplesExports,
  'require-component-registration': requireComponentRegistration
};

// Define plugin once to avoid ESLint "Cannot redefine plugin" error
const rulesPlugin = {
  rules: allRules
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    files,
    ignores,
    plugins: {
      rules: rulesPlugin
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
            'user-invalid',
            'size',
            'open',
            'close',
            'complete',
            'copy'
          ]
        }
      ],
      'rules/require-accessor-keyword': 'error',
      'rules/no-reflect-state-properties': ['error', { exclude: ['selected'] }],
      'rules/no-stateful-event-emission': 'error',
      'rules/no-event-verb-prefix': 'error',
      'rules/require-property-type': 'error',
      'rules/require-visual-property-reflect': 'error',
      'rules/controller-decorator-naming': ['error', { additionalControllers: ['draggableList'] }],
      'rules/require-part-internal': [
        'error',
        {
          exclude: [
            'BpDraggableList',
            'BpDraggableDropzone',
            'BpGridCell',
            'BpGridHeader',
            'BpGridRow',
            'BpCheckbox',
            'BpRadio',
            'BpSwitch',
            'BpKeynavList'
          ]
        }
      ],
      'rules/require-relative-import-extension': 'error'
    }
  },
  {
    files: ['**/*.examples.js'],
    ignores,
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    plugins: {
      rules: rulesPlugin
    },
    rules: {
      'rules/require-examples-exports': 'error'
    }
  },
  // Source-only rules (not applied to tests/performance files)
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    files: sourceOnly,
    ignores: [...ignores, '**/*.spec.ts', '**/*.performance.ts'],
    plugins: {
      rules: rulesPlugin
    },
    rules: {
      // aria-label-i18n only applies to source files, not tests
      'rules/aria-label-i18n': 'error'
    }
  },
  // Component registration rules (only applies to component index.ts files)
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    files: ['**/components/src/*/index.ts'],
    ignores,
    plugins: {
      rules: rulesPlugin
    },
    rules: {
      'rules/require-component-registration': ['error', { exclude: ['internals', 'include', 'i18n'] }]
    }
  }
];
