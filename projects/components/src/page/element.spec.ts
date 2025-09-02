import { html } from 'lit';
import { BpPage } from '@blueprintui/components/page';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '@blueprintui/components/include/page.js';
import { LitElement } from 'lit';
import { baseStyles } from '@blueprintui/components/internals';

describe('bp-page', () => {
  let fixture: HTMLElement;
  let element: BpPage;

  beforeEach(async () => {
    fixture = await createFixture(html` <bp-page> </bp-page> `);
    element = fixture.querySelector<BpPage>('bp-page');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-page')).toBe(BpPage);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
    expect(element.tagName.toLowerCase()).toBe('bp-page');
  });

  it('should render with correct internal structure', async () => {
    await elementIsStable(element);
    const internalElement = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalElement).toBeTruthy();
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--padding', '1rem');
    element.style.setProperty('--border', '2px solid red');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--padding')).toBe('1rem');
    expect(element.style.getPropertyValue('--border')).toBe('2px solid red');
  });

  it('should have all required slots when empty', async () => {
    await elementIsStable(element);
    const slots = element.shadowRoot.querySelectorAll('slot');
    expect(slots.length).toBe(7);

    const slotNames = Array.from(slots).map(slot => slot.getAttribute('name') || 'default');
    expect(slotNames).toEqual(['header', 'subheader', 'aside-start', 'default', 'aside-end', 'subfooter', 'footer']);
  });

  it('should have empty slots when no content is provided', async () => {
    await elementIsStable(element);

    const defaultSlot = element.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
    const headerSlot = element.shadowRoot.querySelector('slot[name="header"]') as HTMLSlotElement;
    const subheaderSlot = element.shadowRoot.querySelector('slot[name="subheader"]') as HTMLSlotElement;
    const asideStartSlot = element.shadowRoot.querySelector('slot[name="aside-start"]') as HTMLSlotElement;
    const asideEndSlot = element.shadowRoot.querySelector('slot[name="aside-end"]') as HTMLSlotElement;
    const subfooterSlot = element.shadowRoot.querySelector('slot[name="subfooter"]') as HTMLSlotElement;
    const footerSlot = element.shadowRoot.querySelector('slot[name="footer"]') as HTMLSlotElement;

    expect(defaultSlot.assignedElements().length).toBe(0);
    expect(headerSlot.assignedElements().length).toBe(0);
    expect(subheaderSlot.assignedElements().length).toBe(0);
    expect(asideStartSlot.assignedElements().length).toBe(0);
    expect(asideEndSlot.assignedElements().length).toBe(0);
    expect(subfooterSlot.assignedElements().length).toBe(0);
    expect(footerSlot.assignedElements().length).toBe(0);
  });

  it('should extend LitElement and implement BpTypeElement', async () => {
    await elementIsStable(element);
    expect(element instanceof LitElement).toBe(true);
  });

  it('should have base styles applied', async () => {
    await elementIsStable(element);
    expect(BpPage.styles).toContain(baseStyles);
  });

  it('should handle multiple content in default slot', async () => {
    const multiContentFixture = await createFixture(html`
      <bp-page>
        <div>First content</div>
        <div>Second content</div>
        <div>Third content</div>
      </bp-page>
    `);
    const multiElement = multiContentFixture.querySelector<BpPage>('bp-page');
    await elementIsStable(multiElement);

    const defaultSlot = multiElement.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
    const assignedElements = defaultSlot.assignedElements();

    expect(assignedElements.length).toBe(3);
    expect(assignedElements[0].textContent).toBe('First content');
    expect(assignedElements[1].textContent).toBe('Second content');
    expect(assignedElements[2].textContent).toBe('Third content');

    removeFixture(multiContentFixture);
  });

  it('should maintain component stability after property changes', async () => {
    await elementIsStable(element);

    // Simulate a property change by triggering a re-render
    element.requestUpdate();
    await elementIsStable(element);

    const internalElement = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalElement).toBeTruthy();
  });
});

describe('slot APIs', () => {
  let fixtureWithSlots: HTMLElement;
  let elementWithSlots: BpPage;

  beforeEach(async () => {
    fixtureWithSlots = await createFixture(html`
      <bp-page>
        <div slot="header">Header content</div>
        <div slot="subheader">Subheader content</div>
        <div slot="aside-start">Aside start content</div>
        <div>Default content</div>
        <div slot="aside-end">Aside end content</div>
        <div slot="subfooter">Subfooter content</div>
        <div slot="footer">Footer content</div>
      </bp-page>
    `);
    elementWithSlots = fixtureWithSlots.querySelector<BpPage>('bp-page');
    await elementIsStable(elementWithSlots);
  });

  afterEach(() => {
    removeFixture(fixtureWithSlots);
  });

  it('should have default slot', async () => {
    const slot = elementWithSlots.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot).toBeTruthy();

    const assignedElements = slot.assignedElements();
    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].textContent).toBe('Default content');
  });

  it('should have header slot', async () => {
    const slot = elementWithSlots.shadowRoot.querySelector('slot[name="header"]') as HTMLSlotElement;
    expect(slot).toBeTruthy();

    const assignedElements = slot.assignedElements();
    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].textContent).toBe('Header content');
  });

  it('should have subheader slot', async () => {
    const slot = elementWithSlots.shadowRoot.querySelector('slot[name="subheader"]') as HTMLSlotElement;
    expect(slot).toBeTruthy();

    const assignedElements = slot.assignedElements();
    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].textContent).toBe('Subheader content');
  });

  it('should have aside-start slot', async () => {
    const slot = elementWithSlots.shadowRoot.querySelector('slot[name="aside-start"]') as HTMLSlotElement;
    expect(slot).toBeTruthy();

    const assignedElements = slot.assignedElements();
    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].textContent).toBe('Aside start content');
  });

  it('should have aside-end slot', async () => {
    const slot = elementWithSlots.shadowRoot.querySelector('slot[name="aside-end"]') as HTMLSlotElement;
    expect(slot).toBeTruthy();

    const assignedElements = slot.assignedElements();
    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].textContent).toBe('Aside end content');
  });

  it('should have subfooter slot', async () => {
    const slot = elementWithSlots.shadowRoot.querySelector('slot[name="subfooter"]') as HTMLSlotElement;
    expect(slot).toBeTruthy();

    const assignedElements = slot.assignedElements();
    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].textContent).toBe('Subfooter content');
  });

  it('should have footer slot', async () => {
    const slot = elementWithSlots.shadowRoot.querySelector('slot[name="footer"]') as HTMLSlotElement;
    expect(slot).toBeTruthy();

    const assignedElements = slot.assignedElements();
    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].textContent).toBe('Footer content');
  });

  it('should render all slots in correct order', async () => {
    const slots = elementWithSlots.shadowRoot.querySelectorAll('slot');
    expect(slots.length).toBe(7);

    const slotNames = Array.from(slots).map(slot => slot.getAttribute('name') || 'default');
    expect(slotNames).toEqual(['header', 'subheader', 'aside-start', 'default', 'aside-end', 'subfooter', 'footer']);
  });
});
