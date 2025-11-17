import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as telephone from './element.examples.js';
import '@blueprintui/components/include/telephone.js';

describe('bp-telephone', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(telephone.example())} ${unsafeHTML(telephone.vertical())} ${unsafeHTML(telephone.horizontal())}
      ${unsafeHTML(telephone.compact())} ${unsafeHTML(telephone.validation())} ${unsafeHTML(telephone.withPrefix())}
      ${unsafeHTML(telephone.autocomplete())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'telephone/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'telephone/dark.png');
  });
});
