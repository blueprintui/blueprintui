/**
 * Rule: require-examples-exports
 * Documentation example files must export `metadata` and `example`.
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description: "Require 'export const metadata' and 'export function example' in .examples.js files",
      category: 'Best Practices'
    },
    schema: []
  },
  create(context) {
    if (!context.filename.endsWith('.examples.js')) {
      return {};
    }

    let hasMetadata = false;
    let hasExample = false;

    return {
      ExportNamedDeclaration(node) {
        const decl = node.declaration;
        if (decl?.type === 'VariableDeclaration') {
          for (const d of decl.declarations) {
            if (d.id?.name === 'metadata') {
              hasMetadata = true;
            }
          }
        }
        if (decl?.type === 'FunctionDeclaration' && decl.id?.name === 'example') {
          hasExample = true;
        }
        for (const specifier of node.specifiers ?? []) {
          if (specifier.exported?.name === 'example') {
            hasExample = true;
          }
          if (specifier.exported?.name === 'metadata') {
            hasMetadata = true;
          }
        }
      },
      'Program:exit'(node) {
        if (!hasMetadata) {
          context.report({
            node,
            message: 'Missing \'export const metadata = { name: "...", elements: ["bp-..."] };\''
          });
        }
        if (!hasExample) {
          context.report({
            node,
            message: "Missing 'export function example() { return /* html */`...`; }'"
          });
        }
      }
    };
  }
};
