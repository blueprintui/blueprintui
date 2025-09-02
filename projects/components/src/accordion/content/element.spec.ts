import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { BpAccordionContent } from '@blueprintui/components/accordion';
import '@blueprintui/components/include/accordion.js';

describe('accordion content element', () => {
  let fixture: HTMLElement;
  let element: BpAccordionContent;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <bp-accordion-content>hello there</bp-accordion-content>
        <bp-accordion-content id="hello">hello there</bp-accordion-content>`
    );
    element = fixture.querySelector<BpAccordionContent>('bp-accordion-content');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('hello there');
  });

  it('should set a default slot content "accordion-content"', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('accordion-content');
    expect(element.getAttribute('slot')).toBe('accordion-content');
  });

  it('should set a default id', async () => {
    await elementIsStable(element);
    expect(element.id).toBeTruthy();
  });

  it('should use provided id if available', async () => {
    const el = fixture.querySelector('#hello');
    await elementIsStable(el);
    expect(el.id).toBe('hello');
  });

  it('should render with correct internal structure', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
    expect(internal?.tagName).toBe('DIV');
  });

  it('should have layer attribute on internal element', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal?.hasAttribute('layer')).toBe(true);
  });

  it('should have part="internal" attribute on internal element', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal?.getAttribute('part')).toBe('internal');
  });

  it('should render slot content correctly', async () => {
    await elementIsStable(element);
    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
    expect(element.innerText).toBe('hello there');
  });

  it('should allow CSS custom properties to be overridden', async () => {
    element.style.setProperty('--color', 'red');
    element.style.setProperty('--font-size', '20px');
    element.style.setProperty('--font-weight', 'bold');
    element.style.setProperty('--background', 'blue');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--color')).toBe('red');
    expect(element.style.getPropertyValue('--font-size')).toBe('20px');
    expect(element.style.getPropertyValue('--font-weight')).toBe('bold');
    expect(element.style.getPropertyValue('--background')).toBe('blue');
  });

  it('should maintain slot assignment after reconnection', async () => {
    await elementIsStable(element);
    const originalSlot = element.slot;

    // Simulate disconnection and reconnection
    element.remove();
    fixture.appendChild(element);
    await elementIsStable(element);

    expect(element.slot).toBe(originalSlot);
    expect(element.getAttribute('slot')).toBe('accordion-content');
  });

  it('should preserve existing id when reconnected', async () => {
    const el = fixture.querySelector('#hello') as BpAccordionContent;
    await elementIsStable(el);
    const originalId = el.id;

    // Simulate disconnection and reconnection
    el.remove();
    fixture.appendChild(el);
    await elementIsStable(el);

    expect(el.id).toBe(originalId);
  });
});
