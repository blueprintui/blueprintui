import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Color',
  schema: schema.find(c => c.name === 'color')
};

export function render() {
  return /* markdown */`
The color input component is used to allow users to select a color from a predefined set of options or to input a specific color value.
The input should have a clear and consistent label that describes the option it represents.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- Use a \`label\` element or \`aria-labelledby\` or \`aria-label\` to provide a clear and concise description of the color picker option.

${getAPI(data.schema)}
`;
}
