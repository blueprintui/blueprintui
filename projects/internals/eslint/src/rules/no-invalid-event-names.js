export default {
  meta: {
    docs: {
      description: 'Events must be lowercase and use kebab-case to maximize compatibility with the DOM API',
      category: 'Best Practices'
    },
    type: 'problem'
  },
  create(context) {
    return {
      'NewExpression[callee.name="CustomEvent"]'(node) {
        const eventName = node.arguments[0]?.value;

        if (eventName && (eventName.includes('_') || eventName !== eventName.toLowerCase())) {
          context.report({
            node,
            message: `Event '${eventName}' must be lowercase and use kebab-case to maximize compatibility with the DOM API.`
          });
        }
      }
    };
  }
};
