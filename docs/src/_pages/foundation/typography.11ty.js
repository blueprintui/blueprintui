import schema from '../../../../packages/typography/dist/drafter/schema.json';
import { getExample } from '../../_includes/utils/index.js';

export const data = {
  title: 'Typography',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/typography.html',
  schema: schema[0],
  github: 'https://github.com/blueprintui',
  package: {
    name: '@blueprintui/typography',
    version: '1.0.0'
  }
}

export function render() {
  return /* markdown */`
Blueprint Typography provides an out-of-the-box tool kit for consistent type styles.
BlueprintUI Typography can be used standalone of other BlueprintUI components and utilities.

- Automatic contrast adjustment
- Semantic size types for enhanced readability
- Responsive sizing for optimal display
- Text transformation capabilities
- Customizable theming options

## Installation

\`\`\`shell
npm install @blueprintui/typography
\`\`\`

\`\`\`css
@import '@blueprintui/typography/index.min.css';
\`\`\`


${getExample(data.schema, 'content')}

${getExample(data.schema, 'alignment')}

${getExample(data.schema, 'size')}

${getExample(data.schema, 'static-size')}

${getExample(data.schema, 'auto-contrast')}

${getExample(data.schema, 'fill')}

${getExample(data.schema, 'link')}

${getExample(data.schema, 'list')}

${getExample(data.schema, 'style')}

${getExample(data.schema, 'transforms')}
  `;
}
