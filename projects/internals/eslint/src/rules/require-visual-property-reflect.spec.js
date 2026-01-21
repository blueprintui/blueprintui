import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import rule from './require-visual-property-reflect.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
});

describe('require-visual-property-reflect', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('require-visual-property-reflect', rule, {
      valid: [
        {
          code: `
            class MyElement {
              @property({ type: String, reflect: true }) accessor status;
            }
          `
        },
        {
          code: `
            class MyElement {
              @property({ type: String, reflect: true }) accessor action;
            }
          `
        },
        {
          code: `
            class MyElement {
              @property({ type: String, reflect: true }) accessor size;
            }
          `
        },
        {
          // Non-visual property doesn't need reflect
          code: `
            class MyElement {
              @property({ type: String }) accessor value;
            }
          `
        },
        {
          // Excluded property
          code: `
            class MyElement {
              @property({ type: String }) accessor status;
            }
          `,
          options: [{ exclude: ['status'] }]
        },
        {
          // Custom visual property with reflect
          code: `
            class MyElement {
              @property({ type: String, reflect: true }) accessor theme;
            }
          `,
          options: [{ properties: ['theme'] }]
        }
      ],
      invalid: [
        {
          code: `
            class MyElement {
              @property({ type: String }) accessor status;
            }
          `,
          errors: [
            {
              message:
                "Visual property 'status' should use reflect: true for CSS selector styling (e.g., [status='value'])"
            }
          ]
        },
        {
          code: `
            class MyElement {
              @property({ type: String }) accessor action;
            }
          `,
          errors: [
            {
              message:
                "Visual property 'action' should use reflect: true for CSS selector styling (e.g., [action='value'])"
            }
          ]
        },
        {
          code: `
            class MyElement {
              @property({ type: String }) accessor size;
            }
          `,
          errors: [
            {
              message: "Visual property 'size' should use reflect: true for CSS selector styling (e.g., [size='value'])"
            }
          ]
        },
        {
          code: `
            class MyElement {
              @property({ type: String }) accessor position;
            }
          `,
          errors: [
            {
              message:
                "Visual property 'position' should use reflect: true for CSS selector styling (e.g., [position='value'])"
            }
          ]
        },
        {
          code: `
            class MyElement {
              @property({ type: String, reflect: false }) accessor orientation;
            }
          `,
          errors: [
            {
              message:
                "Visual property 'orientation' should use reflect: true for CSS selector styling (e.g., [orientation='value'])"
            }
          ]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
