import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Popovers',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/popovers.html',
  schema: schema.find(c => c.name === 'popover'),
  github: 'https://github.com/blueprintui',
  package: {
    name: '@blueprintui/components',
    version: '2.0.0'
  }
}

export function render() {
  return /* markdown */`
<style>
  #example-types + div div div {
    height: 250px !important;
  }
</style>
Blueprint Popovers

${getExample(data.schema, 'types')}
  `;
}