import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as buttonIcon from './element.examples.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/filter.js';
import '@blueprintui/icons/shapes/close.js';
import '@blueprintui/icons/shapes/menu.js';

describe('bp-button-icon', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(buttonIcon.all())} `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'button-icon/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'button-icon/dark.png');
  });
});
