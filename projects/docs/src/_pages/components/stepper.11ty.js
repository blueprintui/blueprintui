import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Stepper',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
  schema: schema.find(c => c.name === 'stepper')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-stepper')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical')}

${getExample(data.schema, 'status')}

${getExample(data.schema, 'disabled')}

${getExample(data.schema, 'status-vertical')}

${getImport(data.schema)}

## Accessibility
- The stepper component should have a clear multi step process for the user to follow.
- The active step label should clearly represent the content it opens.

${getAPI(data.schema)}
`;
}
