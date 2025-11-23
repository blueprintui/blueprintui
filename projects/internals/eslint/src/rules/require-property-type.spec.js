import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import rule from './require-property-type.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
});

describe('require-property-type', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('require-property-type', rule, {
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
              @property({ type: Number, reflect: true }) accessor count = 0;
            }
          `
        },
        {
          code: `
            class MyElement {
              @property({ type: Object }) accessor config = {};
            }
          `
        }
      ],
      invalid: [
        {
          code: `
            class MyElement {
              @property() accessor status;
            }
          `,
          errors: [{ message: '@property decorator should specify type for proper attribute conversion (e.g., { type: String })' }]
        },
        {
          code: `
            class MyElement {
              @property({ reflect: true }) accessor status;
            }
          `,
          errors: [{ message: '@property decorator should specify type for proper attribute conversion (e.g., { type: String })' }]
        },
        {
          code: `
            class MyElement {
              @property({ attribute: 'my-status' }) accessor status;
            }
          `,
          errors: [{ message: '@property decorator should specify type for proper attribute conversion (e.g., { type: String })' }]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
