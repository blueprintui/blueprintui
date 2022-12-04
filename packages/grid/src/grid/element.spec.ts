import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGrid } from './element.js';
import '@blueprintui/grid/include/core.js';

describe('bp-grid-cell', () => {
  let component: BpGrid;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createFixture(html`
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
    component = element.querySelector<BpGrid>('bp-grid');
  });

  afterEach(() => {
    removeFixture(element);
  });

  it('should create component', async () => {
    await elementIsStable(component);
    expect(component).toBeTruthy();
  });
});
