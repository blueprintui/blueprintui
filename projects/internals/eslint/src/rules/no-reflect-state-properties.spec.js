import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import rule from './no-reflect-state-properties.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
});

describe('no-reflect-state-properties', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('no-reflect-state-properties', rule, {
      valid: [
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
              @property({ type: Boolean }) accessor readonly = false;
            }
          `
        },
        {
          code: `
            class MyElement {
              @property({ type: Boolean }) accessor checked;
            }
          `
        },
        {
          // Visual properties CAN reflect
          code: `
            class MyElement {
              @property({ type: String, reflect: true }) accessor status;
            }
          `
        },
        {
          // Excluded property
          code: `
            class MyElement {
              @property({ type: Boolean, reflect: true }) accessor disabled = false;
            }
          `,
          options: [{ exclude: ['disabled'] }]
        }
      ],
      invalid: [
        {
          code: `
            class MyElement {
              @property({ type: Boolean, reflect: true }) accessor disabled = false;
            }
          `,
          errors: [
            {
              message:
                "'disabled' is managed by ElementInternals and should not use reflect: true. Use Custom States API instead."
            }
          ]
        },
        {
          code: `
            class MyElement {
              @property({ type: Boolean, reflect: true }) accessor readonly = false;
            }
          `,
          errors: [
            {
              message:
                "'readonly' is managed by ElementInternals and should not use reflect: true. Use Custom States API instead."
            }
          ]
        },
        {
          code: `
            class MyElement {
              @property({ type: Boolean, reflect: true }) accessor checked;
            }
          `,
          errors: [
            {
              message:
                "'checked' is managed by ElementInternals and should not use reflect: true. Use Custom States API instead."
            }
          ]
        },
        {
          code: `
            class MyElement {
              @property({ type: Boolean, reflect: true }) accessor selected = false;
            }
          `,
          errors: [
            {
              message:
                "'selected' is managed by ElementInternals and should not use reflect: true. Use Custom States API instead."
            }
          ]
        },
        {
          code: `
            class MyElement {
              @property({ type: Boolean, reflect: true }) accessor expanded = false;
            }
          `,
          errors: [
            {
              message:
                "'expanded' is managed by ElementInternals and should not use reflect: true. Use Custom States API instead."
            }
          ]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
