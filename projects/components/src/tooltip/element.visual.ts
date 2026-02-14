import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as tooltip from './element.examples.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/card.js';
import '@blueprintui/components/include/tooltip.js';

describe('bp-tooltip', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    /* eslint-disable lit/prefer-static-styles */
    fixture = await createVisualFixture(
      html`
        <style>
          :root {
            --bp-animation-duration-100: 0ms;
            --bp-animation-duration-200: 0ms;
            --bp-animation-duration-300: 0ms;
          }
        </style>
        ${unsafeHTML(tooltip.alignment())}
      `,
      {
        width: '1000px',
        height: '1000px'
      }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'tooltip/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'tooltip/dark.png');
  });
});
