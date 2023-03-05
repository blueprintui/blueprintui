import { html } from 'lit';
import '@blueprintui/components/include/accordion.js';
import { BpAccordion } from '@blueprintui/components/accordion';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

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
});
