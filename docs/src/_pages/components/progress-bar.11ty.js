import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Progress Bar',
  schema: schema.find(c => c.name === 'progress-bar')
};

export function render() {
  return /* markdown */`
The progress bar component displays the progress of a task, usually on a scale from 0 to 100%. It can be used to show the progress of a download, upload, form completion, or any other process that can be represented as a percentage.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'progress-bar-indeterminate')}

${getImport(data.schema)}

## Accessibility
- Provide a label that accurately describes the purpose of the progress bar
- Use a visually distinguishable color to show the progress of the task
- Ensure the contrast ratio between the bar color and its background is high enough to meet accessibility standards
- Provide alternative text to describe the progress bar for users who use screen readers

${getAPI(data.schema)}
`;
}
