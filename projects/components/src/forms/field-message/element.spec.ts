import { html } from 'lit';
import '@blueprintui/components/include/forms.js';
import { BpFieldMessage } from '@blueprintui/components/forms';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import type { BpIcon } from '@blueprintui/icons';

describe('bp-field-message element', () => {
  let fixture: HTMLElement;
  let element: BpFieldMessage;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-field-message>message</bp-field-message>`);
    element = fixture.querySelector<BpFieldMessage>('bp-field-message');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('message');
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.status).toBeUndefined();
    expect(element.error).toBeUndefined();
  });

  it('should auto set the host slot', () => {
    expect(element.getAttribute('slot')).toBe('message');
  });

  it('should render status icon', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon')).toBe(null);

    element.status = 'error';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon').shape).toBe('error');

    element.status = 'success';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon').shape).toBe('success');
  });

  it('should get error status icon', async () => {
    element.status = 'error';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=danger]')).toBeTruthy();
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=danger]').shape).toBe('error');
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=success]')).toBe(null);
  });

  it('should get success status icon', async () => {
    element.status = 'success';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=danger]')).toBe(null);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=success]')).toBeTruthy();
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=success]').shape).toBe('success');
  });

  it('should handle error property reflection', async () => {
    await elementIsStable(element);

    element.error = 'valueMissing';
    await elementIsStable(element);
    expect(element.error).toBe('valueMissing');
    expect(element.getAttribute('error')).toBe('valueMissing');

    element.error = 'typeMismatch';
    await elementIsStable(element);
    expect(element.error).toBe('typeMismatch');
    expect(element.getAttribute('error')).toBe('typeMismatch');

    element.error = undefined;
    await elementIsStable(element);
    expect(element.error).toBeUndefined();
    expect(element.hasAttribute('error')).toBe(false);
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--color', 'red');
    element.style.setProperty('--font-size', '14px');
    element.style.setProperty('--font-weight', 'bold');
    element.style.setProperty('--max-width', '200px');
    element.style.setProperty('--min-width', '100px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--color')).toBe('red');
    expect(element.style.getPropertyValue('--font-size')).toBe('14px');
    expect(element.style.getPropertyValue('--font-weight')).toBe('bold');
    expect(element.style.getPropertyValue('--max-width')).toBe('200px');
    expect(element.style.getPropertyValue('--min-width')).toBe('100px');
  });

  it('should handle invalid status values gracefully', async () => {
    await elementIsStable(element);

    // @ts-expect-error - testing invalid value
    element.status = 'invalid';
    await elementIsStable(element);

    // Should not render any icon for invalid status
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon')).toBe(null);
  });

  it('should handle empty content', async () => {
    const emptyFixture = await createFixture(html`<bp-field-message></bp-field-message>`);
    const emptyElement = emptyFixture.querySelector<BpFieldMessage>('bp-field-message');
    await elementIsStable(emptyElement);

    expect(emptyElement.innerText).toBe('');
    expect(emptyElement.shadowRoot.querySelector('[part="internal"]')).toBeTruthy();

    removeFixture(emptyFixture);
  });

  it('should handle status changes', async () => {
    await elementIsStable(element);

    // Start with no status
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon')).toBe(null);

    // Set to error
    element.status = 'error';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=danger]')).toBeTruthy();

    // Set to success
    element.status = 'success';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=success]')).toBeTruthy();
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=danger]')).toBe(null);

    // Clear status
    element.status = undefined;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon')).toBe(null);
  });
});
