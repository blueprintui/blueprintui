import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import type { BpGridColumn } from './element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/column-alignment.js';

describe('column-alignment.controller', () => {
  let elements: BpGridColumn[];
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-grid>
        <bp-grid-header>
          <bp-grid-column>1</bp-grid-column>
          <bp-grid-column alignment="start">2</bp-grid-column>
          <bp-grid-column alignment="center">3</bp-grid-column>
          <bp-grid-column alignment="end">4</bp-grid-column>
        </bp-grid-header>
        <bp-grid-row>
          <bp-grid-cell>1</bp-grid-cell>
          <bp-grid-cell>2</bp-grid-cell>
          <bp-grid-cell>3</bp-grid-cell>
          <bp-grid-cell>4</bp-grid-cell>
        </bp-grid-row>
      </bp-grid>
    `);
    elements = Array.from(fixture.querySelectorAll<BpGridColumn>('bp-grid-column'));
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize the column with the correct alignment state', async () => {
    await elementIsStable(elements[0]);

    expect(elements[0].matches(':state(alignment-start)')).toBe(false);
    expect(elements[0].matches(':state(alignment-center)')).toBe(false);
    expect(elements[0].matches(':state(alignment-end)')).toBe(false);

    expect(elements[1].matches(':state(alignment-start)')).toBe(true);
    expect(elements[1].matches(':state(alignment-center)')).toBe(false);
    expect(elements[1].matches(':state(alignment-end)')).toBe(false);

    expect(elements[2].matches(':state(alignment-start)')).toBe(false);
    expect(elements[2].matches(':state(alignment-center)')).toBe(true);
    expect(elements[2].matches(':state(alignment-end)')).toBe(false);

    expect(elements[3].matches(':state(alignment-start)')).toBe(false);
    expect(elements[3].matches(':state(alignment-center)')).toBe(false);
    expect(elements[3].matches(':state(alignment-end)')).toBe(true);
  });

  it('should update the column with the correct alignment state when changed', async () => {
    await elementIsStable(elements[0]);

    expect(elements[0].matches(':state(alignment-start)')).toBe(false);
    expect(elements[0].matches(':state(alignment-center)')).toBe(false);
    expect(elements[0].matches(':state(alignment-end)')).toBe(false);

    elements[0].alignment = 'center';
    await elementIsStable(elements[0]);

    expect(elements[0].matches(':state(alignment-start)')).toBe(false);
    expect(elements[0].matches(':state(alignment-center)')).toBe(true);
    expect(elements[0].matches(':state(alignment-end)')).toBe(false);
  });
});
