import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Panel',
  schema: schema.find(c => c.name === 'panel')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-panel')}

${getExample(data.schema, 'example', { height: '400px' })}

${getExample(data.schema, 'closable', { height: '400px' })}

${getExample(data.schema, 'size', { height: '400px' })}

${getExample(data.schema, 'scroll', { height: '400px' })}

${getImport(data.schema)}

## Accessibility


${getAPI(data.schema)}
`;
}
