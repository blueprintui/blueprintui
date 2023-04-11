import { visualDiff } from '@web/test-runner-visual-regression';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as badge from './element.examples.js';
import '@blueprintui/components/include/badge.js';

describe('bp-badge', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(badge.example())} ${unsafeHTML(badge.number())} ${unsafeHTML(badge.longForm())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern dark theme', async () => {
    await visualDiff(fixture, 'badge/modern-dark.png');
  });

  it('modern light theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern');
    await visualDiff(fixture, 'badge/modern.png');
  });
});
