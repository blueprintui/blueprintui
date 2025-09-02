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

  it('should render internal div with part attribute', () => {
    const internalDiv = element.shadowRoot?.querySelector('div[part="internal"]');
    expect(internalDiv).toBeTruthy();
  });

  it('should render slot for content', () => {
    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should have ElementInternals attached', () => {
    expect(element._internals).toBeDefined();
    expect(element._internals instanceof ElementInternals).toBe(true);
  });

  it('should render slotted content', async () => {
    fixture = await createFixture(html`
      <bp-chat-group>
        <div>Test content</div>
      </bp-chat-group>
    `);
    element = fixture.querySelector<BpChatGroup>('bp-chat-group');
    await elementIsStable(element);

    const slottedContent = element.querySelector('div');
    expect(slottedContent).toBeTruthy();
    expect(slottedContent?.textContent).toBe('Test content');
  });

  it('should have correct CSS part attribute on internal div', () => {
    const internalDiv = element.shadowRoot?.querySelector('div');
    expect(internalDiv?.getAttribute('part')).toBe('internal');
  });

  it('should have base styles applied', () => {
    expect(BpChatGroup.styles).toBeDefined();
    expect(Array.isArray(BpChatGroup.styles)).toBe(true);
    expect(BpChatGroup.styles.length).toBeGreaterThan(0);
  });

  it('should have correct component styles structure', () => {
    expect(BpChatGroup.styles).toBeInstanceOf(Array);
    expect(BpChatGroup.styles.length).toBeGreaterThan(0);
  });

  it('should properly implement BpTypeElement interface', () => {
    expect(element._internals).toBeDefined();
    expect(typeof element.render).toBe('function');
  });

  it('should have correct shadow DOM structure', () => {
    const shadowRoot = element.shadowRoot;
    expect(shadowRoot).toBeTruthy();

    const internalDiv = shadowRoot?.querySelector('div[part="internal"]');
    expect(internalDiv).toBeTruthy();

    const slot = internalDiv?.querySelector('slot');
    expect(slot).toBeTruthy();
    expect(slot?.hasAttribute('name')).toBe(false); // default slot
  });

  it('should maintain accessibility attributes after reconnection', async () => {
    // Remove and re-add to DOM to trigger reconnection
    element.remove();
    fixture.appendChild(element);
    await elementIsStable(element);

    expect(element._internals.role).toBe('log');
    expect(element._internals.ariaLive).toBe('polite');
    expect(element._internals.ariaRelevant).toBe('additions');
    expect(element._internals.ariaAtomic).toBe('false');
  });

  it('should render empty content when no slotted content', () => {
    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
    expect(slot?.assignedElements().length).toBe(0);
  });

  it('should handle multiple slotted elements', async () => {
    fixture = await createFixture(html`
      <bp-chat-group>
        <div>First message</div>
        <div>Second message</div>
        <div>Third message</div>
      </bp-chat-group>
    `);
    element = fixture.querySelector<BpChatGroup>('bp-chat-group');
    await elementIsStable(element);

    const slottedElements = element.querySelectorAll('div');
    expect(slottedElements.length).toBe(3);
    expect(slottedElements[0].textContent).toBe('First message');
    expect(slottedElements[1].textContent).toBe('Second message');
    expect(slottedElements[2].textContent).toBe('Third message');
  });

  it('should maintain ElementInternals reference after property changes', async () => {
    const originalInternals = element._internals;
    // Trigger a render cycle
    element.requestUpdate();
    await elementIsStable(element);

    expect(element._internals).toBe(originalInternals);
    expect(element._internals.role).toBe('log');
  });

  it('should have correct tag name', () => {
    expect(element.tagName.toLowerCase()).toBe('bp-chat-group');
  });

  it('should be instanceof BpChatGroup', () => {
    expect(element).toBeInstanceOf(BpChatGroup);
  });
});
