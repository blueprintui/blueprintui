import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import '@blueprintui/grid/include/core.js';
import { BpGrid } from '@blueprintui/grid';
import { exportCSV } from '@blueprintui/grid/csv';

describe('csv', () => {
  let element: BpGrid;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <bp-grid>
        <bp-grid-column>1</bp-grid-column>
        <bp-grid-column>2</bp-grid-column>
        <bp-grid-column>3</bp-grid-column>
        <bp-grid-column>4</bp-grid-column>
        <bp-grid-row>
          <bp-grid-cell>5</bp-grid-cell>
          <bp-grid-cell>6</bp-grid-cell>
          <bp-grid-cell>7</bp-grid-cell>
          <bp-grid-cell>8</bp-grid-cell>
        </bp-grid-row>
        <bp-grid-row>
          <bp-grid-cell>9</bp-grid-cell>
          <bp-grid-cell>10</bp-grid-cell>
          <bp-grid-cell>11</bp-grid-cell>
          <bp-grid-cell>12</bp-grid-cell>
        </bp-grid-row>
      </bp-grid>`
    );
    element = fixture.querySelector<BpGrid>('bp-grid');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should return a CSV format of the text content within grid', async () => {
    await elementIsStable(element);
    expect(exportCSV(element)).toBe(`1,2,3,4\n5,6,7,8\n9,10,11,12`);
  });
});
