const properties = new Map();
const mutations = new Map();

export default {
  meta: {
    type: 'problem',
    schema: false, // https://eslint.org/docs/latest/extend/custom-rules#options-schemas
    docs: {
      desription: 'Prevent stateful mutations on public @property declarations',
      category: 'Best Practices'
    }
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
