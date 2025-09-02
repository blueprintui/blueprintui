import { html } from 'lit';
import { BpChatMessage } from '@blueprintui/components/chat';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '@blueprintui/components/include/chat.js';

describe('bp-chat-message', () => {
  let fixture: HTMLElement;
  let element: BpChatMessage;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-chat-message></bp-chat-message>`);
    element = fixture.querySelector<BpChatMessage>('bp-chat-message');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-chat-message')).toBe(BpChatMessage);
  });

  it('should have a default role of listitem', () => {
    expect(element._internals.role).toBe('listitem');
  });

  it('should have ElementInternals attached', () => {
    expect(element._internals).toBeDefined();
  });

  it('should have default property values', () => {
    expect(element.type).toBeUndefined();
    expect(element.color).toBeUndefined();
    expect(element.arrow).toBeUndefined();
    expect(element.progress).toBeUndefined();
  });

  it('should show the progress dot when progress is set on the element', async () => {
    expect(element.shadowRoot.querySelector('bp-progress-dot')).toBe(null);

    element.progress = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-progress-dot')).toBeTruthy();
  });

  it('should hide slot content when progress is true', async () => {
    // Add content to slot
    element.innerHTML = '<span>Test message</span>';
    await elementIsStable(element);

    // Initially slot should be visible
    expect(element.shadowRoot.querySelector('slot')).toBeTruthy();

    // When progress is true, slot should be hidden
    element.progress = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('slot')).toBeFalsy();
    expect(element.shadowRoot.querySelector('bp-progress-dot')).toBeTruthy();
  });

  it('should show slot content when progress is false', async () => {
    // Add content to slot
    element.innerHTML = '<span>Test message</span>';
    await elementIsStable(element);

    // Initially slot should be visible
    expect(element.shadowRoot.querySelector('slot')).toBeTruthy();

    // Set progress to true then back to false
    element.progress = true;
    await elementIsStable(element);
    element.progress = false;
    await elementIsStable(element);

    // Slot should be visible again
    expect(element.shadowRoot.querySelector('slot')).toBeTruthy();
    expect(element.shadowRoot.querySelector('bp-progress-dot')).toBeFalsy();
  });

  it('should reflect color attribute to element DOM', async () => {
    expect(element.getAttribute('color')).toBe(null);

    element.color = 'blue';
    await elementIsStable(element);
    expect(element.getAttribute('color')).toBe('blue');
  });

  it('should support all color values', async () => {
    const colors: ('blue' | 'green' | 'red' | 'yellow' | 'purple')[] = ['blue', 'green', 'red', 'yellow', 'purple'];

    for (const color of colors) {
      element.color = color;
      await elementIsStable(element);
      expect(element.getAttribute('color')).toBe(color);
    }
  });

  it('should reflect arrow attribute to element DOM', async () => {
    expect(element.getAttribute('arrow')).toBe(null);

    element.arrow = 'top-end';
    await elementIsStable(element);
    expect(element.getAttribute('arrow')).toBe('top-end');
  });

  it('should support different arrow positions', async () => {
    const positions = [
      'top',
      'right',
      'bottom',
      'left',
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'center'
    ];

    for (const position of positions) {
      element.arrow = position as any;
      await elementIsStable(element);
      expect(element.getAttribute('arrow')).toBe(position);
    }
  });

  it('should reflect type attribute to element DOM', async () => {
    expect(element.getAttribute('type')).toBe(null);

    element.type = 'sent';
    await elementIsStable(element);
    expect(element.getAttribute('type')).toBe('sent');
  });

  it('should support both type values', async () => {
    const types: ('sent' | 'received')[] = ['sent', 'received'];

    for (const type of types) {
      element.type = type;
      await elementIsStable(element);
      expect(element.getAttribute('type')).toBe(type);
    }
  });

  it('should have proper internal structure', () => {
    const internal = element.shadowRoot.querySelector('[part="internal"]');
    const arrow = element.shadowRoot.querySelector('[part="arrow"]');

    expect(internal).toBeTruthy();
    expect(arrow).toBeTruthy();
  });
});
