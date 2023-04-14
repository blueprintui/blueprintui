import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as search from './element.examples.js';
import '@blueprintui/components/include/search.js';

describe('bp-search', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(search.example())} ${unsafeHTML(search.vertical())} ${unsafeHTML(search.horizontal())}
      ${unsafeHTML(search.compact())} ${unsafeHTML(search.searchInline())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'search/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'search/modern-dark.png');
  });
});
