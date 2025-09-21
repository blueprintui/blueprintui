export default {
  meta: {
    type: 'problem',
    schema: false, // https://eslint.org/docs/latest/extend/custom-rules#options-schemas
    docs: {
      description: 'Enforce only certain CustomEvent names to be dispatched',
      category: 'Best Practices'
    }
  },
  create(context) {
    const include = context.options[0]?.include || [];
    return {
      'NewExpression[callee.name="CustomEvent"]'(node) {
        const eventName = node.arguments[0]?.value;

        if (eventName && !include.find(i => i === eventName)) {
          context.report({
            node,
            message: `Unexpected CustomEvent name '${eventName}' detected. Only certain CustomEvent names are allowed to be dispatched.`
          });
        }
      }
    };
  }
};
