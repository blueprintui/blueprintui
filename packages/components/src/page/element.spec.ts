import { html } from 'lit';
import { BpPage } from '@blueprintui/components/page';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '@blueprintui/components/include/page.js';

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
