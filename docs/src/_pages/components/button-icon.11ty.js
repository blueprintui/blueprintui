import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Icon',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
  schema: schema.find(c => c.name === 'button-icon')
};

export function render() {
  return /* markdown */`
Action buttons are icons that have specific behaviors. They have the appropriate touch target and states for standard actions, and there are also extended types that provide additional accessible micro-interactions.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
