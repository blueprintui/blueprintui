import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/test';
import { createGridVisualFixture } from '@blueprintui/grid/test';
import * as examples from './element.examples.js';
import '@blueprintui/components/include/pagination.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/keynav.js';
import '@blueprintui/grid/include/footer.js';

describe('footer', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('footer light theme', async () => {
    fixture = await createGridVisualFixture(examples.footer());
    await visualDiff(fixture, 'footer/light.png');
  });

  it('footer dark theme', async () => {
    fixture = await createGridVisualFixture(examples.footer(), { theme: 'dark' });
    await visualDiff(fixture, 'footer/dark.png');
  });

  it('footer actions light theme', async () => {
    fixture = await createGridVisualFixture(examples.footerActions());
    await visualDiff(fixture, 'footer-actions/light.png');
  });

  it('footer actions dark theme', async () => {
    fixture = await createGridVisualFixture(examples.footerActions(), { theme: 'dark' });
    await visualDiff(fixture, 'footer-actions/dark.png');
  });

  it('pagination light theme', async () => {
    fixture = await createGridVisualFixture(examples.pagination());
    await visualDiff(fixture, 'pagination/light.png');
  });

  it('pagination dark theme', async () => {
    fixture = await createGridVisualFixture(examples.pagination(), { theme: 'dark' });
    await visualDiff(fixture, 'pagination/dark.png');
  });

  it('pagination custom light theme', async () => {
    fixture = await createGridVisualFixture(examples.paginationCustom());
    await visualDiff(fixture, 'pagination-custom/light.png');
  });

  it('pagination custom dark theme', async () => {
    fixture = await createGridVisualFixture(examples.paginationCustom(), { theme: 'dark' });
    await visualDiff(fixture, 'pagination-custom/dark.png');
  });
});
