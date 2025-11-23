/**
 * Rule: no-stateful-event-emission
 * Events should only be dispatched from user interaction handlers, not from
 * property setters or lifecycle methods. This prevents render loops.
 */
const lifecycleMethods = ['updated', 'firstUpdated', 'willUpdate', 'connectedCallback', 'attributeChangedCallback'];

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent dispatching events from setters or lifecycle methods',
      category: 'Best Practices'
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedLifecycleMethods: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const allowedLifecycleMethods = context.options[0]?.allowedLifecycleMethods || [];
    let currentMethodType = null;
    let currentMethodName = null;

    return {
      'MethodDefinition[kind="set"]'(node) {
        currentMethodType = 'setter';
        currentMethodName = node.key?.name;
      },
      'MethodDefinition[kind="set"]:exit'() {
        currentMethodType = null;
        currentMethodName = null;
      },
      'MethodDefinition[kind="method"]'(node) {
        const name = node.key?.name;
        if (lifecycleMethods.includes(name) && !allowedLifecycleMethods.includes(name)) {
          currentMethodType = 'lifecycle';
          currentMethodName = name;
        }
      },
      'MethodDefinition[kind="method"]:exit'(node) {
        const name = node.key?.name;
        if (lifecycleMethods.includes(name)) {
          currentMethodType = null;
          currentMethodName = null;
        }
      },
      'CallExpression[callee.property.name="dispatchEvent"]'(node) {
        if (currentMethodType === 'setter') {
          context.report({
            node,
            message: `Do not dispatch events from property setter '${currentMethodName}'. Only emit events from user interaction handlers.`
          });
        } else if (currentMethodType === 'lifecycle') {
          context.report({
            node,
            message: `Do not dispatch events from lifecycle method '${currentMethodName}'. Only emit events from user interaction handlers.`
          });
        }
      }
    };
  }
};
