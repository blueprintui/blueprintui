import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as tabs from './element.examples.js';
import '@blueprintui/components/include/tabs.js';

describe('bp-tabs', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(tabs.example())} ${unsafeHTML(tabs.vertical())} `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'tabs/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'tabs/dark.png');
  });
});
