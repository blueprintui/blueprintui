import schema from '../../../../packages/typography/dist/docs/examples/schema.json';
import { getExample } from '../../_includes/utils/index.js';

export const data = {
  title: 'Typography',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/typography.html',
  schema: schema[0]
}

export function render() {
  return /* markdown */`
Blueprint Typography provides an out-of-the-box tool kit for consistent type styles.
BlueprintUI Typeography can be [used standalone](https://type.blueprintui.dev/) or combined with the rest of the BlueprintUI components.


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
