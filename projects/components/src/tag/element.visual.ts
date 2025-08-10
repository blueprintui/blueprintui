import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as tag from './element.examples.js';
import '@blueprintui/components/include/badge.js';
import '@blueprintui/components/include/tag.js';

describe('bp-tag', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(tag.example())} ${unsafeHTML(tag.badges())} ${unsafeHTML(tag.readonly())} ${unsafeHTML(tag.links())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'tag/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'tag/dark.png');
  });
});
