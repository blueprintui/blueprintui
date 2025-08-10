import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { BpGridColumn } from './element.js';
import '@blueprintui/grid/include/core.js';
import type { BpGrid } from '../grid/element.js';

describe('column-width.controller', () => {
  let elements: BpGridColumn[];
  let grid: BpGrid;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-grid>
        <bp-grid-header>
          <bp-grid-column width="max-content">1</bp-grid-column>
          <bp-grid-column width="150">2</bp-grid-column>
          <bp-grid-column width="200px">3</bp-grid-column>
          <bp-grid-column>4</bp-grid-column>
        </bp-grid-header>
        <bp-grid-row>
          <bp-grid-cell><p style="width: 100px">1</p></bp-grid-cell>
          <bp-grid-cell><p style="width: 100px">2</p></bp-grid-cell>
          <bp-grid-cell><p style="width: 100px">3</p></bp-grid-cell>
          <bp-grid-cell><p style="width: 100px">4</p></bp-grid-cell>
        </bp-grid-row>
      </bp-grid>
    `);
    elements = Array.from(fixture.querySelectorAll<BpGridColumn>('bp-grid-column'));
    grid = fixture.querySelector<BpGrid>('bp-grid');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize each column to its appropriate width', async () => {
    await new Promise(r => setTimeout(r, 0));
    await elementIsStable(grid);
    await elementIsStable(elements[0]);
    await elementIsStable(elements[1]);
    await elementIsStable(elements[2]);
    expect(getComputedStyle(grid).getPropertyValue('--ch1').trim()).toBe('124px');
    expect(getComputedStyle(grid).getPropertyValue('--ch2').trim()).toBe('150px');
    expect(getComputedStyle(grid).getPropertyValue('--ch3').trim()).toBe('200px');
    expect(getComputedStyle(grid).getPropertyValue('--ch4').trim()).toBe('');
  });
});
