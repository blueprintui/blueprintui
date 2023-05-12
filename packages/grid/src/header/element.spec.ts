import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpGridHeader } from './element.js';
import '@blueprintui/grid/include/core.js';

describe('bp-grid-header', () => {
  let element: BpGridHeader;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-grid-header></bp-grid-header>`);
    element = fixture.querySelector<BpGridHeader>('bp-grid-header');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should default to the header slot for host', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('header');
  });
});
