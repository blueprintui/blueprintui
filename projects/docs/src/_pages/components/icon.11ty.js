import schema from '../../../../icons/.drafter/schema.json' with { type: 'json' };
import { getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Icon',
  schema: schema.find(c => c.name === 'icon')
};

export function render() {
  return /* markdown */`
<p bp-text="subsection">The icon component provides a flexible way to render SVG-based icons with support for different sizes, types, and visual states.</p>

${getExample(data.schema, 'example')}

${getExample(data.schema, 'size')}

${getExample(data.schema, 'solid')}

${getExample(data.schema, 'badge')}

## Install

### NPM

\`\`\`typescript
// npm package
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/user.js';
\`\`\`

### CDN

\`\`\`html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/icons/include.js/+esm';
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/icons/shapes/user.js/+esm';
</script>
\`\`\`

## Accessibility
- Use a descriptive aria-label attribute to provide text alternative for the icon.
- Decorative icons that do not convey meaning should use \`aria-hidden="true"\`.
- Icons used as interactive elements should have sufficient color contrast.
- Avoid using icons as the only means of conveying information.

${getAPI(data.schema)}
`;
}
