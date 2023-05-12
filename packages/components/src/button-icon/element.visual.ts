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
    fixture = await createVisualFixture(html`
      ${unsafeHTML(buttonIcon.example())} ${unsafeHTML(buttonIcon.disabled())} ${unsafeHTML(buttonIcon.selected())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'button-icon/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'button-icon/modern-dark.png');
  });
});
