/**
 * Rule: no-event-verb-prefix
 * Custom events should not use verb prefixes like on, did, will, before, after.
 * Events should be state-based, not action-based.
 */
const verbPrefixes = ['on', 'before', 'after', 'will', 'did'];

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent verb prefixes in custom event names',
      category: 'Best Practices'
    },
    schema: [
      {
        type: 'object',
        properties: {
          additionalPrefixes: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const additionalPrefixes = context.options[0]?.additionalPrefixes || [];
    const allPrefixes = [...verbPrefixes, ...additionalPrefixes];

    return {
      'NewExpression[callee.name="CustomEvent"]'(node) {
        const eventName = node.arguments[0]?.value;
        if (!eventName || typeof eventName !== 'string') return;

        const matchedPrefix = allPrefixes.find(prefix => {
          const lowerEvent = eventName.toLowerCase();
          return lowerEvent.startsWith(prefix) && lowerEvent.length > prefix.length;
        });

        if (matchedPrefix) {
          context.report({
            node,
            message: `Event '${eventName}' should not use verb prefix '${matchedPrefix}'. Use state-based naming (e.g., 'open' instead of 'onOpen').`
          });
        }
      }
    };
  }
};
