import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGridPlaceholder } from './element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/placeholder.js';

describe('bp-grid-placeholder', () => {
  let element: BpGridPlaceholder;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-grid-placeholder></bp-grid-placeholder>`);
    element = fixture.querySelector<BpGridPlaceholder>('bp-grid-placeholder');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should enable style access via css part "placeholder"', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]')).toBeTruthy();
  });

  it('should show default message', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent.trim()).toBe('no results found');
  });

  it('should show drop target message when draggable', async () => {
    element.setAttribute('draggable', 'false'); // false is a html5 draggable target
    element.requestUpdate();
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent.trim()).toBe('drop item');
  });
});
