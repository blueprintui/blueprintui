import { html } from 'lit';
import '@blueprintui/components/include/accordion.js';
import { BpAccordionContent, BpAccordionHeader, BpAccordionPanel } from '@blueprintui/components/accordion';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('accordion panel element', () => {
  let fixture: HTMLElement;
  let element: BpAccordionPanel;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-accordion-panel>
        <bp-accordion-header>header</bp-accordion-header>
        <bp-accordion-content>content</bp-accordion-content>
      </bp-accordion-panel>
    `);
    element = fixture.querySelector<BpAccordionPanel>('bp-accordion-panel');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should set a default slot "accordion-panel"', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('accordion-panel');
    expect(element.getAttribute('slot')).toBe('accordion-panel');
  });

  it('should associate header and content element control labeling', async () => {
    await elementIsStable(element);

    const header = fixture.querySelector<BpAccordionHeader>('bp-accordion-header');
    const content = fixture.querySelector<BpAccordionContent>('bp-accordion-content');

    expect(header.getAttribute('aria-controls')).toBe(content.id);
    expect(content.getAttribute('aria-labelledby')).toBe(header.id);
  });
});
