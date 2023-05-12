import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/test';
import { createGridVisualFixture } from '@blueprintui/grid/test';
import * as examples from './element.examples.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/keynav.js';
import '@blueprintui/grid/include/hover.js';
import '@blueprintui/grid/include/row-position.js';
import '@blueprintui/components/include/checkbox.js';
import '@blueprintui/components/include/radio.js';
import '@blueprintui/components/include/button-sort.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/button-expand.js';
import '@blueprintui/components/include/search.js';
import '@blueprintui/components/include/button-icon-group.js';
import '@blueprintui/icons/shapes/highlighter.js';
import '@blueprintui/icons/shapes/attachment.js';
import '@blueprintui/icons/shapes/add.js';
import '@blueprintui/icons/shapes/trash.js';

describe('row', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('multi-select modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.multiSelect());
    await visualDiff(fixture, 'row-multi-select/modern.png');
  });

  it('multi-select modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.multiSelect(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-multi-select/modern-dark.png');
  });

  it('single-select modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.singleSelect());
    await visualDiff(fixture, 'row-single-select/modern.png');
  });

  it('single-select modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.singleSelect(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-single-select/modern-dark.png');
  });

  it('height modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.height());
    await visualDiff(fixture, 'row-height/modern.png');
  });

  it('height modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.height(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-height/modern-dark.png');
  });

  it('action modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.action());
    await visualDiff(fixture, 'row-action/modern.png');
  });

  it('action modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.action(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-action/modern-dark.png');
  });

  it('action-bulk modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.actionBulk());
    await visualDiff(fixture, 'row-action-bulk/modern.png');
  });

  it('action-bulk modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.actionBulk(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-action-bulk/modern-dark.png');
  });

  it('sticky modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.sticky());
    await visualDiff(fixture, 'row-sticky/modern.png');
  });

  it('sticky modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.sticky(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-sticky/modern-dark.png');
  });

  it('stripe modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.stripe());
    await visualDiff(fixture, 'row-stripe/modern.png');
  });

  it('stripe modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.stripe(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-stripe/modern-dark.png');
  });

  it('fixed modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.fixed());
    await visualDiff(fixture, 'row-fixed/modern.png');
  });

  it('fixed modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.fixed(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-fixed/modern-dark.png');
  });

  it('sort modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.sort());
    await visualDiff(fixture, 'row-sort/modern.png');
  });

  it('sort modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.sort(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-sort/modern-dark.png');
  });
  it('sort modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.sort());
    await visualDiff(fixture, 'row-sort/modern.png');
  });

  it('sort modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.sort(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-sort/modern-dark.png');
  });

  it('row-groups modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.groups());
    await visualDiff(fixture, 'row-groups/modern.png');
  });

  it('row-groups modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.groups(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'row-groups/modern-dark.png');
  });
});
