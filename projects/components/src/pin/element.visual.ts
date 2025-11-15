import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as pin from './element.examples.js';
import '@blueprintui/components/include/pin.js';
import '@blueprintui/components/include/button.js';

describe('bp-pin', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(pin.example())} ${unsafeHTML(pin.vertical())} ${unsafeHTML(pin.masked())}
        ${unsafeHTML(pin.types())} ${unsafeHTML(pin.lengths())} ${unsafeHTML(pin.readonly())}
      `,
      { width: '800px', height: '2400px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'pin/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'pin/dark.png');
  });
});
