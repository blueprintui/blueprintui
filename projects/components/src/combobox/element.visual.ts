import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as combobox from './element.examples.js';
import '@blueprintui/components/include/combobox.js';

describe('bp-combobox', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(combobox.example())} ${unsafeHTML(combobox.autocomplete())} ${unsafeHTML(combobox.multiple())}
        ${unsafeHTML(combobox.vertical())} ${unsafeHTML(combobox.horizontal())} ${unsafeHTML(combobox.compact())}
        ${unsafeHTML(combobox.prefixSuffix())} ${unsafeHTML(combobox.validation())}
      `,
      { width: '800px', height: '1600px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'combobox/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'combobox/dark.png');
  });
});
