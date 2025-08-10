import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import { styles } from '../test.js';
import * as grid from './grid.examples.js';

describe('grid', () => {
  let fixture;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${styles} ${unsafeHTML(grid.example())} ${unsafeHTML(grid.auto())} ${unsafeHTML(grid.columns())}
        ${unsafeHTML(grid.explicitColumns())} ${unsafeHTML(grid.allColumns())} ${unsafeHTML(grid.nested())}
        ${unsafeHTML(grid.responsive())} ${unsafeHTML(grid.responsiveContainer())}
        ${unsafeHTML(grid.responsiveColumns())} ${unsafeHTML(grid.gap())} ${unsafeHTML(grid.columnStartEnd())}
        ${unsafeHTML(grid.rowStartEnd())} ${unsafeHTML(grid.alignment())} ${unsafeHTML(grid.stretch())}
      `,
      { width: '1000px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('grid layout', async () => {
    await visualDiff(fixture, 'grid.png');
  });
});
