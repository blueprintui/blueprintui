import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as examples from './index.examples.js';

describe('typography', () => {
  let fixture;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      <div style="height: 5000px; width: 100%">
        ${unsafeHTML(examples.example())} ${unsafeHTML(examples.autoContrast())} ${unsafeHTML(examples.content())}
        ${unsafeHTML(examples.alignment())} ${unsafeHTML(examples.transforms())} ${unsafeHTML(examples.scale())}
        ${unsafeHTML(examples.fill())} ${unsafeHTML(examples.size())} ${unsafeHTML(examples.staticSize())}
        ${unsafeHTML(examples.style())} ${unsafeHTML(examples.list())} ${unsafeHTML(examples.link())}
        ${unsafeHTML(examples.longContent())}
      </div>
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light', async () => {
    await visualDiff(fixture, 'light.png');
  });

  it('dark', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'dark.png');
  });
});
