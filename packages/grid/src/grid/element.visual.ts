import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/components/test';
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

  it('basic modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.basic());
    await visualDiff(fixture, 'basic/modern.png');
  });

  it('basic modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.basic(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'basic/modern-dark.png');
  });

  it('async modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.async());
    await visualDiff(fixture, 'async/modern.png');
  });

  it('async modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.async(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'async/modern-dark.png');
  });

  it('row-header modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.rowHeader());
    await visualDiff(fixture, 'row-header/modern.png');
  });

  it('row-header modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.rowHeader(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-header/modern-dark.png');
  });

  it('responsive modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.responsive());
    await visualDiff(fixture, 'responsive/modern.png');
  });

  it('responsive modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.responsive(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'responsive/modern-dark.png');
  });

  it('height modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.height());
    await visualDiff(fixture, 'height/modern.png');
  });

  it('height modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.height(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'height/modern-dark.png');
  });

  it('min height modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.minHeight());
    await visualDiff(fixture, 'min-height/modern.png');
  });

  it('min height modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.minHeight(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'min-height/modern-dark.png');
  });
});
