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

  it('placeholder light theme', async () => {
    fixture = await createGridVisualFixture(examples.placeholder());
    await visualDiff(fixture, 'placeholder/light.png');
  });

  it('placeholder dark theme', async () => {
    fixture = await createGridVisualFixture(examples.placeholder(), { theme: 'dark' });
    await visualDiff(fixture, 'placeholder/dark.png');
  });
});
