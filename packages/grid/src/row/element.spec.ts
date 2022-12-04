import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGridRow } from './element.js';
import '@blueprintui/grid/include/core.js';

describe('bp-grid-row', () => {
  let component: BpGridRow;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createFixture(html`<bp-grid-row></bp-grid-row>`);
    component = element.querySelector<BpGridRow>('bp-grid-row');
  });

  afterEach(() => {
    removeFixture(element);
  });

  it('should create component', async () => {
    await elementIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should initialize not selected', async () => {
    await elementIsStable(component);
    expect(component.selected).toBe(undefined);
  });

  it('should initialize with no position', async () => {
    await elementIsStable(component);
    expect(component.position).toBe(undefined);
  });
});
