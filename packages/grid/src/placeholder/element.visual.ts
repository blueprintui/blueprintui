import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/test';
import { createGridVisualFixture } from '@blueprintui/grid/test';
import * as examples from './element.examples.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/keynav.js';
import '@blueprintui/grid/include/placeholder.js';

describe('placeholder', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('placeholder modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.placeholder());
    await visualDiff(fixture, 'placeholder/modern.png');
  });

  it('placeholder modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.placeholder(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'placeholder/modern-dark.png');
  });
});
