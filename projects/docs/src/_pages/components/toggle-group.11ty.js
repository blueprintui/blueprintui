import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Toggle Group',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/',
  schema: schema.find(c => c.name === 'toggle-group')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-toggle-group')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'expand')}

${getExample(data.schema, 'with-icons')}

${getExample(data.schema, 'icon-only')}

${getExample(data.schema, 'disabled')}

${getExample(data.schema, 'readonly')}

${getExample(data.schema, 'required')}

${getExample(data.schema, 'two-options')}

${getExample(data.schema, 'many-options')}

${getExample(data.schema, 'form-integration')}

${getImport(data.schema)}

## Usage Guidelines
- Use toggle groups when you have 2-5 closely related options where seeing all choices at once is important
- All options should be similar in length and importance
- Labels should be clear, concise, and use sentence case
- Prefer toggle groups over dropdowns when reducing clicks and improving discoverability is a priority
- Don't nest interactive content within options

## Accessibility
- The toggle group has \`role="radiogroup"\` and each option has \`role="radio"\`
- Use a \`<label>\` element or \`aria-label\` to provide an accessible name for the group
- Keyboard navigation: Arrow keys move between options, Space/Enter select an option
- For icon-only options, provide \`aria-label\` on each option for screen reader users
- One option must always be selected (radio button semantics)

${getAPI(data.schema)}
`;
}
