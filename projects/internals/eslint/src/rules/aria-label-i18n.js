/**
 * Rule: aria-label-i18n
 * Interactive elements with aria-label should use i18n service values, not hardcoded strings.
 */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require i18n values for aria-label attributes in templates',
      category: 'Accessibility'
    },
    schema: []
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        // Only check html tagged templates
        if (node.tag?.name !== 'html') return;

        const sourceCode = context.sourceCode || context.getSourceCode();
        const templateText = sourceCode.getText(node);

        // Look for hardcoded aria-label values (not using template expressions)
        // Pattern: aria-label="some text" where text doesn't start with ${
        const hardcodedPattern = /aria-label="([^"$][^"]*)"/g;
        let match;

        while ((match = hardcodedPattern.exec(templateText)) !== null) {
          const value = match[1];
          // Skip if it looks like a binding or i18n reference
          if (!value.includes('${') && !value.includes('this.i18n')) {
            context.report({
              node,
              message: `aria-label should use i18n values for internationalization. Found hardcoded: "${value}"`
            });
          }
        }
      }
    };
  }
};
