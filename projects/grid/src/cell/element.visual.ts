import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/test';
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

  it('border light theme', async () => {
    fixture = await createGridVisualFixture(examples.border());
    await visualDiff(fixture, 'border/light.png');
  });

  it('border dark theme', async () => {
    fixture = await createGridVisualFixture(examples.border(), { theme: 'dark' });
    await visualDiff(fixture, 'border/dark.png');
  });

  it('column border light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnBorder());
    await visualDiff(fixture, 'column-border/light.png');
  });

  it('column border dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnBorder(), { theme: 'dark' });
    await visualDiff(fixture, 'column-border/dark.png');
  });

  it('row border light theme', async () => {
    fixture = await createGridVisualFixture(examples.rowBorder());
    await visualDiff(fixture, 'row-border/light.png');
  });

  it('row border dark theme', async () => {
    fixture = await createGridVisualFixture(examples.rowBorder(), { theme: 'dark' });
    await visualDiff(fixture, 'row-border/dark.png');
  });

  it('no border light theme', async () => {
    fixture = await createGridVisualFixture(examples.noBorder());
    await visualDiff(fixture, 'no-border/light.png');
  });

  it('no border dark theme', async () => {
    fixture = await createGridVisualFixture(examples.noBorder(), { theme: 'dark' });
    await visualDiff(fixture, 'no-border/dark.png');
  });
});
