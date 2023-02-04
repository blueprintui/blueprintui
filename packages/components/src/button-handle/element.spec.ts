import { html } from 'lit';
import '@blueprintui/components/include/button-handle.js';
import { BpButtonHandle } from '@blueprintui/components/button-handle';
import { elementIsStable, createFixture, onceEvent, removeFixture } from '@blueprintui/components/test';

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

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('bp-button-icon')).toBe(true);
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
});
