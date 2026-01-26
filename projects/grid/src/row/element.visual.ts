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
import '@blueprintui/components/include/button-group.js';
import '@blueprintui/icons/shapes/highlighter.js';
import '@blueprintui/icons/shapes/attachment.js';
import '@blueprintui/icons/shapes/add.js';
import '@blueprintui/icons/shapes/trash.js';

describe('row', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('multi-select light theme', async () => {
    fixture = await createGridVisualFixture(examples.multiSelect());
    await visualDiff(fixture, 'row-multi-select/light.png');
  });

  it('multi-select dark theme', async () => {
    fixture = await createGridVisualFixture(examples.multiSelect(), { theme: 'dark' });
    await visualDiff(fixture, 'row-multi-select/dark.png');
  });

  it('single-select light theme', async () => {
    fixture = await createGridVisualFixture(examples.singleSelect());
    await visualDiff(fixture, 'row-single-select/light.png');
  });

  it('single-select dark theme', async () => {
    fixture = await createGridVisualFixture(examples.singleSelect(), { theme: 'dark' });
    await visualDiff(fixture, 'row-single-select/dark.png');
  });

  it('height light theme', async () => {
    fixture = await createGridVisualFixture(examples.height());
    await visualDiff(fixture, 'row-height/light.png');
  });

  it('height dark theme', async () => {
    fixture = await createGridVisualFixture(examples.height(), { theme: 'dark' });
    await visualDiff(fixture, 'row-height/dark.png');
  });

  it('action light theme', async () => {
    fixture = await createGridVisualFixture(examples.action());
    await visualDiff(fixture, 'row-action/light.png');
  });

  it('action dark theme', async () => {
    fixture = await createGridVisualFixture(examples.action(), { theme: 'dark' });
    await visualDiff(fixture, 'row-action/dark.png');
  });

  it('action-bulk light theme', async () => {
    fixture = await createGridVisualFixture(examples.actionBulk());
    await visualDiff(fixture, 'row-action-bulk/light.png');
  });

  it('action-bulk dark theme', async () => {
    fixture = await createGridVisualFixture(examples.actionBulk(), { theme: 'dark' });
    await visualDiff(fixture, 'row-action-bulk/dark.png');
  });

  it('sticky light theme', async () => {
    fixture = await createGridVisualFixture(examples.sticky());
    await visualDiff(fixture, 'row-sticky/light.png');
  });

  it('sticky dark theme', async () => {
    fixture = await createGridVisualFixture(examples.sticky(), { theme: 'dark' });
    await visualDiff(fixture, 'row-sticky/dark.png');
  });

  it('stripe light theme', async () => {
    fixture = await createGridVisualFixture(examples.stripe());
    await visualDiff(fixture, 'row-stripe/light.png');
  });

  it('stripe dark theme', async () => {
    fixture = await createGridVisualFixture(examples.stripe(), { theme: 'dark' });
    await visualDiff(fixture, 'row-stripe/dark.png');
  });

  it('fixed light theme', async () => {
    fixture = await createGridVisualFixture(examples.fixed());
    await visualDiff(fixture, 'row-fixed/light.png');
  });

  it('fixed dark theme', async () => {
    fixture = await createGridVisualFixture(examples.fixed(), { theme: 'dark' });
    await visualDiff(fixture, 'row-fixed/dark.png');
  });

  it('sort light theme', async () => {
    fixture = await createGridVisualFixture(examples.sort());
    await visualDiff(fixture, 'row-sort/light.png');
  });

  it('sort dark theme', async () => {
    fixture = await createGridVisualFixture(examples.sort(), { theme: 'dark' });
    await visualDiff(fixture, 'row-sort/dark.png');
  });

  it('row-groups light theme', async () => {
    fixture = await createGridVisualFixture(examples.groups());
    await visualDiff(fixture, 'row-groups/light.png');
  });

  it('row-groups dark theme', async () => {
    fixture = await createGridVisualFixture(examples.groups(), { theme: 'dark' });
    await visualDiff(fixture, 'row-groups/dark.png');
  });
});
