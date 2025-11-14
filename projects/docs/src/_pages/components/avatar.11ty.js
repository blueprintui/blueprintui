import schema from '../../../../components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Avatar',
  schema: schema.find(c => c.name === 'avatar')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-avatar')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'shapes')}

${getExample(data.schema, 'status')}

${getExample(data.schema, 'sizes')}

${getExample(data.schema, 'initials')}

${getExample(data.schema, 'images')}

${getExample(data.schema, 'icons')}

${getExample(data.schema, 'group')}

${getImport(data.schema)}

## Accessibility

- When slotting an \`<img>\`, use the \`alt\` attribute for accessibility
- For non-image content (initials, icons), use the standard \`aria-label\` attribute on \`<bp-avatar>\` for accessibility
- Image loading behavior (lazy/eager) is controlled via the standard \`loading\` attribute on the slotted \`<img>\` tag
- The component automatically sets \`role="img"\` for proper semantics

${getAPI(data.schema)}
`;
}
