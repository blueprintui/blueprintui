import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Progress Dot',
  schema: schema.find(c => c.name === 'progress-dot')
};

export function render() {
  return /* markdown */`
The Progress dot component is designed to indicate that a process is ongoing. It gives users feedback that the system is processing the task and that they need to wait.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'size')}

${getImport(data.schema)}

## Accessibility
- **Screen Readers**: Use \`aria-label\` attribute to provide a meaningful description for screen readers. It's important to set a descriptive label, such as "loading", to indicate the current process.

${getAPI(data.schema)}
`;
}
