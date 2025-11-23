/**
 * Rule: require-part-internal
 * Component templates should include a part="internal" wrapper element for proper styling isolation.
 */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require part="internal" wrapper in component render templates',
      category: 'Best Practices'
    },
    schema: []
  },
  create(context) {
    return {
      'MethodDefinition[key.name="render"]'(node) {
        // Check if parent is a class that extends LitElement (has Bp prefix or extends LitElement/FormControl)
        const classNode = node.parent?.parent;
        if (!classNode || classNode.type !== 'ClassDeclaration') return;

        // Check class name starts with Bp (BlueprintUI convention)
        const className = classNode.id?.name;
        if (!className || !className.startsWith('Bp')) return;

        const sourceCode = context.sourceCode || context.getSourceCode();
        const methodText = sourceCode.getText(node);

        // Check if render method returns html with part="internal"
        if (methodText.includes('html`')) {
          // Look for part="internal" in the template
          if (!methodText.includes('part="internal"') && !methodText.includes("part='internal'")) {
            context.report({
              node,
              message: 'Component render template should include part="internal" wrapper for styling consistency'
            });
          }
        }
      }
    };
  }
};
