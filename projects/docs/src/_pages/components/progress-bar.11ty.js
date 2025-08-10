import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Progress Bar',
  schema: schema.find(c => c.name === 'progress-bar')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-progress-bar')}

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
