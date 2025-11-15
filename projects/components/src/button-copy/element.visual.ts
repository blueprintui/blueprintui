import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as buttonCopy from './element.examples.js';
import '@blueprintui/components/include/button-copy.js';
import '@blueprintui/icons/shapes/clipboard.js';
import '@blueprintui/icons/shapes/check-circle.js';
import '@blueprintui/icons/shapes/error.js';

describe('bp-button-copy', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(buttonCopy.all())} `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'button-copy/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'button-copy/dark.png');
  });
});
