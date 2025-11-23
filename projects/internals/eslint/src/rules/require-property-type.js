/**
 * Rule: require-property-type
 * All @property decorators should specify the type option for proper attribute handling.
 */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require type specification in @property decorators',
      category: 'Best Practices'
    },
    schema: []
  },
  create(context) {
    function checkNode(node) {
      // Find property decorator
      const propertyDecorator = node.decorators?.find(
        d => d.expression?.callee?.name === 'property'
      );

      if (!propertyDecorator) return;

      const args = propertyDecorator.expression.arguments;

      // No arguments at all
      if (!args || args.length === 0) {
        context.report({
          node: propertyDecorator,
          message: '@property decorator should specify type for proper attribute conversion (e.g., { type: String })'
        });
        return;
      }

      // Has arguments but no type property
      const firstArg = args[0];
      if (firstArg?.properties) {
        const hasType = firstArg.properties.some(p => p.key?.name === 'type');
        if (!hasType) {
          context.report({
            node: propertyDecorator,
            message: '@property decorator should specify type for proper attribute conversion (e.g., { type: String })'
          });
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
