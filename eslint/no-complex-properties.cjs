const properties = new Map();

const rule = {
  meta: {
    docs: {
      desription: 'Prevent use of complex types on public API @property declarations',
      category: 'Best Practices'
    },
    type: 'problem'
  },
  create(context) {
    const exclude = context.options[0]?.exclude || [];
    return {
      'PropertyDefinition > Decorator[expression.callee.name=property]': node =>
        properties.set(node.parent.key.name, node),
      'ClassDeclaration:exit': () => {
        properties.forEach(node => {
          const props = node.expression.arguments.flatMap(arg => arg.properties);

          props.forEach(prop => {
            if (
              !exclude.find(i => i === node.parent.key.name) &&
              prop.key.name === 'type' &&
              (prop.value.name === 'Object' || prop.value.name === 'Array')
            ) {
              context.report({
                node: node.parent,
                message: `Public API @property ${node.parent.key.name} of type ${prop.value.name} must be a primitive type`
              });
            }
          });

          properties.clear();
        });
      }
    };
  }
};

module.exports = rule;
