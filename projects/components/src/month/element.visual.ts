import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as month from './element.examples.js';
import '@blueprintui/components/include/month.js';

describe('bp-month', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html` ${unsafeHTML(month.example())} ${unsafeHTML(month.vertical())} ${unsafeHTML(month.horizontal())}
      ${unsafeHTML(month.compact())}`
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'month/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'month/dark.png');
  });
});
