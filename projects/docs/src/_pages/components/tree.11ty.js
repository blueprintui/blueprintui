import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tree',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/treeview/',
  schema: schema.find(c => c.name === 'tree')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-tree')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'multi-selectable')}

Multiple tree items can be selected when setting \`selectable="multi"\` on the tree element. Use the \`selectable\` attribute/property to mark a tree item as selected.

${getExample(data.schema, 'selectable')}

Multiple tree items can be selected when setting \`selectable="single"\` on the tree element. Use the \`selectable\` attribute/property to mark a tree item as selected.

${getExample(data.schema, 'icons')}

${getExample(data.schema, 'links')}

${getExample(data.schema, 'stateless')}

By default the tree component is stateless. To have full control of the state omit the \`interaction="auto"\` attribute.

${getImport(data.schema)}

## Accessibility
- Ensure proper color contrast for text and icons to accommodate users with visual impairments.
- Include descriptive labels and tooltips for nodes to assist screen readers in conveying information accurately.

${getAPI(data.schema)}
`;
}
