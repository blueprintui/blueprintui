import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Switch',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
  schema: schema.find(c => c.name === 'switch')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-switch')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical-group' )}

${getExample(data.schema, 'vertical-inline-group')}

${getExample(data.schema, 'horizontal-group')}

${getExample(data.schema, 'horizontal-inline-group')}

${getExample(data.schema, 'compact-group')}

${getImport(data.schema)}

## Accessibility
- The switch input component should have an accessible label that describes its purpose and state.
- The switch input component should be keyboard accessible, allowing users to use the keyboard to select and activate the switch.
- The switch input component should also have clear visual indication of its state (e.g. switched on or off), and change state when activated by either the mouse or keyboard.

${getAPI(data.schema)}
`;
}
