import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Copy',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
  schema: schema.find(c => c.name === 'button-copy')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-button-copy')}

${getExample(data.schema, 'example')} 

${getExample(data.schema, 'action')}

${getExample(data.schema, 'status')}

${getExample(data.schema, 'custom-icons')}

${getExample(data.schema, 'disabled')}

${getExample(data.schema, 'command')}

${getImport(data.schema)}

## Accessibility
- Use a clear, descriptive supporting text or aria-label that communicates its purpose.
- Use appropriate color contrast to make sure the text is easily readable for users with visual impairments.

${getAPI(data.schema)}
`;
}
