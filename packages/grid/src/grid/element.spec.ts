import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGrid } from './element.js';
import '@blueprintui/grid/include/core.js';

describe('bp-grid-cell', () => {
  let element: BpGrid;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-grid>
        <bp-grid-column>col 1</bp-grid-column>
        <bp-grid-column>col 2</bp-grid-column>
        <bp-grid-column>col 3</bp-grid-column>
        <bp-grid-column>col 4</bp-grid-column>
        <bp-grid-row>
          <bp-grid-cell>cell 1</bp-grid-cell>
          <bp-grid-cell>cell 2</bp-grid-cell>
          <bp-grid-cell>cell 3</bp-grid-cell>
          <bp-grid-cell>cell 4</bp-grid-cell>
        </bp-grid-row>
        <bp-grid-row>
          <bp-grid-cell>cell 1</bp-grid-cell>
          <bp-grid-cell>cell 2</bp-grid-cell>
          <bp-grid-cell>cell 3</bp-grid-cell>
          <bp-grid-cell>cell 4</bp-grid-cell>
        </bp-grid-row>
      </bp-grid>
    `);
    element = fixture.querySelector<BpGrid>('bp-grid');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });
});
