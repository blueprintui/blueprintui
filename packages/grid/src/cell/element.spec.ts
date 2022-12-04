import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGridCell } from './element.js';
import '@blueprintui/grid/include/core.js';

describe('bp-grid-cell', () => {
  let component: BpGridCell;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createFixture(html`<bp-grid-cell></bp-grid-cell>`);
    component = element.querySelector<BpGridCell>('bp-grid-cell');
  });

  afterEach(() => {
    removeFixture(element);
  });

  it('should create component', async () => {
    await elementIsStable(component);
    expect(component).toBeTruthy();
  });

  it('the slot element should be a focusable type', async () => {
    await elementIsStable(component);
    expect(component.shadowRoot.querySelector('slot').hasAttribute('focusable')).toBe(true);
  });
});
