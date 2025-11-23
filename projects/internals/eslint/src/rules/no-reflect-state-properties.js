/**
 * Rule: no-reflect-state-properties
 * State properties managed by ElementInternals should not use reflect: true.
 * These states use Custom States API (:state(disabled)) instead of attributes.
 */
const stateProperties = ['disabled', 'readonly', 'checked', 'selected', 'expanded', 'pressed', 'active', 'indeterminate'];

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent reflect: true on state properties managed by ElementInternals',
      category: 'Best Practices'
    },
    schema: [
      {
        type: 'object',
        properties: {
          exclude: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const exclude = context.options[0]?.exclude || [];

    function checkNode(node) {
      const propName = node.key?.name;
      if (!propName || exclude.includes(propName)) return;

      // Find property decorator
      const propertyDecorator = node.decorators?.find(
        d => d.expression?.callee?.name === 'property'
      );

      if (!propertyDecorator) return;

      if (stateProperties.includes(propName)) {
        const args = propertyDecorator.expression.arguments;
        if (args && args[0]?.properties) {
          const hasReflect = args[0].properties.some(
            p => p.key?.name === 'reflect' && p.value?.value === true
          );

          if (hasReflect) {
            context.report({
              node: propertyDecorator,
              message: `'${propName}' is managed by ElementInternals and should not use reflect: true. Use Custom States API instead.`
            });
          }
        }
      }
    }

    return {
      // Handle both regular PropertyDefinition and AccessorProperty (accessor keyword)
      PropertyDefinition: checkNode,
      AccessorProperty: checkNode
    };
  }
};
