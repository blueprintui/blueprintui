import { html } from 'lit';
import '@blueprintui/components/include/tabs.js';
import { BpTabList } from '@blueprintui/components/tabs';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-tab-list', () => {
  let fixture: HTMLElement;
  let element: BpTabList;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-tab-list></bp-tab-list>`);
    element = fixture.querySelector<BpTabList>('bp-tab-list');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-tab-list')).toBe(BpTabList);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should have proper ARIA role', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('tablist');
  });

  it('should assign tablist slot', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('tablist');
  });

  it('should render slot content', async () => {
    fixture = await createFixture(html`
      <bp-tab-list>
        <div>tab 1</div>
        <div>tab 2</div>
      </bp-tab-list>
    `);
    element = fixture.querySelector<BpTabList>('bp-tab-list');
    await elementIsStable(element);

    expect(element.innerHTML).toContain('tab 1');
    expect(element.innerHTML).toContain('tab 2');
  });

  it('should have internal part', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
  });

  it('should maintain slot assignment after reconnection', async () => {
    await elementIsStable(element);
    const originalSlot = element.slot;

    // Simulate disconnection and reconnection
    element.remove();
    fixture.appendChild(element);
    await elementIsStable(element);

    expect(element.slot).toBe(originalSlot);
    expect(element.getAttribute('slot')).toBe('tablist');
  });

  it('should maintain role after reconnection', async () => {
    await elementIsStable(element);

    // Simulate disconnection and reconnection
    element.remove();
    fixture.appendChild(element);
    await elementIsStable(element);

    expect((element as any)._internals.role).toBe('tablist');
  });

  it('should handle CSS custom properties', async () => {
    element.style.setProperty('--background', 'red');
    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
  });

  it('should render nested tabs correctly', async () => {
    fixture = await createFixture(html`
      <bp-tab-list>
        <bp-tab>Tab 1</bp-tab>
        <bp-tab>Tab 2</bp-tab>
        <bp-tab>Tab 3</bp-tab>
      </bp-tab-list>
    `);
    element = fixture.querySelector<BpTabList>('bp-tab-list');
    await elementIsStable(element);

    const tabs = element.querySelectorAll('bp-tab');
    expect(tabs.length).toBe(3);
  });

  it('should have proper internal structure', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal?.tagName).toBe('DIV');

    const slot = internal?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should apply baseStyles', async () => {
    await elementIsStable(element);
    expect((element.constructor as typeof BpTabList).styles).toBeTruthy();
    expect((element.constructor as typeof BpTabList).styles.length).toBeGreaterThan(0);
  });
});
