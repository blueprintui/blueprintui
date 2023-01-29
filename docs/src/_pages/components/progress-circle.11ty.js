import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Progress Circle',
  schema: schema.find(c => c.name === 'progress-circle')
};

export function render() {
  return /* markdown */`
The progress circle component displays a visual representation of progress in the form of a circle. It is useful for showing the progress of a task in a compact, easy-to-understand manner.

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
