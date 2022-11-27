
import { html } from 'lit';
import '@blueprintui/components/include/button-sort.js';
import { BpButtonSort } from '@blueprintui/components/button-sort';
import { elementIsStable, createFixture, emulateClick, onceEvent, removeFixture } from '@blueprintui/components/test';

describe('button-sort element', () => {
  let fixture: HTMLElement;
  let element: BpButtonSort;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-sort></bp-button-sort>`);
    element = fixture.querySelector<BpButtonSort>('bp-button-sort');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('bp-button-icon')).toBe(true);
  });

  it('should display angle icons with directions', async () => {    
    await elementIsStable(element);
    const icons = element.shadowRoot.querySelectorAll('bp-icon');
    expect(icons[0].shape).toBe('angle');
    expect(icons[1].shape).toBe('angle');
    expect(icons[0].direction).toBe('up');
    expect(icons[1].direction).toBe('down');
  });

  it('should set a default ariaLabel', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('sort');
  });

  it('should emit sort event on click', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'sort');
    emulateClick(element);
    await elementIsStable(element);
    expect((await event)?.detail).toBe('none');
  });
});
