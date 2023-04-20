import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as ratingElement from './element.examples.js';
import '@blueprintui/components/include/rating.js';

describe('bp-rating', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(ratingElement.example())} ${unsafeHTML(ratingElement.status())}
      ${unsafeHTML(ratingElement.verticalGroup())} ${unsafeHTML(ratingElement.verticalInlineGroup())}
      ${unsafeHTML(ratingElement.horizontalGroup())} ${unsafeHTML(ratingElement.horizontalInlineGroup())}
      ${unsafeHTML(ratingElement.compactGroup())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'rating/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'rating/modern-dark.png');
  });
});
