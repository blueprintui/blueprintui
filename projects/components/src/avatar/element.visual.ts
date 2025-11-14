import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as avatar from './element.examples.js';
import '@blueprintui/components/include/avatar.js';

describe('bp-avatar', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(avatar.example())} ${unsafeHTML(avatar.shapes())} ${unsafeHTML(avatar.status())}
      ${unsafeHTML(avatar.sizes())} ${unsafeHTML(avatar.initials())} ${unsafeHTML(avatar.icons())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'avatar/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'avatar/dark.png');
  });
});
