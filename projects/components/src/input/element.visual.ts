import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as input from './element.examples.js';
import '@blueprintui/components/include/input.js';
import '@blueprintui/components/include/button.js';

describe('bp-input', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(input.example())} ${unsafeHTML(input.iconButtons())} ${unsafeHTML(input.prefixSuffix())}
        ${unsafeHTML(input.vertical())} ${unsafeHTML(input.horizontal())} ${unsafeHTML(input.compact())}
        ${unsafeHTML(input.readonly())} ${unsafeHTML(input.inputWidth())} ${unsafeHTML(input.inputTypes())}
        ${unsafeHTML(input.validation())} ${unsafeHTML(input.inputButtonAlignment())}
      `,
      { width: '800px', height: '2900px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'input/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'input/dark.png');
  });
});
