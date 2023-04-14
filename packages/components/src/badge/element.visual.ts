import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
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

  it('modern light theme', async () => {
    await visualDiff(fixture, 'badge/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'badge/modern-dark.png');
  });
});
