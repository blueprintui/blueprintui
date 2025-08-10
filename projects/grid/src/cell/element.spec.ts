import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpGridCell } from './element.js';
import '@blueprintui/grid/include/core.js';

describe('bp-grid-cell', () => {
  let element: BpGridCell;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-grid-cell></bp-grid-cell>`);
    element = fixture.querySelector<BpGridCell>('bp-grid-cell');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('the slot element should be a focusable type', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('slot').hasAttribute('focusable')).toBe(true);
  });
});
