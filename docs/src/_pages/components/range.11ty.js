import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Range',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/',
  schema: schema.find(c => c.name === 'range')
};

export function render() {
  return /* markdown */`
The range input component is used to allow the user to select a value within a specified range of values.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility 
- The range input component should be fully accessible to users using keyboard navigation.
- When a user navigates to the range input component, they should be able to adjust the value by using the arrow keys. 
- The range input component should also be labeled and provide a clear indication of the current value, minimum and maximum values, and what the range input represents to users.

${getAPI(data.schema)}
`;
}
