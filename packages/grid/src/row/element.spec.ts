import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGridRow } from './element.js';
import '@blueprintui/grid/include/core.js';

describe('bp-grid-row', () => {
  let element: BpGridRow;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-grid-row></bp-grid-row>`);
    element = fixture.querySelector<BpGridRow>('bp-grid-row');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should initialize not selected', async () => {
    await elementIsStable(element);
    expect(element.selected).toBe(undefined);
  });

  it('should initialize with no position', async () => {
    await elementIsStable(element);
    expect(element.position).toBe(undefined);
  });
});
