import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import rule from './require-accessor-keyword.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
});

describe('require-accessor-keyword', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('require-accessor-keyword', rule, {
      valid: [
        {
          code: `
            class MyElement {
              @property({ type: String }) accessor status;
            }
          `
        },
        {
          code: `
            class MyElement {
              @property({ type: Boolean }) accessor disabled = false;
            }
          `
        },
        {
          code: `
            class MyElement {
              @property({ type: String, reflect: true }) accessor value = '';
            }
          `
        },
        {
          // Non-property decorator should be ignored
          code: `
            class MyElement {
              @state() _internalState;
            }
          `
        }
      ],
      invalid: [
        {
          code: `
            class MyElement {
              @property({ type: String }) status;
            }
          `,
          errors: [{ message: '@property decorator requires the accessor keyword for proper Lit reactivity' }]
        },
        {
          code: `
            class MyElement {
              @property({ type: Boolean }) disabled = false;
            }
          `,
          errors: [{ message: '@property decorator requires the accessor keyword for proper Lit reactivity' }]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
