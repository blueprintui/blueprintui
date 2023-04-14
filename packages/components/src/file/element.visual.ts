import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as file from './element.examples.js';
import '@blueprintui/components/include/file.js';

describe('bp-file', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(file.example())} ${unsafeHTML(file.vertical())} ${unsafeHTML(file.horizontal())}
      ${unsafeHTML(file.compact())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'file/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'file/modern-dark.png');
  });
});
