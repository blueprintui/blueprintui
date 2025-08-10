import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpColor } from '@blueprintui/components/color';
import '@blueprintui/components/include/color.js';

describe('bp-search', () => {
  let element: BpColor;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>color</label>
        <bp-color></bp-color>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpColor>('bp-color');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-color')).toBe(BpColor);
  });

  it('should default its input type to "color"', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('color');
  });

  it('should render the color-picker icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-button-icon');
    expect(icon.shape).toBe('color-picker');
  });

  it('should disable color button if input is disabled', async () => {
    const icon = element.shadowRoot.querySelector('bp-button-icon');
    await elementIsStable(element);
    expect(icon.disabled).toBe(undefined);

    element.disabled = true;
    await elementIsStable(element);
    expect(icon.disabled).toBe(true);
  });

  it('should apply invalid styles when the state is invalid and touched', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(true);
  });
});
