import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as menu from './element.examples.js';
import '@blueprintui/components/include/menu.js';
import '@blueprintui/components/include/card.js';
import '@blueprintui/components/include/dropdown.js';
import '@blueprintui/components/include/button.js';
import '@blueprintui/components/include/badge.js';
import '@blueprintui/components/include/divider.js';
import '@blueprintui/icons/shapes/logout.js';

describe('bp-menu', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(menu.example())} ${unsafeHTML(menu.badge())}
    ${unsafeHTML(menu.links())} ${unsafeHTML(menu.dropdown())}`);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'menu/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'menu/modern-dark.png');
  });
});
