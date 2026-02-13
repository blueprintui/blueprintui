import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Number Stepper',
  schema: schema.find(c => c.name === 'number-stepper')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-number-stepper')}

A number input with explicit increment/decrement buttons in a horizontal minus-input-plus layout. This component provides a more touch-friendly and visually explicit interface for numeric input compared to standard number inputs.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'basic')}

${getExample(data.schema, 'decimal')}

${getExample(data.schema, 'currency')}

${getExample(data.schema, 'continuous-stepping')}

${getExample(data.schema, 'custom-icons')}

${getExample(data.schema, 'readonly')}

${getExample(data.schema, 'disabled')}

${getExample(data.schema, 'validation')}

${getExample(data.schema, 'vertical')}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- **Keyboard Navigation**: Tab to focus input, arrow keys work within input, Space/Enter activate focused stepper buttons
- **ARIA Attributes**: Stepper buttons have \`aria-label="increment"\` and \`aria-label="decrement"\`, input has \`role="spinbutton"\` with \`aria-valuemin\`, \`aria-valuemax\`, \`aria-valuenow\`
- **Button States**: Decrement button disabled at min value, increment button disabled at max value
- **Focus Management**: Clear focus indicators on input and buttons
- **Screen Reader**: Announces current value and button availability

## Behavior Notes
1. **Button States**: Decrement button automatically disables when value reaches \`min\`, increment button disables at \`max\`
2. **Validation**: Manual input is validated against \`min\`, \`max\`, and \`step\` values
3. **Keyboard Shortcuts**: When input is focused, arrow up/down increment/decrement by step value
4. **Touch Targets**: Buttons are minimum 44x44px tap targets for mobile accessibility
5. **Continuous Stepping**: When \`continuousStepping\` is enabled, holding a button will repeatedly increment/decrement
6. **Native Steppers**: Set \`hideStepper="true"\` to remove browser's default up/down arrows from the input field

${getAPI(data.schema)}
`;
}
