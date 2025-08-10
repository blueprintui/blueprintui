import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Select',
  schema: schema.find(c => c.name === 'select')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-select')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

# Select Input Component

## Usage
The Select Input component provides a dropdown list to select a value from a set of predefined options. 

## Accessibility
- The currently focused option should be highlighted as the user navigates the options with the keyboard.
- The Select Input component should have a descriptive label or \`aria-label\` attribute if no visible label is present.

${getAPI(data.schema)}
`;
}
