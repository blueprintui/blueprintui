import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import css from '@eslint/css';
import rule from './no-hardcoded-px.js';

const ruleTester = new RuleTester({
  language: 'css/css',
  plugins: { css }
});

describe('no-hardcoded-px', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('no-hardcoded-px', rule, {
      valid: [
        { code: `:host { margin: 0px; }` },
        { code: `:host { border-width: 1px; }` },
        { code: `:host { font-size: 1em; }` },
        { code: `:host { padding: 1rem; }` },
        { code: `:host { width: 50%; }` },
        { code: `:host { gap: var(--bp-size-500); }` },
        { code: `:host { padding: var(--bp-size-300) var(--bp-size-500); }` }
      ],
      invalid: [
        {
          code: `:host { margin: 2px; }`,
          errors: [{ messageId: 'noHardcodedPx', data: { value: '2px' } }]
        },
        {
          code: `:host { padding: 16px; }`,
          errors: [{ messageId: 'noHardcodedPx', data: { value: '16px' } }]
        },
        {
          code: `:host { gap: 24px; }`,
          errors: [{ messageId: 'noHardcodedPx', data: { value: '24px' } }]
        },
        {
          code: `:host { width: 100px; }`,
          errors: [{ messageId: 'noHardcodedPx', data: { value: '100px' } }]
        },
        {
          code: `:host { margin: 8px 16px; }`,
          errors: [
            { messageId: 'noHardcodedPx', data: { value: '8px' } },
            { messageId: 'noHardcodedPx', data: { value: '16px' } }
          ]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
