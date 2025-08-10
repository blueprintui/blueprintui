import { html } from 'lit';
import { BpChatGroup } from '@blueprintui/components/chat';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '@blueprintui/components/include/chat.js';

describe('bp-chat-group', () => {
  let fixture: HTMLElement;
  let element: BpChatGroup;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-chat-group></bp-chat-group>`);
    element = fixture.querySelector<BpChatGroup>('bp-chat-group');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-chat-group')).toBe(BpChatGroup);
  });

  it('should have a default role of log', () => {
    expect(element._internals.role).toBe('log');
  });

  it('should have a default aria-live', () => {
    expect(element._internals.ariaLive).toBe('polite');
  });

  it('should have a default aria-relevant', () => {
    expect(element._internals.ariaRelevant).toBe('additions');
  });

  it('should have a default aria-atomic', () => {
    expect(element._internals.ariaAtomic).toBe('false');
  });
});
