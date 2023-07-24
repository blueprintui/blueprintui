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
});
