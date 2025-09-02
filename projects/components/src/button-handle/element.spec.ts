import { html } from 'lit';
import '@blueprintui/components/include/button-handle.js';
import { BpButtonHandle } from '@blueprintui/components/button-handle';
import { elementIsStable, createFixture, onceEvent, removeFixture } from '@blueprintui/test';

describe('button-handle element', () => {
  let fixture: HTMLElement;
  let element: BpButtonHandle;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-handle></bp-button-handle>`);
    element = fixture.querySelector<BpButtonHandle>('bp-button-handle');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-handle')).toBe(BpButtonHandle);
  });

  it('should display drag-handle icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('drag-handle');
  });

  it('should set bp-draggable attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('bp-draggable')).toBe('handle');
  });

  it('should set pressed on space keypress', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'keydown');
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));

    await event;
    await elementIsStable(element);
    expect(element.pressed).toBe(true);
  });

  it('should have default shape property', async () => {
    await elementIsStable(element);
    expect(element.shape).toBe('drag-handle');
  });

  it('should update shape property', async () => {
    await elementIsStable(element);
    element.shape = 'custom-shape';
    await elementIsStable(element);
    expect(element.shape).toBe('custom-shape');
  });

  it('should reflect direction attribute', async () => {
    await elementIsStable(element);
    element.direction = 'up';
    await elementIsStable(element);
    expect(element.getAttribute('direction')).toBe('up');
  });

  it('should update direction property', async () => {
    await elementIsStable(element);
    element.direction = 'down';
    await elementIsStable(element);
    expect(element.direction).toBe('down');
  });

  it('should initialize pressed to false', async () => {
    await elementIsStable(element);
    expect(element.pressed).toBe(false);
  });

  it('should toggle pressed state on multiple space keypresses', async () => {
    await elementIsStable(element);

    // First space keypress - should set pressed to true
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    await elementIsStable(element);
    expect(element.pressed).toBe(true);

    // Second space keypress - should set pressed to false
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    await elementIsStable(element);
    expect(element.pressed).toBe(false);
  });

  it('should not change pressed state on non-space keypress', async () => {
    await elementIsStable(element);
    const initialPressed = element.pressed;

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
    await elementIsStable(element);
    expect(element.pressed).toBe(initialPressed);
  });

  it('should render icon with solid type when pressed', async () => {
    await elementIsStable(element);
    element.pressed = true;
    await elementIsStable(element);

    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.type).toBe('solid');
  });

  it('should render icon with solid type when expanded', async () => {
    await elementIsStable(element);
    element.expanded = true;
    await elementIsStable(element);

    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.type).toBe('solid');
  });

  it('should render icon with empty type when not pressed or expanded', async () => {
    await elementIsStable(element);
    element.pressed = false;
    element.expanded = false;
    await elementIsStable(element);

    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.type).toBe('');
  });

  it('should render slot content when provided', async () => {
    fixture = await createFixture(html`<bp-button-handle><span>Custom content</span></bp-button-handle>`);
    element = fixture.querySelector<BpButtonHandle>('bp-button-handle');
    await elementIsStable(element);

    const slot = element.shadowRoot.querySelector('slot');
    const assignedElements = slot.assignedElements();
    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].textContent).toBe('Custom content');
  });

  it('should render default icon when no slot content', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon).toBeTruthy();
    expect(icon.shape).toBe('drag-handle');
  });
});
