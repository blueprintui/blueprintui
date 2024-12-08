import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'File',
  schema: schema.find(c => c.name === 'file')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-file')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- Use appropriate \`label\` or \`aria-label\` and \`aria-describedby\` to provide an accessible name and description for the input.
- Use the \`accept\` attribute to specify the types of files that are accepted by the file input field.
- Use the \`multiple\` attribute to allow users to select and upload multiple files.

${getAPI(data.schema)}
`;
}
