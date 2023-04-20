import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/components/test';
import { createGridVisualFixture } from '@blueprintui/grid/test';
import * as examples from './element.examples.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/placeholder.js';
import '@blueprintui/components/include/progress-circle.js';

describe('cell', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('border modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.border());
    await visualDiff(fixture, 'border/modern.png');
  });

  it('border modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.border(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'border/modern-dark.png');
  });

  it('column border modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnBorder());
    await visualDiff(fixture, 'column-border/modern.png');
  });

  it('column border modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnBorder(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-border/modern-dark.png');
  });

  it('row border modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.rowBorder());
    await visualDiff(fixture, 'row-border/modern.png');
  });

  it('row border modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.rowBorder(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-border/modern-dark.png');
  });

  it('no border modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.noBorder());
    await visualDiff(fixture, 'no-border/modern.png');
  });

  it('no border modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.noBorder(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'no-border/modern-dark.png');
  });
});
