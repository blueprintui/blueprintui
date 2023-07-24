import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as pagination from './element.examples.js';
import '@blueprintui/components/include/pagination.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/input.js';

describe('bp-pagination', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(pagination.example())} ${unsafeHTML(pagination.basic())}
      ${unsafeHTML(pagination.basicPaginationNumber())} ${unsafeHTML(pagination.firstAndLast())}
      ${unsafeHTML(pagination.input())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'pagination/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'pagination/modern-dark.png');
  });
});
