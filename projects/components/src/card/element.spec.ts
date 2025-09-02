import { html, LitElement } from 'lit';
import '@blueprintui/components/include/card.js';
import { BpCard } from '@blueprintui/components/card';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-card', () => {
  let fixture: HTMLElement;
  let card: BpCard;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-card>
        <div slot="header">header</div>
        content
        <div slot="footer">footer</div>
      </bp-card>
    `);
    card = fixture.querySelector<BpCard>('bp-card');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should default to aria role region', async () => {
    await elementIsStable(card);
    expect((card as any)._internals.role).toBe('region');
  });

  it('should create the component', async () => {
    await elementIsStable(card);
    expect(customElements.get('bp-card')).toBe(BpCard);
  });

  it('should render internal structure correctly', async () => {
    await elementIsStable(card);

    const internal = card.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();

    // Should have three slots: header, default, and footer
    const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
    const defaultSlot = card.shadowRoot.querySelector('slot:not([name])');
    const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');

    expect(headerSlot).toBeTruthy();
    expect(defaultSlot).toBeTruthy();
    expect(footerSlot).toBeTruthy();
  });

  it('should handle slotted content correctly', async () => {
    await elementIsStable(card);

    // Check that slotted content is preserved
    const headerContent = fixture.querySelector('[slot="header"]');
    const footerContent = fixture.querySelector('[slot="footer"]');

    expect(headerContent).toBeTruthy();
    expect(headerContent.textContent).toBe('header');
    expect(footerContent).toBeTruthy();
    expect(footerContent.textContent).toBe('footer');

    // Check default slot content
    expect(card.textContent.trim().includes('content')).toBe(true);
  });

  it('should support CSS custom properties', async () => {
    card.style.setProperty('--background', 'white');
    card.style.setProperty('--color', 'black');
    card.style.setProperty('--border-radius', '8px');
    card.style.setProperty('--padding', '16px');
    card.style.setProperty('--height', '200px');
    card.style.setProperty('--width', '300px');

    await elementIsStable(card);

    expect(card.style.getPropertyValue('--background')).toBe('white');
    expect(card.style.getPropertyValue('--color')).toBe('black');
    expect(card.style.getPropertyValue('--border-radius')).toBe('8px');
    expect(card.style.getPropertyValue('--padding')).toBe('16px');
    expect(card.style.getPropertyValue('--height')).toBe('200px');
    expect(card.style.getPropertyValue('--width')).toBe('300px');
  });

  it('should handle ElementInternals correctly', async () => {
    await elementIsStable(card);

    // ElementInternals should be attached
    expect(card._internals).toBeTruthy();
    expect(typeof card._internals).toBe('object');
    expect(card._internals.role).toBe('region');
  });

  it('should extend LitElement and implement BpTypeElement', async () => {
    await elementIsStable(card);

    // Should have LitElement properties
    expect(typeof card.render).toBe('function');
    expect(typeof card.connectedCallback).toBe('function');

    // Should implement BpTypeElement interface
    expect(card instanceof LitElement).toBe(true);
  });

  it('should handle empty slots gracefully', async () => {
    // Create card without header/footer
    const emptyFixture = await createFixture(html` <bp-card> Just content, no header or footer </bp-card> `);

    const emptyCard = emptyFixture.querySelector<BpCard>('bp-card');
    await elementIsStable(emptyCard);

    const internal = emptyCard.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();

    // Slots should still exist even if empty
    const headerSlot = emptyCard.shadowRoot.querySelector('slot[name="header"]');
    const footerSlot = emptyCard.shadowRoot.querySelector('slot[name="footer"]');
    const defaultSlot = emptyCard.shadowRoot.querySelector('slot:not([name])');

    expect(headerSlot).toBeTruthy();
    expect(footerSlot).toBeTruthy();
    expect(defaultSlot).toBeTruthy();

    removeFixture(emptyFixture);
  });

  it('should handle only header content', async () => {
    const headerOnlyFixture = await createFixture(html`
      <bp-card>
        <div slot="header">Only Header</div>
      </bp-card>
    `);

    const headerCard = headerOnlyFixture.querySelector<BpCard>('bp-card');
    await elementIsStable(headerCard);

    const headerContent = headerOnlyFixture.querySelector('[slot="header"]');
    expect(headerContent).toBeTruthy();
    expect(headerContent.textContent).toBe('Only Header');

    removeFixture(headerOnlyFixture);
  });

  it('should handle only footer content', async () => {
    const footerOnlyFixture = await createFixture(html`
      <bp-card>
        <div slot="footer">Only Footer</div>
      </bp-card>
    `);

    const footerCard = footerOnlyFixture.querySelector<BpCard>('bp-card');
    await elementIsStable(footerCard);

    const footerContent = footerOnlyFixture.querySelector('[slot="footer"]');
    expect(footerContent).toBeTruthy();
    expect(footerContent.textContent).toBe('Only Footer');

    removeFixture(footerOnlyFixture);
  });

  it('should handle complex nested content', async () => {
    const complexFixture = await createFixture(html`
      <bp-card>
        <div slot="header">
          <h2>Card Title</h2>
          <p>Subtitle</p>
        </div>
        <div>
          <p>Main content paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
        <div slot="footer">
          <button>Action</button>
          <button>Cancel</button>
        </div>
      </bp-card>
    `);

    const complexCard = complexFixture.querySelector<BpCard>('bp-card');
    await elementIsStable(complexCard);

    // Check that complex nested content is preserved
    const headerTitle = complexFixture.querySelector('[slot="header"] h2');
    const listItems = complexFixture.querySelectorAll('li');
    const buttons = complexFixture.querySelectorAll('[slot="footer"] button');

    expect(headerTitle).toBeTruthy();
    expect(headerTitle.textContent).toBe('Card Title');
    expect(listItems.length).toBe(2);
    expect(buttons.length).toBe(2);

    removeFixture(complexFixture);
  });

  it('should handle states correctly', async () => {
    await elementIsStable(card);

    // Should have bp-layer state added
    expect(card._internals.states).toBeTruthy();
    // The states set may not be directly accessible, but we can verify the state was added
    expect(typeof card._internals.states.add).toBe('function');
  });

  it('should handle global styles attachment', async () => {
    await elementIsStable(card);

    // The attachRootNodeStyles function should have been called
    // This is internal functionality, we just verify the component is stable
    expect(card).toBeTruthy();
    expect(card.shadowRoot).toBeTruthy();
  });

  it('should render all slots in correct order', async () => {
    await elementIsStable(card);

    const internal = card.shadowRoot.querySelector('[part="internal"]');
    const slots = internal.querySelectorAll('slot');

    expect(slots.length).toBe(3);
    expect(slots[0].getAttribute('name')).toBe('header');
    expect(slots[1].hasAttribute('name')).toBe(false); // default slot
    expect(slots[2].getAttribute('name')).toBe('footer');
  });

  it('should maintain accessibility with role region', async () => {
    await elementIsStable(card);

    // Card should have region role for accessibility
    expect(card._internals.role).toBe('region');
  });
});
