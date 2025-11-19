import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as buttonMute from './element.examples.js';
import '@blueprintui/components/include/button-mute.js';

describe('bp-button-mute', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(buttonMute.example())} ${unsafeHTML(buttonMute.checked())} ${unsafeHTML(buttonMute.disabled())}
        ${unsafeHTML(buttonMute.readonly())}
      `,
      { width: '800px', height: '300px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'button-mute/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'button-mute/dark.png');
  });
});
