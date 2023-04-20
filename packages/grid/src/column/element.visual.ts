import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/components/test';
import { createGridVisualFixture } from '@blueprintui/grid/test';
import * as examples from './element.examples.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/keynav.js';
import '@blueprintui/grid/include/column-alignment.js';
import '@blueprintui/grid/include/column-position.js';
import '@blueprintui/grid/include/footer.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/view-columns.js';
import '@blueprintui/icons/shapes/filter.js';
import '@blueprintui/components/include/checkbox.js';
import '@blueprintui/components/include/dropdown.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/dropdown.js';
import '@blueprintui/components/include/search.js';

describe('column', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('align-center modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.alignCenter());
    await visualDiff(fixture, 'column-align-center/modern.png');
  });

  it('align-center modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.alignCenter(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-align-center/modern-dark.png');
  });

  it('align-end modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.alignEnd());
    await visualDiff(fixture, 'column-align-end/modern.png');
  });

  it('align-end modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.alignEnd(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-align-end/modern-dark.png');
  });

  it('align-start modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.alignStart());
    await visualDiff(fixture, 'column-align-start/modern.png');
  });

  it('align-start modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.alignStart(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-align-start/modern-dark.png');
  });

  it('fixed-width modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.fixedWidth());
    await visualDiff(fixture, 'column-fixed-width/modern.png');
  });

  it('fixed-width modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.fixedWidth(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-fixed-width/modern-dark.png');
  });

  it('percentage-width modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.percentageWidth());
    await visualDiff(fixture, 'column-percentage-width/modern.png');
  });

  it('percentage-width modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.percentageWidth(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-percentage-width/modern-dark.png');
  });

  it('horizontal-scroll modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.horizontalScroll());
    await visualDiff(fixture, 'horizontal-scroll/modern.png');
  });

  it('horizontal-scroll modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.horizontalScroll(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'horizontal-scroll/modern-dark.png');
  });

  it('overflow modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.overflow());
    await visualDiff(fixture, 'column-overflow/modern.png');
  });

  it('overflow modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.overflow(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-overflow/modern-dark.png');
  });

  it('position-fixed modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.positionFixed());
    await visualDiff(fixture, 'column-position-fixed/modern.png');
  });

  it('position-fixed modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.positionFixed(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-position-fixed/modern-dark.png');
  });

  it('position-multi-fixed modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.positionMultiFixed());
    await visualDiff(fixture, 'column-position-multi-fixed/modern.png');
  });

  it('position-multi-fixed modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.positionMultiFixed(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-position-multi-fixed/modern-dark.png');
  });

  it('position-sticky modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.positionSticky());
    await visualDiff(fixture, 'column-position-sticky/modern.png');
  });

  it('position-sticky modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.positionSticky(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-position-sticky/modern-dark.png');
  });

  it('column-visibility modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnVisibility());
    await visualDiff(fixture, 'column-visibility/modern.png');
  });

  it('column-visibility modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnVisibility(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-visibility/modern-dark.png');
  });

  it('column-filter modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnFilter());
    await visualDiff(fixture, 'column-filter/modern.png');
  });

  it('column-filter modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnFilter(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-filter/modern-dark.png');
  });

  it('column-filter-multi modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnFilterMulti());
    await visualDiff(fixture, 'column-filter-multi/modern.png');
  });

  it('column-filter-multi modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnFilterMulti(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-filter-multi/modern-dark.png');
  });

  it('column-span modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnSpan());
    await visualDiff(fixture, 'column-span/modern.png');
  });

  it('column-span modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnSpan(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-span/modern-dark.png');
  });

  it('column-groups modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnGroups());
    await visualDiff(fixture, 'column-groups/modern.png');
  });

  it('column-groups modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnGroups(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'column-groups/modern-dark.png');
  });
});
