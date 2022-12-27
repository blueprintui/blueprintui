import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Dropdown',
  schema: schema.find(c => c.name === 'dropdown')
};

export function render() {
  return /* markdown */`
The dropdown are a is a generic popup component that can be positioned relative to an anchor element.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
