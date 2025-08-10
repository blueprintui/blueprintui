import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as range from './element.examples.js';
import '@blueprintui/components/include/range.js';

describe('bp-range', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html` ${unsafeHTML(range.example())} ${unsafeHTML(range.vertical())} ${unsafeHTML(range.horizontal())}
      ${unsafeHTML(range.compact())} ${unsafeHTML(range.minMax())}`
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'range/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'range/dark.png');
  });
});
