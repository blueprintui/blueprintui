import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Chat',
  schema: schema.find(c => c.name === 'chat')
};

export function render() {
  return /* markdown */`
The Chat Message is a component designed to display chat messages in a conversational format. It improves readability and provides a visual context for conversations.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'color')}

${getExample(data.schema, 'long-text')}

${getExample(data.schema, 'progress')}

${getExample(data.schema, 'arrow')}

${getImport(data.schema)}

## Accessibility
- **Color Contrast**: Ensure the color contrast between the text and the background of the chat bubble is compliant with WCAG standards to ensure readability for users with visual impairments.

${getAPI(data.schema)}
`;
}
