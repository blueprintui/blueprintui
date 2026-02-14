import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpColor } from '@blueprintui/components/color';
import '@blueprintui/components/include/color.js';

describe('bp-color', () => {
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
    expect(icon.disabled).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(icon.disabled).toBe(true);
  });

  it('should handle touched state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(true);
  });

  it('should set readonly on color picker button when EyeDropper is not available', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-button-icon');

    // Mock EyeDropper as undefined
    const originalEyeDropper = (globalThis as any).EyeDropper;
    (globalThis as any).EyeDropper = undefined;

    // Re-render to update the readonly state
    element.requestUpdate();
    await elementIsStable(element);

    expect(icon.readonly).toBe(true);

    // Restore EyeDropper
    (globalThis as any).EyeDropper = originalEyeDropper;
  });

  it('should not set readonly on color picker button when EyeDropper is available', async () => {
    await elementIsStable(element);

    // Mock EyeDropper as available
    const originalEyeDropper = (globalThis as any).EyeDropper;
    (globalThis as any).EyeDropper = class MockEyeDropper {
      open() {
        return Promise.resolve({ sRGBHex: '#ff0000' });
      }
    };

    // Re-render to update the readonly state
    element.requestUpdate();
    await elementIsStable(element);

    // Re-query the icon after re-render
    const updatedIcon = element.shadowRoot.querySelector('bp-button-icon');
    expect(updatedIcon.hasAttribute('readonly')).toBe(false);

    // Restore EyeDropper
    (globalThis as any).EyeDropper = originalEyeDropper;
  });

  it('should update value when color is selected via EyeDropper', async () => {
    await elementIsStable(element);

    // Mock EyeDropper
    const originalEyeDropper = (globalThis as any).EyeDropper;
    (globalThis as any).EyeDropper = class MockEyeDropper {
      open() {
        return Promise.resolve({ sRGBHex: '#ff0000' });
      }
    };

    const icon = element.shadowRoot.querySelector('bp-button-icon');
    icon.click();

    // Wait for the async operation
    await new Promise(resolve => setTimeout(resolve, 0));
    await elementIsStable(element);

    expect(element.value).toBe('#ff0000');

    // Restore EyeDropper
    (globalThis as any).EyeDropper = originalEyeDropper;
  });

  it('should handle EyeDropper cancellation gracefully', async () => {
    await elementIsStable(element);

    // Mock EyeDropper that rejects (user cancels)
    const originalEyeDropper = (globalThis as any).EyeDropper;
    (globalThis as any).EyeDropper = class MockEyeDropper {
      open() {
        return Promise.reject(new Error('User cancelled'));
      }
    };

    const icon = element.shadowRoot.querySelector('bp-button-icon');
    const initialValue = element.value;

    icon.click();

    // Wait for the async operation
    await new Promise(resolve => setTimeout(resolve, 0));
    await elementIsStable(element);

    // Value should remain unchanged
    expect(element.value).toBe(initialValue);

    // Restore EyeDropper
    (globalThis as any).EyeDropper = originalEyeDropper;
  });

  it('should render suffix template with color picker button', async () => {
    await elementIsStable(element);

    // Check that the color picker button is rendered in the suffix area
    const icon = element.shadowRoot.querySelector('bp-button-icon');
    expect(icon).toBeTruthy();
    expect(icon.shape).toBe('color-picker');
    expect(icon.action).toBe('inline');
  });
});
