import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Time',
  schema: schema.find(c => c.name === 'time')
};

export function render() {
  return /* markdown */`
The time input component is used to collect a specific time value from the user. It can be used as a standalone component or as part of a form. 
${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- Provide clear and descriptive label or \`aria-label\` attribute.
- Use proper contrast ratios to ensure that the text is easily readable against the background
- Provide clear and descriptive error messages when invalid values are entered

${getAPI(data.schema)}
`;
}
