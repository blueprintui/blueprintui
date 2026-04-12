import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import rule from './require-component-registration.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
});

describe('require-component-registration', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('require-component-registration', rule, {
      valid: [
        {
          // Non-matching file (not an index.ts in src/*)
          filename: '/projects/components/src/button/element.ts',
          code: `export class BpButton {}`
        },
        {
          // Excluded directory: internals
          filename: '/projects/components/src/internals/index.ts',
          code: `export * from './element.js';`
        },
        {
          // Excluded directory: include
          filename: '/projects/components/src/include/index.ts',
          code: `export * from './element.js';`
        },
        {
          // Excluded directory: i18n
          filename: '/projects/components/src/i18n/index.ts',
          code: `export * from './element.js';`
        },
        {
          // Custom exclude option
          filename: '/fake/src/custom-skip/index.ts',
          options: [{ exclude: ['custom-skip'] }],
          code: `export * from './element.js';`
        }
      ],
      invalid: [
        {
          filename: '/fake/src/my-new-component/index.ts',
          code: `export * from './element.js';`,
          errors: [
            {
              message:
                `Component 'my-new-component' is not registered. Add the following:\n` +
                `  1. Create: /fake/src/include/my-new-component.ts\n` +
                `  2. Add export to: /fake/src/include/all.ts\n` +
                `  3. Add lazy loader to: /fake/src/include/lazy.ts`
            }
          ]
        },
        {
          filename: '/nonexistent/src/fancy-widget/index.ts',
          code: `export * from './element.js';`,
          errors: [
            {
              message:
                `Component 'fancy-widget' is not registered. Add the following:\n` +
                `  1. Create: /nonexistent/src/include/fancy-widget.ts\n` +
                `  2. Add export to: /nonexistent/src/include/all.ts\n` +
                `  3. Add lazy loader to: /nonexistent/src/include/lazy.ts`
            }
          ]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
