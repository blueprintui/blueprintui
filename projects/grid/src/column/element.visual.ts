import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/test';
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

  it('align-center light theme', async () => {
    fixture = await createGridVisualFixture(examples.alignCenter());
    await visualDiff(fixture, 'column-align-center/light.png');
  });

  it('align-center dark theme', async () => {
    fixture = await createGridVisualFixture(examples.alignCenter(), { theme: 'dark' });
    await visualDiff(fixture, 'column-align-center/dark.png');
  });

  it('align-end light theme', async () => {
    fixture = await createGridVisualFixture(examples.alignEnd());
    await visualDiff(fixture, 'column-align-end/light.png');
  });

  it('align-end dark theme', async () => {
    fixture = await createGridVisualFixture(examples.alignEnd(), { theme: 'dark' });
    await visualDiff(fixture, 'column-align-end/dark.png');
  });

  it('align-start light theme', async () => {
    fixture = await createGridVisualFixture(examples.alignStart());
    await visualDiff(fixture, 'column-align-start/light.png');
  });

  it('align-start dark theme', async () => {
    fixture = await createGridVisualFixture(examples.alignStart(), { theme: 'dark' });
    await visualDiff(fixture, 'column-align-start/dark.png');
  });

  it('fixed-width light theme', async () => {
    fixture = await createGridVisualFixture(examples.fixedWidth());
    await visualDiff(fixture, 'column-fixed-width/light.png');
  });

  it('fixed-width dark theme', async () => {
    fixture = await createGridVisualFixture(examples.fixedWidth(), { theme: 'dark' });
    await visualDiff(fixture, 'column-fixed-width/dark.png');
  });

  it('content-wrap light theme', async () => {
    fixture = await createGridVisualFixture(examples.contentWrap());
    await visualDiff(fixture, 'content-wrap/light.png');
  });

  it('content-wrap dark theme', async () => {
    fixture = await createGridVisualFixture(examples.contentWrap(), { theme: 'dark' });
    await visualDiff(fixture, 'content-wrap/dark.png');
  });

  it('percentage-width light theme', async () => {
    fixture = await createGridVisualFixture(examples.percentageWidth());
    await visualDiff(fixture, 'column-percentage-width/light.png');
  });

  it('percentage-width dark theme', async () => {
    fixture = await createGridVisualFixture(examples.percentageWidth(), { theme: 'dark' });
    await visualDiff(fixture, 'column-percentage-width/dark.png');
  });

  it('horizontal-scroll light theme', async () => {
    fixture = await createGridVisualFixture(examples.horizontalScroll());
    await visualDiff(fixture, 'horizontal-scroll/light.png');
  });

  it('horizontal-scroll dark theme', async () => {
    fixture = await createGridVisualFixture(examples.horizontalScroll(), { theme: 'dark' });
    await visualDiff(fixture, 'horizontal-scroll/dark.png');
  });

  it('overflow light theme', async () => {
    fixture = await createGridVisualFixture(examples.overflow());
    await visualDiff(fixture, 'column-overflow/light.png');
  });

  it('overflow dark theme', async () => {
    fixture = await createGridVisualFixture(examples.overflow(), { theme: 'dark' });
    await visualDiff(fixture, 'column-overflow/dark.png');
  });

  it('position-fixed light theme', async () => {
    fixture = await createGridVisualFixture(examples.positionFixed());
    await visualDiff(fixture, 'column-position-fixed/light.png');
  });

  it('position-fixed dark theme', async () => {
    fixture = await createGridVisualFixture(examples.positionFixed(), { theme: 'dark' });
    await visualDiff(fixture, 'column-position-fixed/dark.png');
  });

  it('position-multi-fixed light theme', async () => {
    fixture = await createGridVisualFixture(examples.positionMultiFixed());
    await visualDiff(fixture, 'column-position-multi-fixed/light.png');
  });

  it('position-multi-fixed dark theme', async () => {
    fixture = await createGridVisualFixture(examples.positionMultiFixed(), { theme: 'dark' });
    await visualDiff(fixture, 'column-position-multi-fixed/dark.png');
  });

  it('position-sticky light theme', async () => {
    fixture = await createGridVisualFixture(examples.positionSticky());
    await visualDiff(fixture, 'column-position-sticky/light.png');
  });

  it('position-sticky dark theme', async () => {
    fixture = await createGridVisualFixture(examples.positionSticky(), { theme: 'dark' });
    await visualDiff(fixture, 'column-position-sticky/dark.png');
  });

  it('column-visibility light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnVisibility());
    await visualDiff(fixture, 'column-visibility/light.png');
  });

  it('column-visibility dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnVisibility(), { theme: 'dark' });
    await visualDiff(fixture, 'column-visibility/dark.png');
  });

  it('column-filter light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnFilter());
    await visualDiff(fixture, 'column-filter/light.png');
  });

  it('column-filter dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnFilter(), { theme: 'dark' });
    await visualDiff(fixture, 'column-filter/dark.png');
  });

  it('column-filter-multi light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnFilterMulti());
    await visualDiff(fixture, 'column-filter-multi/light.png');
  });

  it('column-filter-multi dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnFilterMulti(), { theme: 'dark' });
    await visualDiff(fixture, 'column-filter-multi/dark.png');
  });

  it('column-span light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnSpan());
    await visualDiff(fixture, 'column-span/light.png');
  });

  it('column-span dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnSpan(), { theme: 'dark' });
    await visualDiff(fixture, 'column-span/dark.png');
  });

  it('column-groups light theme', async () => {
    fixture = await createGridVisualFixture(examples.columnGroups());
    await visualDiff(fixture, 'column-groups/light.png');
  });

  it('column-groups dark theme', async () => {
    fixture = await createGridVisualFixture(examples.columnGroups(), { theme: 'dark' });
    await visualDiff(fixture, 'column-groups/dark.png');
  });
});
