import { visualDiff } from '@web/test-runner-visual-regression';
import { removeFixture } from '@blueprintui/components/test';
import { createGridVisualFixture } from '@blueprintui/grid/test';
import * as examples from './element.examples.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/keynav.js';
import '@blueprintui/grid/include/footer.js';

describe('footer', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('footer modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.footer());
    await visualDiff(fixture, 'footer/modern.png');
  });

  it('footer modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.footer(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'footer/modern-dark.png');
  });

  it('footer actions modern light theme', async () => {
    fixture = await createGridVisualFixture(examples.footerActions());
    await visualDiff(fixture, 'footer-actions/modern.png');
  });

  it('footer actions modern dark theme', async () => {
    fixture = await createGridVisualFixture(examples.footerActions(), { theme: 'modern modern-dark' });
    await visualDiff(fixture, 'footer-actions/modern-dark.png');
  });
});
