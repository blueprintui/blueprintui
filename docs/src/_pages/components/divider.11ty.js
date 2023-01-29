import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Divider',
  schema: schema.find(c => c.name === 'divider')
};

export function render() {
  return /* markdown */`
The divider component is used to visually separate content into distinct sections. It can be used to separate a group of related items or to indicate a change in content or context.
The divider should be used to separate content, not to create visual emphasis. 

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical')}

${getImport(data.schema)}

## Accessibility
- Avoid using divider as the only way to indicate a change in content or context.

${getAPI(data.schema)}
`;
}
