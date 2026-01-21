import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import rule from './aria-label-i18n.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  }
});

describe('aria-label-i18n', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('aria-label-i18n', rule, {
      valid: [
        {
          // Using template expression with i18n
          code: 'html`<button aria-label=${this.i18n.close}>X</button>`'
        },
        {
          // Using template expression
          code: 'html`<button aria-label=${label}>X</button>`'
        },
        {
          // No aria-label
          code: 'html`<button>Click me</button>`'
        },
        {
          // Non-html tagged template
          code: 'css`button { color: red; }`'
        },
        {
          // Regular string (not tagged template)
          code: 'const x = `aria-label="Close"`'
        }
      ],
      invalid: [
        {
          code: 'html`<button aria-label="Close">X</button>`',
          errors: [{ message: 'aria-label should use i18n values for internationalization. Found hardcoded: "Close"' }]
        },
        {
          code: 'html`<button aria-label="Click to submit">Submit</button>`',
          errors: [
            {
              message: 'aria-label should use i18n values for internationalization. Found hardcoded: "Click to submit"'
            }
          ]
        },
        {
          code: 'html`<bp-button-icon aria-label="Menu" shape="menu"></bp-button-icon>`',
          errors: [{ message: 'aria-label should use i18n values for internationalization. Found hardcoded: "Menu"' }]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
