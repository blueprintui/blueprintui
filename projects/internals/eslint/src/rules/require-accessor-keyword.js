/**
 * Rule: require-accessor-keyword
 * Ensures all @property decorators use the accessor keyword for proper Lit 3.x class field semantics.
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require accessor keyword with @property decorators for Lit components',
      category: 'Best Practices'
    },
    schema: []
  },
  create(context) {
    return {
      PropertyDefinition(node) {
        const hasPropertyDecorator = node.decorators?.some(
          d => d.expression?.callee?.name === 'property' || d.expression?.name === 'property'
        );

        if (hasPropertyDecorator) {
          // Check if this is an AccessorProperty (has accessor keyword)
          // In the AST, AccessorProperty type indicates accessor keyword usage
          // PropertyDefinition without accessor is a regular class field
          const sourceCode = context.sourceCode || context.getSourceCode();
          const text = sourceCode.getText(node);

          if (!text.includes('accessor ')) {
            context.report({
              node,
              message: '@property decorator requires the accessor keyword for proper Lit reactivity'
            });
          }
        }
      }
    };
  }
};
