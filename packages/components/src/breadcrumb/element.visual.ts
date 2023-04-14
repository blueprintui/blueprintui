import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as breadcrumb from './element.examples.js';
import '@blueprintui/components/include/breadcrumb.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';

describe('bp-breadcrumb', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(breadcrumb.example())} ${unsafeHTML(breadcrumb.separator())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  xit('modern light theme', async () => {
    await visualDiff(fixture, 'breadcrumb/modern.png');
  });

  xit('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'breadcrumb/modern-dark.png');
  });
});
