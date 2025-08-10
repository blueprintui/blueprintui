import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Card',
  schema: schema.find(c => c.name === 'card')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-card')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'card-content')}

${getExample(data.schema, 'card-grid')}

${getExample(data.schema, 'card-media')}

${getImport(data.schema)}

## Accessibility
- Use appropriate color contrast to make sure the text is easily readable for users with visual impairments.
- Use headings and labels to provide context and organization to the content within the card.
- Provide alternative text for images and other non-text elements within the card.
- Make sure the card is keyboard accessible, so users can navigate through the card and its elements.

${getAPI(data.schema)}
`;
}
