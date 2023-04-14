import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as dropdown from './element.examples.js';
import '@blueprintui/components/include/button.js';
import '@blueprintui/components/include/dropdown.js';

describe('bp-dropdown', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(dropdown.example())} `, { width: '800px', height: '600px' });
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'dropdown/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'dropdown/modern-dark.png');
  });
});
