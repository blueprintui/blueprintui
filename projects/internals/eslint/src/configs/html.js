import eslintHTML from '@html-eslint/eslint-plugin';
import eslintHTMLParser from '@html-eslint/parser';

const source = ['**/*.html', '**/*.js'];
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

/** @type {import('eslint').Linter.Config} */
const htmlConfig = {
  files: [...source],
  ignores,
  languageOptions: {
    parser: eslintHTMLParser,
    parserOptions: {
      parser: 'html'
    }
  },
  plugins: {
    html: eslintHTML
  },
  rules: {
    ...eslintHTML.configs.recommended.rules,
    'html/require-lang': 'off',
    'html/require-doctype': 'off',
    'html/require-title': 'off',
    'html/no-extra-spacing-attrs': 'off',
    'html/indent': 'off',
    'html/attrs-newline': 'off',
    'html/element-newline': 'off',
    'html/use-baseline': 'off',
    'html/require-closing-tags': 'off',
    'html/no-duplicate-attrs': 'off',
    'html/quotes': 'off',
    'html/no-duplicate-id': 'off'
  }
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores
  },
  htmlConfig
];
