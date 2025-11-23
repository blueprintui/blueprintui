import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RuleTester } from 'eslint';
import rule from './no-event-verb-prefix.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  }
});

describe('no-event-verb-prefix', () => {
  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('no-event-verb-prefix', rule, {
      valid: [
        {
          code: `this.dispatchEvent(new CustomEvent('open'));`
        },
        {
          code: `this.dispatchEvent(new CustomEvent('close'));`
        },
        {
          code: `this.dispatchEvent(new CustomEvent('change'));`
        },
        {
          code: `this.dispatchEvent(new CustomEvent('bp-keychange'));`
        },
        {
          // 'on' alone is fine (unlikely but valid)
          code: `this.dispatchEvent(new CustomEvent('on'));`
        }
      ],
      invalid: [
        {
          code: `this.dispatchEvent(new CustomEvent('onOpen'));`,
          errors: [{ message: "Event 'onOpen' should not use verb prefix 'on'. Use state-based naming (e.g., 'open' instead of 'onOpen')." }]
        },
        {
          code: `this.dispatchEvent(new CustomEvent('beforeClose'));`,
          errors: [{ message: "Event 'beforeClose' should not use verb prefix 'before'. Use state-based naming (e.g., 'open' instead of 'onOpen')." }]
        },
        {
          code: `this.dispatchEvent(new CustomEvent('afterUpdate'));`,
          errors: [{ message: "Event 'afterUpdate' should not use verb prefix 'after'. Use state-based naming (e.g., 'open' instead of 'onOpen')." }]
        },
        {
          code: `this.dispatchEvent(new CustomEvent('willChange'));`,
          errors: [{ message: "Event 'willChange' should not use verb prefix 'will'. Use state-based naming (e.g., 'open' instead of 'onOpen')." }]
        },
        {
          code: `this.dispatchEvent(new CustomEvent('didRender'));`,
          errors: [{ message: "Event 'didRender' should not use verb prefix 'did'. Use state-based naming (e.g., 'open' instead of 'onOpen')." }]
        }
      ]
    });
    assert.ok(true, 'All test cases passed');
  });
});
