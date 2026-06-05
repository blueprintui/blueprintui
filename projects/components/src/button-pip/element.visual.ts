import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as buttonPip from './element.examples.js';
import '@blueprintui/components/include/button-pip.js';

describe('bp-button-pip', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(buttonPip.example())} ${unsafeHTML(buttonPip.disabled())} ${unsafeHTML(buttonPip.readonly())}
        ${unsafeHTML(buttonPip.form())}
      `,
      { width: '800px', height: '400px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'button-pip/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'button-pip/dark.png');
  });
});
