import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as skeleton from './element.examples.js';
import '@blueprintui/components/include/skeleton.js';

describe('bp-skeleton', () => {
  let fixture: HTMLElement;

  /* eslint-disable lit/prefer-static-styles */
  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      <style>
        bp-skeleton {
          --animation-duration: 0s;
        }
      </style>
      ${unsafeHTML(skeleton.example())} ${unsafeHTML(skeleton.effect())} ${unsafeHTML(skeleton.shape())}
      ${unsafeHTML(skeleton.avatar())} ${unsafeHTML(skeleton.textLines())} ${unsafeHTML(skeleton.cardLayout())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'skeleton/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'skeleton/dark.png');
  });
});
