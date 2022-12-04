import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGridPlaceholder } from './element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/placeholder.js';

describe('bp-grid-placeholder', () => {
  let component: BpGridPlaceholder;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createFixture(html`<bp-grid-placeholder></bp-grid-placeholder>`);
    component = element.querySelector<BpGridPlaceholder>('bp-grid-placeholder');
  });

  afterEach(() => {
    removeFixture(element);
  });

  it('should create component', async () => {
    await elementIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should enable style access via css part "placeholder"', async () => {
    await elementIsStable(component);
    expect(component.shadowRoot.querySelector('[part=internal]')).toBeTruthy();
  });

  it('should show default message', async () => {
    await elementIsStable(component);
    expect(component.shadowRoot.querySelector('[part=internal]').textContent.trim()).toBe('no results found');
  });

  it('should show drop target message when draggable', async () => {
    component.setAttribute('draggable', 'false'); // false is a html5 draggable target
    component.requestUpdate();
    await elementIsStable(component);
    expect(component.shadowRoot.querySelector('[part=internal]').textContent.trim()).toBe('drop item');
  });
});
