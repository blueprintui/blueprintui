import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as time from './element.examples.js';
import '@blueprintui/components/include/time.js';

describe('bp-time', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(time.example())} ${unsafeHTML(time.vertical())} ${unsafeHTML(time.horizontal())}
      ${unsafeHTML(time.compact())} ${unsafeHTML(time.timeDatalist())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'time/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'time/modern-dark.png');
  });
});
