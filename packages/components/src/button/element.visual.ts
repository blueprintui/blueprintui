import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as button from './element.examples.js';
import '@blueprintui/components/include/button.js';

describe('bp-button', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(button.example())} ${unsafeHTML(button.outline())} ${unsafeHTML(button.small())}
      ${unsafeHTML(button.smallOutline())} ${unsafeHTML(button.flat())} ${unsafeHTML(button.link())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'button/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'button/modern-dark.png');
  });
});
