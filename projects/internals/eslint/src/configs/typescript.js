import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const files = ['**/*.{js,mjs,cjs,ts,tsx}'];
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
  { ignores },
  { ...eslint.configs.recommended, files },
  tseslint.configs.strict,
  {
    ignores,
    rules: {
      // todo: fix these rules
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      'no-extra-boolean-cast': 'off',
      'no-dupe-keys': 'off',
      'no-undef': 'off',
      'prefer-const': 'off',
      'no-case-declarations': 'off',
      'no-loss-of-precision': 'off'
    }
  }
]);
