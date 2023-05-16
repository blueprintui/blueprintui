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

  it('should show the progress dot when progress is set on the element', async () => {
    expect(element.shadowRoot.querySelector('bp-progress-dot')).toBe(null);

    element.progress = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-progress-dot')).toBeTruthy();
  });

  it('should reflect color attribute to element DOM', async () => {
    expect(element.getAttribute('color')).toBe(null);

    element.color = 'blue';
    await elementIsStable(element);
    expect(element.getAttribute('color')).toBe('blue');
  });

  it('should reflect arrow attribute to element DOM', async () => {
    expect(element.getAttribute('arrow')).toBe(null);

    element.arrow = 'top-end';
    await elementIsStable(element);
    expect(element.getAttribute('arrow')).toBe('top-end');
  });
});
