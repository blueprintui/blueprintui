import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as speech from './element.examples.js';
import '@blueprintui/components/include/speech.js';

describe('bp-speech', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(speech.example())} ${unsafeHTML(speech.recording())} ${unsafeHTML(speech.disabled())}
      ${unsafeHTML(speech.readonly())} ${unsafeHTML(speech.unsupported())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'speech/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'speech/dark.png');
  });
});
