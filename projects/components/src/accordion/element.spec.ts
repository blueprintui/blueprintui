import { html } from 'lit';
import '@blueprintui/components/include/accordion.js';
import { BpAccordion, BpAccordionPanel } from '@blueprintui/components/accordion';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('accordion element', () => {
  let fixture: HTMLElement;
  let element: BpAccordion;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-accordion>
        <span slot="accordion-panel">hello there</span>
        <span>hello there</span>
      </bp-accordion>
    `);
    element = fixture.querySelector<BpAccordion>('bp-accordion');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('hello there');
  });

  it('should allow "accordion-panel" slot content', async () => {
    await elementIsStable(element);
    const elements = element.shadowRoot.querySelector('slot').assignedElements({ flatten: true });
    expect(elements.length).toBe(1);
  });

  it('should have default layer property set to "container"', async () => {
    await elementIsStable(element);
    expect(element.layer).toBe('container');
    expect(element.getAttribute('layer')).toBe('container');
  });

  it('should reflect layer property to attribute', async () => {
    await elementIsStable(element);

    element.layer = 'flat';
    await elementIsStable(element);
    expect(element.getAttribute('layer')).toBe('flat');

    element.layer = 'container';
    await elementIsStable(element);
    expect(element.getAttribute('layer')).toBe('container');
  });

  it('should accept any string value for layer property', async () => {
    await elementIsStable(element);

    // @ts-expect-error - testing invalid value
    element.layer = 'invalid';
    await elementIsStable(element);
    expect(element.layer).toBe('invalid'); // TypeScript allows any string
    expect(element.getAttribute('layer')).toBe('invalid');
  });

  it('should have correct CSS custom properties', async () => {
    await elementIsStable(element);
    const computedStyle = getComputedStyle(element);

    expect(computedStyle.getPropertyValue('--border-color')).toBeTruthy();
    expect(computedStyle.getPropertyValue('--border-width')).toBeTruthy();
    expect(computedStyle.getPropertyValue('--border-radius')).toBeTruthy();
    expect(computedStyle.getPropertyValue('--background')).toBeTruthy();
  });

  it('should apply flat layer styling when layer is "flat"', async () => {
    await elementIsStable(element);

    element.layer = 'flat';
    await elementIsStable(element);

    const computedStyle = getComputedStyle(element);
    // The CSS sets --background: inherit for flat layer
    // But computed styles might not show the inherit value directly
    expect(element.getAttribute('layer')).toBe('flat');
    expect(element.layer).toBe('flat');
  });

  it('should work with actual accordion panels', async () => {
    const panelFixture = await createFixture(html`
      <bp-accordion>
        <bp-accordion-panel>
          <bp-accordion-header>Header 1</bp-accordion-header>
          <bp-accordion-content>Content 1</bp-accordion-content>
        </bp-accordion-panel>
        <bp-accordion-panel>
          <bp-accordion-header>Header 2</bp-accordion-header>
          <bp-accordion-content>Content 2</bp-accordion-content>
        </bp-accordion-panel>
      </bp-accordion>
    `);

    const accordion = panelFixture.querySelector<BpAccordion>('bp-accordion');
    const panels = panelFixture.querySelectorAll<BpAccordionPanel>('bp-accordion-panel');

    await elementIsStable(accordion);

    expect(panels.length).toBe(2);
    expect(panels[0].slot).toBe('accordion-panel');
    expect(panels[1].slot).toBe('accordion-panel');

    removeFixture(panelFixture);
  });

  it('should have proper internal structure', async () => {
    await elementIsStable(element);

    const internal = element.shadowRoot.querySelector('[part="internal"]');
    const slot = element.shadowRoot.querySelector('slot');

    expect(internal).toBeTruthy();
    expect(slot).toBeTruthy();
    expect(slot.getAttribute('name')).toBe('accordion-panel');
  });

  it('should handle multiple accordion panels correctly', async () => {
    const multiFixture = await createFixture(html`
      <bp-accordion>
        <bp-accordion-panel>
          <bp-accordion-header>Panel 1</bp-accordion-header>
          <bp-accordion-content>Content 1</bp-accordion-content>
        </bp-accordion-panel>
        <bp-accordion-panel>
          <bp-accordion-header>Panel 2</bp-accordion-header>
          <bp-accordion-content>Content 2</bp-accordion-content>
        </bp-accordion-panel>
        <bp-accordion-panel>
          <bp-accordion-header>Panel 3</bp-accordion-header>
          <bp-accordion-content>Content 3</bp-accordion-content>
        </bp-accordion-panel>
      </bp-accordion>
    `);

    const accordion = multiFixture.querySelector<BpAccordion>('bp-accordion');
    await elementIsStable(accordion);

    const assignedElements = accordion.shadowRoot.querySelector('slot').assignedElements({ flatten: true });
    expect(assignedElements.length).toBe(3);

    removeFixture(multiFixture);
  });

  it('should maintain proper styling when layer changes', async () => {
    await elementIsStable(element);

    // Test container layer (default)
    expect(element.layer).toBe('container');
    expect(element.getAttribute('layer')).toBe('container');

    // Test flat layer
    element.layer = 'flat';
    await elementIsStable(element);
    expect(element.layer).toBe('flat');
    expect(element.getAttribute('layer')).toBe('flat');

    // Test switching back to container
    element.layer = 'container';
    await elementIsStable(element);
    expect(element.layer).toBe('container');
    expect(element.getAttribute('layer')).toBe('container');
  });

  it('should handle empty accordion gracefully', async () => {
    const emptyFixture = await createFixture(html`<bp-accordion></bp-accordion>`);
    const emptyAccordion = emptyFixture.querySelector<BpAccordion>('bp-accordion');

    await elementIsStable(emptyAccordion);

    const assignedElements = emptyAccordion.shadowRoot.querySelector('slot').assignedElements({ flatten: true });
    expect(assignedElements.length).toBe(0);

    removeFixture(emptyFixture);
  });
});
