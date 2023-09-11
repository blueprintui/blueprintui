import { html } from 'lit';
import '@blueprintui/components/include/accordion.js';
import { BpAccordionHeader } from '@blueprintui/components/accordion';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('accordion content element', () => {
  let fixture: HTMLElement;
  let element: BpAccordionHeader;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-accordion-header>hello there</bp-accordion-header>`);
    element = fixture.querySelector<BpAccordionHeader>('bp-accordion-header');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('hello there');
  });

  it('should set a default slot content "accordion-header"', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('accordion-header');
    expect(element.getAttribute('slot')).toBe('accordion-header');
  });

  it('should set a default id', async () => {
    await elementIsStable(element);
    expect(element.id).toBeTruthy();
  });

  it('should use provided id if available', async () => {
    element.id = 'test';
    await elementIsStable(element);
    expect(element.id).toBe('test');
  });

  it('should set visual expand state for button', async () => {
    await elementIsStable(element);
    const expandButton = element.shadowRoot.querySelector('bp-button-expand');

    expect(element.expanded).toBe(false);
    expect(expandButton.checked).toBe(false);
    expect(expandButton.readonly).toBe(true);
    expect(expandButton.orientation).toBe('vertical');

    element.expanded = true;
    await elementIsStable(element);

    expect(element.expanded).toBe(true);
    expect(expandButton.checked).toBe(true);
  });

  it('should set the appropriate aria-expanded state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe('false');

    element.expanded = true;
    await element.updateComplete;
    expect(element._internals.ariaExpanded).toBe('true');
  });
});
