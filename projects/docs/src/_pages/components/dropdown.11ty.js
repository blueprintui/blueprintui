import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Dropdown',
  schema: schema.find(c => c.name === 'dropdown')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-dropdown')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'menu')}

${getExample(data.schema, 'checkbox-group')}

${getExample(data.schema, 'radio-group')}

${getImport(data.schema)}

## Accessibility
- Use ARIA attributes such as \`aria-expanded\` and \`aria-activedescendant\` to indicate the state of the dropdown.
- Use a button or link to open and close the dropdown, rather than relying on hover or swipe gestures.

${getAPI(data.schema)}
`;
}
