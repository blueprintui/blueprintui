import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/components/test';
import { createGridVisualFixture } from '@blueprintui/grid/test';
import * as examples from './element.examples.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/keynav.js';
import '@blueprintui/grid/include/footer.js';
import '@blueprintui/grid/include/pagination.js';

describe('pagination', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('pagination modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.pagination());
    await visualDiff(fixture, 'pagination/modern.png');
  });

  it('pagination modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.pagination(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'pagination/modern-dark.png');
  });

  it('pagination custom modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.paginationCustom());
    await visualDiff(fixture, 'pagination-custom/modern.png');
  });

  it('pagination custom modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.paginationCustom(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'pagination-custom/modern-dark.png');
  });
});
