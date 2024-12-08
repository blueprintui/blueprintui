import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Progress Dot',
  schema: schema.find(c => c.name === 'progress-dot')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-progress-dot')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'size')}

${getImport(data.schema)}

## Accessibility
- **Screen Readers**: Use \`aria-label\` attribute to provide a meaningful description for screen readers. It's important to set a descriptive label, such as "loading", to indicate the current process.

${getAPI(data.schema)}
`;
}
