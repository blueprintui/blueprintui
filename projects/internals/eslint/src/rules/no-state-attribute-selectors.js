/**
 * Rule: no-state-attribute-selectors
 * BlueprintUI uses ElementInternals Custom States API (:state()) instead of
 * attribute reflection. CSS should target :host(:state(name)) not [name].
 */
const stateNames = ['disabled', 'checked', 'expanded', 'readonly', 'selected', 'pressed', 'active', 'indeterminate'];

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow attribute selectors for ElementInternals states; use :host(:state()) instead',
      category: 'Best Practices'
    },
    messages: {
      useStateSelector:
        "Use ':host(:state({{state}}))' instead of '[{{state}}]'. BlueprintUI uses ElementInternals Custom States API."
    },
    schema: []
  },
  create(context) {
    return {
      Selector(node) {
        for (const child of node.children) {
          if (child.type === 'AttributeSelector' && stateNames.includes(child.name?.name)) {
            context.report({
              loc: child.loc,
              messageId: 'useStateSelector',
              data: { state: child.name.name }
            });
          }
        }
      }
    };
  }
};
