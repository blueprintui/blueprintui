import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import css from '@eslint/css';
import rule from './no-state-attribute-selectors.js';

const ruleTester = new RuleTester({
  language: 'css/css',
  plugins: { css }
});

describe('no-state-attribute-selectors', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('no-state-attribute-selectors', rule, {
      valid: [
        {
          code: `:host(:state(disabled)) { opacity: 0.5; }`
        },
        {
          code: `:host(:state(checked)) { background: blue; }`
        },
        {
          code: `:host(:state(expanded)) { display: block; }`
        },
        {
          code: `.my-class { color: red; }`
        },
        {
          code: `[aria-disabled="true"] { opacity: 0.5; }`
        },
        {
          code: `[data-value="foo"] { color: green; }`
        }
      ],
      invalid: [
        {
          code: `[disabled] { opacity: 0.5; }`,
          errors: [
            {
              messageId: 'useStateSelector',
              data: { state: 'disabled' }
            }
          ]
        },
        {
          code: `[checked] { background: blue; }`,
          errors: [
            {
              messageId: 'useStateSelector',
              data: { state: 'checked' }
            }
          ]
        },
        {
          code: `[expanded] { display: block; }`,
          errors: [
            {
              messageId: 'useStateSelector',
              data: { state: 'expanded' }
            }
          ]
        },
        {
          code: `[readonly] { cursor: not-allowed; }`,
          errors: [
            {
              messageId: 'useStateSelector',
              data: { state: 'readonly' }
            }
          ]
        },
        {
          code: `[selected] { font-weight: bold; }`,
          errors: [
            {
              messageId: 'useStateSelector',
              data: { state: 'selected' }
            }
          ]
        },
        {
          code: `[pressed] { background: gray; }`,
          errors: [
            {
              messageId: 'useStateSelector',
              data: { state: 'pressed' }
            }
          ]
        },
        {
          code: `[active] { border: 1px solid; }`,
          errors: [
            {
              messageId: 'useStateSelector',
              data: { state: 'active' }
            }
          ]
        },
        {
          code: `[indeterminate] { background: striped; }`,
          errors: [
            {
              messageId: 'useStateSelector',
              data: { state: 'indeterminate' }
            }
          ]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
