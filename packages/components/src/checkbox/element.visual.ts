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

  it('light theme', async () => {
    await visualDiff(fixture, 'checkbox/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'checkbox/dark.png');
  });
});
