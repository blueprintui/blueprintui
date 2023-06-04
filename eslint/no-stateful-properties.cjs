const properties = new Map();
const mutations = new Map();

const rule = {
  meta: {
    docs: {
      desription: 'Prevent stateful mutations on public @property declarations',
      category: 'Best Practices'
    },
    type: 'problem'
  },
  create(context) {
    const exclude = context.options[0]?.exclude || [];
    return {
      'PropertyDefinition > Decorator[expression.callee.name=property]': node =>
        properties.set(node.parent.key.name, node),
      'AssignmentExpression[left.object.type=ThisExpression][left.property.type=Identifier]': node =>
        mutations.set(node.left.property.name, node),
      'ClassDeclaration:exit': () => {
        mutations.forEach((node, mutation) => {
          if (properties.has(mutation) && !exclude.find(i => i === mutation)) {
            context.report({
              node: node.parent,
              message: `Do not mutate public @property ${mutation}`
            });
          }
        });
        properties.clear();
        mutations.clear();
      }
    };
  }
};

module.exports = rule;
