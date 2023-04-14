import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as divider from './element.examples.js';
import '@blueprintui/components/include/button.js';
import '@blueprintui/components/include/divider.js';

describe('bp-divider', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(divider.example())} ${unsafeHTML(divider.vertical())} `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'divider/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'divider/modern-dark.png');
  });
});
