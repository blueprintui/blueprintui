import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as rangeTime from './element.examples.js';
import '@blueprintui/components/include/range-time.js';

describe('bp-range-time', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(rangeTime.example())} ${unsafeHTML(rangeTime.buffered())} ${unsafeHTML(rangeTime.disabled())}
      ${unsafeHTML(rangeTime.readonly())} ${unsafeHTML(rangeTime.customStyles())}
      ${unsafeHTML(rangeTime.longDuration())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'range-time/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'range-time/dark.png');
  });
});
