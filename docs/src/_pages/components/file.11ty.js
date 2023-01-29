import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'File',
  schema: schema.find(c => c.name === 'file')
};

export function render() {
  return /* markdown */`
The file input component allows users to select and upload one or multiple files from their local device.
The label for the file input should be clear and descriptive, and should indicate the types of files that are accepted.
Provide clear instructions on how to upload files, including maximum file size and accepted file types.

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
