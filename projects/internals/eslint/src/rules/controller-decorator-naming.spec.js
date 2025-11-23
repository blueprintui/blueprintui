import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import rule from './controller-decorator-naming.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
});

describe('controller-decorator-naming', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('controller-decorator-naming', rule, {
      valid: [
        {
          code: `
            @stateDisabled()
            class MyElement {}
          `
        },
        {
          code: `
            @typeButton()
            class MyElement {}
          `
        },
        {
          code: `
            @interactionClick()
            class MyElement {}
          `
        },
        {
          code: `
            @i18n({ key: 'actions' })
            class MyElement {}
          `
        },
        {
          code: `
            @keynav()
            class MyElement {}
          `
        },
        {
          // customElement is not a controller
          code: `
            @customElement('my-element')
            class MyElement {}
          `
        },
        {
          // property decorator on field is not checked
          code: `
            class MyElement {
              @property({ type: String }) accessor value;
            }
          `
        },
        {
          // Additional known controller via options
          code: `
            @customController()
            class MyElement {}
          `,
          options: [{ additionalControllers: ['customController'] }]
        }
      ],
      invalid: [
        {
          code: `
            @disabled<BpButton>()
            class MyElement {}
          `,
          errors: [{ message: "Controller decorator 'disabled' should follow naming convention: @[state|type|interaction|i18n][Name]<T>()" }]
        },
        {
          code: `
            @buttonType<BpButton>()
            class MyElement {}
          `,
          errors: [{ message: "Controller decorator 'buttonType' should follow naming convention: @[state|type|interaction|i18n][Name]<T>()" }]
        },
        {
          code: `
            @handleClick<BpButton>()
            class MyElement {}
          `,
          errors: [{ message: "Controller decorator 'handleClick' should follow naming convention: @[state|type|interaction|i18n][Name]<T>()" }]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
