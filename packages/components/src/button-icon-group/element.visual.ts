import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as buttonIconGroup from './element.examples.js';
import '@blueprintui/components/include/button-icon-group.js';
import '@blueprintui/icons/shapes/number-list.js';
import '@blueprintui/icons/shapes/highlighter.js';
import '@blueprintui/icons/shapes/attachment.js';
import '@blueprintui/icons/shapes/font-size.js';
import '@blueprintui/icons/shapes/italic.js';

describe('bp-button-icon-group', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(buttonIconGroup.example())} ${unsafeHTML(buttonIconGroup.selected())}
      ${unsafeHTML(buttonIconGroup.disabled())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'button-icon-group/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'button-icon-group/modern-dark.png');
  });
});
