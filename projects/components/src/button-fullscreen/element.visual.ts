import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as buttonFullscreen from './element.examples.js';
import '@blueprintui/components/include/button-fullscreen.js';
import '@blueprintui/icons/shapes/fullscreen.js';
import '@blueprintui/icons/shapes/fullscreen-exit.js';

describe('bp-button-fullscreen', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(buttonFullscreen.all())} `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'button-fullscreen/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'button-fullscreen/dark.png');
  });
});
