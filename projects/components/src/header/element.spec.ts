import { html, LitElement } from 'lit';
import '@blueprintui/components/include/header.js';
import { BpHeader } from '@blueprintui/components/header';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-header', () => {
  let fixture: HTMLElement;
  let element: BpHeader;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-header>
        <bp-header-item>item</bp-header-item>
        <bp-header-item>item</bp-header-item>
      </bp-header>
    `);
    element = fixture.querySelector<BpHeader>('bp-header');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-header')).toBe(BpHeader);
  });

  it('should have a role of navigation for header', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('navigation');
  });

  it('should render with internal part', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
  });

  it('should render slot for content', async () => {
    await elementIsStable(element);
    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should have correct CSS custom properties', async () => {
    await elementIsStable(element);
    const computedStyle = getComputedStyle(element);

    expect(computedStyle.getPropertyValue('--padding')).toBe('0');
    expect(computedStyle.getPropertyValue('--background')).toContain('oklch');
    expect(computedStyle.getPropertyValue('--color')).toContain('hsl');
    expect(computedStyle.getPropertyValue('--height')).toBe('calc(1 * 48px)');
    expect(computedStyle.getPropertyValue('--font-size')).toBe('calc(1 * 14px)');
    expect(computedStyle.getPropertyValue('--gap')).toBe('0');
  });

  it('should have full width styling', async () => {
    await elementIsStable(element);
    const computedStyle = getComputedStyle(element);
    expect(computedStyle.width).toBe('784px');
  });

  it('should have internal element with flex display', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    const computedStyle = getComputedStyle(internal);

    expect(computedStyle.display).toBe('flex');
    expect(computedStyle.alignItems).toBe('center');
    expect(computedStyle.width).toBe('784px');
  });

  it('should have internal element with correct height', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    const computedStyle = getComputedStyle(internal);

    expect(computedStyle.height).toBe('48px');
  });

  it('should have internal element with correct background and color', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    const computedStyle = getComputedStyle(internal);

    expect(computedStyle.background).toBeTruthy();
    expect(computedStyle.color).toBeTruthy();
  });

  it('should have internal element with correct padding and gap', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    const computedStyle = getComputedStyle(internal);

    expect(computedStyle.padding).toBe('0px');
    expect(computedStyle.gap).toBe('0px');
  });

  it('should have slotted content', async () => {
    await elementIsStable(element);
    const slottedItems = element.querySelectorAll('bp-header-item');
    expect(slottedItems.length).toBe(2);
  });

  it('should have proper element internals', async () => {
    await elementIsStable(element);
    expect(element._internals).toBeDefined();
    expect(element._internals instanceof ElementInternals).toBe(true);
  });

  it('should have navigation role set by typeNavigation decorator', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('navigation');
  });

  it('should have correct tag name', async () => {
    await elementIsStable(element);
    expect(element.tagName.toLowerCase()).toBe('bp-header');
  });

  it('should extend LitElement', async () => {
    await elementIsStable(element);
    expect(element instanceof LitElement).toBe(true);
  });
});
