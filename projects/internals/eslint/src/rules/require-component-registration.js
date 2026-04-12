/**
 * Rule: require-component-registration
 * Component directories must have a corresponding include/{name}.ts registration file.
 */
import fs from 'node:fs';
import path from 'node:path';

const defaultExclude = ['internals', 'include', 'i18n'];

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require component registration in include files for each component directory',
      category: 'Best Practices'
    },
    schema: [
      {
        type: 'object',
        properties: {
          exclude: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const filename = context.filename;
    const match = filename.match(/[/\\]src[/\\]([^/\\]+)[/\\]index\.ts$/);
    if (!match) {
      return {};
    }

    const componentName = match[1];
    const exclude = context.options[0]?.exclude ?? defaultExclude;

    if (exclude.includes(componentName)) {
      return {};
    }

    const srcDir = path.dirname(path.dirname(filename));
    const includeFile = path.join(srcDir, 'include', `${componentName}.ts`);

    return {
      Program(node) {
        if (!fs.existsSync(includeFile)) {
          const includeDir = path.join(srcDir, 'include');
          context.report({
            node,
            message:
              `Component '${componentName}' is not registered. Add the following:\n` +
              `  1. Create: ${includeDir}/${componentName}.ts\n` +
              `  2. Add export to: ${includeDir}/all.ts\n` +
              `  3. Add lazy loader to: ${includeDir}/lazy.ts`
          });
        }
      }
    };
  }
};
