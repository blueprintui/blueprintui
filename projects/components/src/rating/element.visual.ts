import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as ratingElement from './element.examples.js';
import '@blueprintui/components/include/rating.js';

describe('bp-rating', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(ratingElement.example())} ${unsafeHTML(ratingElement.vertical())}
      ${unsafeHTML(ratingElement.horizontal())} ${unsafeHTML(ratingElement.compact())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'rating/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'rating/dark.png');
  });
});
