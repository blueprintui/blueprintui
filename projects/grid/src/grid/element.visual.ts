import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/test';
import { createGridVisualFixture } from '@blueprintui/grid/test';
import * as examples from './element.examples.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/footer.js';
import '@blueprintui/grid/include/placeholder.js';
import '@blueprintui/components/include/progress-circle.js';

describe('basic', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('basic light theme', async () => {
    fixture = await createGridVisualFixture(examples.basic());
    await visualDiff(fixture, 'basic/light.png');
  });

  it('basic dark theme', async () => {
    fixture = await createGridVisualFixture(examples.basic(), { theme: 'dark' });
    await visualDiff(fixture, 'basic/dark.png');
  });

  it('async light theme', async () => {
    fixture = await createGridVisualFixture(examples.async());
    await visualDiff(fixture, 'async/light.png');
  });

  it('async dark theme', async () => {
    fixture = await createGridVisualFixture(examples.async(), { theme: 'dark' });
    await visualDiff(fixture, 'async/dark.png');
  });

  it('row-header light theme', async () => {
    fixture = await createGridVisualFixture(examples.rowHeader());
    await visualDiff(fixture, 'row-header/light.png');
  });

  it('row-header dark theme', async () => {
    fixture = await createGridVisualFixture(examples.rowHeader(), { theme: 'dark' });
    await visualDiff(fixture, 'row-header/dark.png');
  });

  it('responsive light theme', async () => {
    fixture = await createGridVisualFixture(examples.responsive());
    await visualDiff(fixture, 'responsive/light.png');
  });

  it('responsive dark theme', async () => {
    fixture = await createGridVisualFixture(examples.responsive(), { theme: 'dark' });
    await visualDiff(fixture, 'responsive/dark.png');
  });

  it('height light theme', async () => {
    fixture = await createGridVisualFixture(examples.height());
    await visualDiff(fixture, 'height/light.png');
  });

  it('height dark theme', async () => {
    fixture = await createGridVisualFixture(examples.height(), { theme: 'dark' });
    await visualDiff(fixture, 'height/dark.png');
  });

  it('min height light theme', async () => {
    fixture = await createGridVisualFixture(examples.minHeight());
    await visualDiff(fixture, 'min-height/light.png');
  });

  it('min height dark theme', async () => {
    fixture = await createGridVisualFixture(examples.minHeight(), { theme: 'dark' });
    await visualDiff(fixture, 'min-height/dark.png');
  });
});
