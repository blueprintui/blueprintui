import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
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

  xit('light theme', async () => {
    await visualDiff(fixture, 'breadcrumb/light.png');
  });

  xit('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'breadcrumb/dark.png');
  });
});
