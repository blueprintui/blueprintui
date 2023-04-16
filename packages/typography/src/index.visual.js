import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as examples from './index.examples.js';

describe('typography', () => {
  let fixture;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(examples.example())} ${unsafeHTML(examples.autoContrast())} ${unsafeHTML(examples.content())}
      ${unsafeHTML(examples.alignment())} ${unsafeHTML(examples.transforms())} ${unsafeHTML(examples.scale())}
      ${unsafeHTML(examples.fill())} ${unsafeHTML(examples.size())} ${unsafeHTML(examples.staticSize())}
      ${unsafeHTML(examples.style())} ${unsafeHTML(examples.list())} ${unsafeHTML(examples.link())}
      ${unsafeHTML(examples.longContent())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern', async () => {
    await visualDiff(fixture, 'modern.png');
  });

  it('modern-dark', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'modern-dark.png');
  });
});
