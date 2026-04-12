/**
 * Rule: no-hardcoded-px
 * BlueprintUI requires design tokens for consistent theming.
 * Hardcoded px values >= 2px should use CSS custom properties instead.
 */

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow hardcoded px values >= 2px; use design tokens instead',
      category: 'Best Practices'
    },
    messages: {
      noHardcodedPx: "Hardcoded '{{value}}' found. Use a design token instead, e.g. var(--bp-size-500) instead of 16px."
    },
    schema: []
  },
  create(context) {
    return {
      Dimension(node) {
        if (node.unit?.toLowerCase() !== 'px') return;
        const num = parseFloat(node.value);
        if (Number.isNaN(num) || num < 2) return;
        context.report({
          loc: node.loc,
          messageId: 'noHardcodedPx',
          data: { value: `${node.value}${node.unit}` }
        });
      }
    };
  }
};
