import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import rule from './require-relative-import-extension.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
});

describe('require-relative-import-extension', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('require-relative-import-extension', rule, {
      valid: [
        { code: `import { x } from './foo.js';` },
        { code: `import { x } from '../bar/baz.js';` },
        { code: `import styles from './styles.css';` },
        { code: `import { x } from 'lit';` },
        { code: `import { x } from 'node:fs';` },
        {
          code: `import data from './data.json' with { type: 'json' };`,
          languageOptions: { parserOptions: { ecmaVersion: 2024 } }
        },
        { code: `export { a } from './mod.js';` },
        { code: `export * from './mod.js';` }
      ],
      invalid: [
        {
          code: `import { x } from './foo';`,
          errors: [
            {
              message:
                'Relative imports must use a .js extension (e.g. import { foo } from "./bar.js"). TypeScript emits .js files for Node ESM resolution.'
            }
          ]
        },
        {
          code: `import { x } from '../bar';`,
          errors: [
            {
              message:
                'Relative imports must use a .js extension (e.g. import { foo } from "./bar.js"). TypeScript emits .js files for Node ESM resolution.'
            }
          ]
        },
        {
          code: `export { a } from './mod';`,
          errors: [
            {
              message:
                'Relative imports must use a .js extension (e.g. import { foo } from "./bar.js"). TypeScript emits .js files for Node ESM resolution.'
            }
          ]
        },
        {
          code: `export * from './mod';`,
          errors: [
            {
              message:
                'Relative imports must use a .js extension (e.g. import { foo } from "./bar.js"). TypeScript emits .js files for Node ESM resolution.'
            }
          ]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
