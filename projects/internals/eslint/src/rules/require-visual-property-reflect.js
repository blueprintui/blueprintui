/**
 * Rule: require-visual-property-reflect
 * Visual/semantic properties like status, action, size should use reflect: true for CSS selector targeting.
 */
const visualProperties = ['status', 'action', 'size', 'position', 'layout', 'orientation', 'shape', 'variant'];

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Suggest reflect: true for visual properties used in CSS selectors',
      category: 'Best Practices'
    },
    schema: [
      {
        type: 'object',
        properties: {
          properties: {
            type: 'array',
            items: { type: 'string' }
          },
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
    const customProperties = context.options[0]?.properties || [];
    const exclude = context.options[0]?.exclude || [];
    const allVisualProperties = [...visualProperties, ...customProperties];

    function checkNode(node) {
      const propName = node.key?.name;
      if (!propName || exclude.includes(propName)) return;

      // Find property decorator
      const propertyDecorator = node.decorators?.find(
        d => d.expression?.callee?.name === 'property'
      );

      if (!propertyDecorator) return;

      if (allVisualProperties.includes(propName)) {
        const args = propertyDecorator.expression.arguments;
        if (!args || args.length === 0) {
          context.report({
            node: propertyDecorator,
            message: `Visual property '${propName}' should use reflect: true for CSS selector styling (e.g., [${propName}='value'])`
          });
          return;
        }

        const firstArg = args[0];
        if (firstArg?.properties) {
          const hasReflect = firstArg.properties.some(
            p => p.key?.name === 'reflect' && p.value?.value === true
          );
          if (!hasReflect) {
            context.report({
              node: propertyDecorator,
              message: `Visual property '${propName}' should use reflect: true for CSS selector styling (e.g., [${propName}='value'])`
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
