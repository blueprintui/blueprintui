/**
 * Rule: require-relative-import-extension
 * Relative ESM imports must use a .js extension (TypeScript emits .js).
 */

function isRelativePath(value) {
  return typeof value === 'string' && (value.startsWith('./') || value.startsWith('../'));
}

function isAllowedExtension(value) {
  return value.endsWith('.js') || value.endsWith('.css');
}

function hasImportAttributes(node) {
  const attrs = node.assertions ?? node.attributes ?? node.importAttributes;
  return Array.isArray(attrs) && attrs.length > 0;
}

function checkModuleSpecifier(context, node, sourceNode) {
  if (!sourceNode || sourceNode.type !== 'Literal') {
    return;
  }
  const value = sourceNode.value;
  if (!isRelativePath(value) || isAllowedExtension(value)) {
    return;
  }
  if (hasImportAttributes(node)) {
    return;
  }
  context.report({
    node: sourceNode,
    message:
      'Relative imports must use a .js extension (e.g. import { foo } from "./bar.js"). TypeScript emits .js files for Node ESM resolution.'
  });
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require .js extension on relative module specifiers in component sources',
      category: 'Best Practices'
    },
    schema: []
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        checkModuleSpecifier(context, node, node.source);
      },
      ExportAllDeclaration(node) {
        checkModuleSpecifier(context, node, node.source);
      },
      ExportNamedDeclaration(node) {
        if (node.source) {
          checkModuleSpecifier(context, node, node.source);
        }
      }
    };
  }
};
