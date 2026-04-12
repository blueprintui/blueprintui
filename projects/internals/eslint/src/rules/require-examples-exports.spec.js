import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import rule from './require-examples-exports.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
});

describe('require-examples-exports', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('require-examples-exports', rule, {
      valid: [
        {
          filename: 'button.examples.js',
          code: `
export const metadata = { name: 'button', elements: ['bp-button'] };
export function example() { return \`<bp-button>Click</bp-button>\`; }
          `
        },
        {
          filename: 'button.examples.js',
          code: `
export const metadata = { name: 'button', elements: ['bp-button'] };
function primary() { return \`<bp-button>Click</bp-button>\`; }
export { primary as example };
          `
        },
        {
          // Non-.examples.js files are not checked
          filename: 'button.ts',
          code: ``
        }
      ],
      invalid: [
        {
          filename: 'button.examples.js',
          code: `export function example() { return \`<bp-button>Click</bp-button>\`; }`,
          errors: [{ message: 'Missing \'export const metadata = { name: "...", elements: ["bp-..."] };\'' }]
        },
        {
          filename: 'button.examples.js',
          code: `export const metadata = { name: 'button', elements: ['bp-button'] };`,
          errors: [{ message: "Missing 'export function example() { return /* html */`...`; }'" }]
        },
        {
          filename: 'button.examples.js',
          code: `const metadata = {}; function example() {}`,
          errors: [
            { message: 'Missing \'export const metadata = { name: "...", elements: ["bp-..."] };\'' },
            { message: "Missing 'export function example() { return /* html */`...`; }'" }
          ]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
