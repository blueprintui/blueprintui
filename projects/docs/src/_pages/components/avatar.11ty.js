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

## Shapes

The avatar component supports three different shapes: \`circle\` (default), \`square\`, and \`rounded\`.

${getExample(data.schema, 'shapes')}

## Status Indicator

Add a status indicator to show user availability or state.

${getExample(data.schema, 'status')}

## Sizes

Control the avatar size using the \`--size\` CSS custom property.

${getExample(data.schema, 'sizes')}

## Initials

Display user initials as avatar content.

${getExample(data.schema, 'initials')}

## Images

Use images for avatar content by slotting an \`<img>\` element.

${getExample(data.schema, 'images')}

## Icons

Use custom icons for avatar content.

${getExample(data.schema, 'icons')}

## Avatar Group

Create avatar groups with overlapping avatars using CSS.

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
