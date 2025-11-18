import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as splitView from './element.examples.js';
import '@blueprintui/components/include/split-view.js';

describe('bp-split-view', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(splitView.example())} ${unsafeHTML(splitView.vertical())} ${unsafeHTML(splitView.disabled())}
      ${unsafeHTML(splitView.withConstraints())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'split-view/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'split-view/dark.png');
  });
});
