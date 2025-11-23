import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import rule from './require-part-internal.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  }
});

describe('require-part-internal', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('require-part-internal', rule, {
      valid: [
        {
          code: `
            class BpButton {
              render() {
                return html\`<div part="internal"><slot></slot></div>\`;
              }
            }
          `
        },
        {
          code: `
            class BpDialog {
              render() {
                return html\`
                  <div part="internal">
                    <slot name="header"></slot>
                    <slot></slot>
                  </div>
                \`;
              }
            }
          `
        },
        {
          // Non-Bp class is not checked
          code: `
            class MyElement {
              render() {
                return html\`<slot></slot>\`;
              }
            }
          `
        },
        {
          // Non-render method is not checked
          code: `
            class BpElement {
              template() {
                return html\`<slot></slot>\`;
              }
            }
          `
        }
      ],
      invalid: [
        {
          code: `
            class BpButton {
              render() {
                return html\`<slot></slot>\`;
              }
            }
          `,
          errors: [{ message: 'Component render template should include part="internal" wrapper for styling consistency' }]
        },
        {
          code: `
            class BpAlert {
              render() {
                return html\`
                  <div>
                    <slot></slot>
                  </div>
                \`;
              }
            }
          `,
          errors: [{ message: 'Component render template should include part="internal" wrapper for styling consistency' }]
        },
        {
          code: `
            class BpCard {
              render() {
                return html\`
                  <div part="container">
                    <slot></slot>
                  </div>
                \`;
              }
            }
          `,
          errors: [{ message: 'Component render template should include part="internal" wrapper for styling consistency' }]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
