import schema from '../../../..//grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Footer',
  tags: [],
  schema: schema.find(c => c.name === 'footer')
}

export function render() {
  return /* markdown */`
The footer component can be used to display contextual information or interactions.

${getExample(data.schema, 'footer')}

${getExample(data.schema, 'footer-actions')}

${getExample(data.schema, 'no-footer')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/footer.js'])}

${getAPI(data.schema)}
  `;
}