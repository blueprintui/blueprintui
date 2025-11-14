import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Skeleton',
  schema: schema.find(c => c.name === 'skeleton')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-skeleton')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'effect')}

${getExample(data.schema, 'shape')}

${getExample(data.schema, 'avatar')}

${getExample(data.schema, 'text-lines')}

${getExample(data.schema, 'card-layout')}

${getExample(data.schema, 'image-layout')}

${getExample(data.schema, 'custom-colors')}

${getImport(data.schema)}

## Accessibility
- The skeleton component has a presentation role by default
- The aria-live attribute is set to "polite" to announce loading state changes
- Use skeletons to indicate that content is loading without disrupting the user's experience
- Ensure that the skeleton matches the general structure and layout of the content it represents

## Usage Guidelines
- Use skeletons to represent loading states for various UI elements (text, images, cards, etc.)
- Match the skeleton shape and size to the content it will eventually display
- Use the \`pulse\` effect for subtle, ambient loading indicators
- Use the \`sheen\` effect for more prominent loading states that draw attention
- Use the \`none\` effect when you need static placeholder shapes
- For circular content (avatars, profile pictures), use \`shape="circle"\` with equal width and height
- Group multiple skeletons together to represent complex layouts during loading

${getAPI(data.schema)}
`;
}
