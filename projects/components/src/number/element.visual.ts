import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as number from './element.examples.js';
import '@blueprintui/components/include/number.js';

describe('bp-number', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(number.example())} ${unsafeHTML(number.prefixSuffix())} ${unsafeHTML(number.validation())}
        ${unsafeHTML(number.vertical())} ${unsafeHTML(number.horizontal())} ${unsafeHTML(number.compact())}
        ${unsafeHTML(number.readonly())}
      `,
      { width: '800px', height: '2400px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'number/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'number/dark.png');
  });
});
