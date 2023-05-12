import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import type { BpGrid } from './element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/hover.js';

describe('hover.controller', () => {
  let grid: BpGrid;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`
        <bp-grid>
          <bp-grid-header>
            <bp-grid-column>1</bp-grid-column>
            <bp-grid-column>2</bp-grid-column>
            <bp-grid-column>3</bp-grid-column>
            <bp-grid-column>4</bp-grid-column>
          </bp-grid-header>
          <bp-grid-row>
            <bp-grid-cell>1</bp-grid-cell>
            <bp-grid-cell>2</bp-grid-cell>
            <bp-grid-cell>3</bp-grid-cell>
            <bp-grid-cell>4</bp-grid-cell>
          </bp-grid-row>
        </bp-grid>
      `
    );
    grid = fixture.querySelector<BpGrid>('bp-grid');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize with no :--column-style-hover state', async () => {
    await elementIsStable(grid);
    expect(grid.columnStyle).toBe(undefined);
  });

  // it('should update :--column-style-hover state', async () => {
  //   grid.columnStyle = 'hover';
  //   await elementIsStable(grid);

  //   grid.dispatchEvent(new MouseEvent('mouseover'));
  //   await elementIsStable(grid);
  //   expect(rows[0].matches(':--column-style-hover')).toBe(true);
  // });
});
