import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as buttonCaptions from './element.examples.js';
import '@blueprintui/components/include/button-captions.js';

describe('bp-button-captions', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(buttonCaptions.example())} ${unsafeHTML(buttonCaptions.checked())}
        ${unsafeHTML(buttonCaptions.disabled())} ${unsafeHTML(buttonCaptions.readonly())}
      `,
      { width: '800px', height: '300px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'button-captions/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'button-captions/dark.png');
  });
});
