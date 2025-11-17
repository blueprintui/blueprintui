import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Telephone',
  schema: schema.find(c => c.name === 'telephone')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-telephone')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getExample(data.schema, 'validation')}

${getExample(data.schema, 'with-prefix')}

${getExample(data.schema, 'autocomplete')}

${getImport(data.schema)}

## Accessibility
- Must have a clear and visible label or \`aria-label\` attribute if no visible label is present.
- Uses \`type="tel"\` for appropriate mobile keyboard with numeric keypad.
- Supports keyboard navigation and visible focus state.
- Supports ARIA attributes (\`aria-describedby\`, \`aria-label\`) for enhanced accessibility.
- Provides clear feedback when input is invalid through validation messages.

## Pattern Validation

The telephone component supports HTML5 pattern validation for enforcing specific phone number formats. Here are some common patterns:

**US Format (555-123-4567)**:
\`\`\`html
<bp-telephone pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></bp-telephone>
\`\`\`

**International Format (+1 555-123-4567)**:
\`\`\`html
<bp-telephone pattern="\\+[0-9]{1,3} [0-9]{3}-[0-9]{3}-[0-9]{4}"></bp-telephone>
\`\`\`

**Flexible Format (allows various separators)**:
\`\`\`html
<bp-telephone pattern="[0-9]{3}[-. ]?[0-9]{3}[-. ]?[0-9]{4}"></bp-telephone>
\`\`\`

${getAPI(data.schema)}
`;
}
