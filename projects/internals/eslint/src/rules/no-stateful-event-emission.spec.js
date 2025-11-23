import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import rule from './no-stateful-event-emission.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
});

describe('no-stateful-event-emission', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('no-stateful-event-emission', rule, {
      valid: [
        {
          // Event in click handler is fine
          code: `
            class MyElement {
              handleClick() {
                this.dispatchEvent(new CustomEvent('open'));
              }
            }
          `
        },
        {
          // Event in private method called from handler is fine
          code: `
            class MyElement {
              #emitClose() {
                this.dispatchEvent(new CustomEvent('close'));
              }
            }
          `
        },
        {
          // render() method is not a lifecycle method for this rule
          code: `
            class MyElement {
              render() {
                this.dispatchEvent(new CustomEvent('render'));
              }
            }
          `
        },
        {
          // Allowed lifecycle method via options
          code: `
            class MyElement {
              connectedCallback() {
                this.dispatchEvent(new CustomEvent('connected'));
              }
            }
          `,
          options: [{ allowedLifecycleMethods: ['connectedCallback'] }]
        }
      ],
      invalid: [
        {
          code: `
            class MyElement {
              set expanded(value) {
                this._expanded = value;
                this.dispatchEvent(new CustomEvent('expand'));
              }
            }
          `,
          errors: [{ message: "Do not dispatch events from property setter 'expanded'. Only emit events from user interaction handlers." }]
        },
        {
          code: `
            class MyElement {
              updated(props) {
                if (props.has('open')) {
                  this.dispatchEvent(new CustomEvent('open'));
                }
              }
            }
          `,
          errors: [{ message: "Do not dispatch events from lifecycle method 'updated'. Only emit events from user interaction handlers." }]
        },
        {
          code: `
            class MyElement {
              firstUpdated() {
                this.dispatchEvent(new CustomEvent('ready'));
              }
            }
          `,
          errors: [{ message: "Do not dispatch events from lifecycle method 'firstUpdated'. Only emit events from user interaction handlers." }]
        },
        {
          code: `
            class MyElement {
              connectedCallback() {
                super.connectedCallback();
                this.dispatchEvent(new CustomEvent('connected'));
              }
            }
          `,
          errors: [{ message: "Do not dispatch events from lifecycle method 'connectedCallback'. Only emit events from user interaction handlers." }]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
