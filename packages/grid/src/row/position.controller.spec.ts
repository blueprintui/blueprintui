import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpGridRow } from './element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/row-position.js';

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

  it('should initialize with no position', async () => {
    await elementIsStable(element);
    expect(element.position).toBe(undefined);
    expect(getComputedStyle(element).getPropertyValue('--scroll-padding-top')).toBe('');
  });

  it('should add scroll padding top if position fixed', async () => {
    element.position = 'fixed';
    await elementIsStable(element);
    expect(element.position).toBe('fixed');
    expect(fixture.style.getPropertyValue('--scroll-padding-top')).toBe('calc(var(--row-height) * 2)');
  });

  it('should add scroll padding top if position sticky', async () => {
    element.position = 'sticky';
    await elementIsStable(element);
    expect(element.position).toBe('sticky');
    expect(fixture.style.getPropertyValue('--scroll-padding-top')).toBe('calc(var(--row-height) * 2)');
  });
});
