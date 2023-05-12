import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as checkbox from './element.examples.js';
import '@blueprintui/components/include/checkbox.js';

describe('bp-checkbox', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(checkbox.example())} ${unsafeHTML(checkbox.verticalGroup())}
      ${unsafeHTML(checkbox.verticalInlineGroup())} ${unsafeHTML(checkbox.horizontalGroup())}
      ${unsafeHTML(checkbox.horizontalInlineGroup())} ${unsafeHTML(checkbox.compactGroup())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'checkbox/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'checkbox/modern-dark.png');
  });
});
