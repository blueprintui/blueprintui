import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as card from './element.examples.js';
import '@blueprintui/components/include/button.js';
import '@blueprintui/components/include/card.js';
import '@blueprintui/components/include/input.js';

describe('bp-card', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(card.example())} ${unsafeHTML(card.cardGrid())} ${unsafeHTML(card.cardMedia())}
      ${unsafeHTML(card.cardContent())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'card/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'card/dark.png');
  });
});
