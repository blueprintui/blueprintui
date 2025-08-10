import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/clipboard.js';
import type { BpGrid } from '../grid/element.js';

describe('column-width.controller', () => {
  let grid: BpGrid;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-grid>
        <bp-grid-header>
          <bp-grid-column>col</bp-grid-column>
          <bp-grid-column>col</bp-grid-column>
          <bp-grid-column>col</bp-grid-column>
          <bp-grid-column>col</bp-grid-column>
        </bp-grid-header>
        <bp-grid-row>
          <bp-grid-cell>cell</bp-grid-cell>
          <bp-grid-cell>cell</bp-grid-cell>
          <bp-grid-cell>cell</bp-grid-cell>
          <bp-grid-cell>cell</bp-grid-cell>
        </bp-grid-row>
      </bp-grid>
    `);
    grid = fixture.querySelector<BpGrid>('bp-grid');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should allow grid to be copied to clipboard', async () => {
    await elementIsStable(grid);
    expect(grid).toBeDefined();
    // todo: permissions issues with test runner
    // const gridCell = grid.querySelector('bp-grid-cell');
    // gridCell.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    // grid.dispatchEvent(new ClipboardEvent('copy'));
    // const clipboardData = await navigator.clipboard.readText();
    // expect(clipboardData).toContain('<table');
  });
});
