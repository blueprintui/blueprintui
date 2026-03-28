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
      <div bp-layout="block gap:md">
        ${unsafeHTML(splitView.example())} ${unsafeHTML(splitView.vertical())} ${unsafeHTML(splitView.customPosition())}
        ${unsafeHTML(splitView.withConstraints())} ${unsafeHTML(splitView.disabled())}
        ${unsafeHTML(splitView.customDivider())}
      </div>
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
