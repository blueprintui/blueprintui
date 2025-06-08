import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Page',
  schema: schema.find(c => c.name === 'page')
};

export function render() {
  return /* markdown */`
<style>
  .element-example {
    bp-page {
      height: 620px;
    }

    bp-page::part(internal) {
      position: relative;
    }
  }
</style>

${getElementSummary(data.schema, 'bp-page')}

${getExample(data.schema, 'example')}

${getImport(data.schema)}

## Accessibility

${getAPI(data.schema)}
`;
}