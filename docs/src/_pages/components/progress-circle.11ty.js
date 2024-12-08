import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Progress Circle',
  schema: schema.find(c => c.name === 'progress-circle')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-progress-circle')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'progress-circle-loading')}

${getImport(data.schema)}

## Accessibility
- The progress circle should be visually accessible, with clear, contrasting colors.
- The progress percentage should be indicated to assistive technologies, such as screen readers.
- The label accompanying the progress circle should also be accessible to assistive technologies.

${getAPI(data.schema)}
`;
}
