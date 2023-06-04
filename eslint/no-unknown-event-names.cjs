const rule = {
  meta: {
    docs: {
      description: 'Enforce only certain CustomEvent names to be dispatched',
      category: 'Best Practices'
    },
    type: 'problem'
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

module.exports = rule;
