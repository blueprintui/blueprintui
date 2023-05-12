import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as nav from './element.examples.js';
import '@blueprintui/components/include/nav.js';
import '@blueprintui/components/include/badge.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/home.js';

describe('bp-nav', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(nav.example())} ${unsafeHTML(nav.badge())}
    ${unsafeHTML(nav.collapsed())} ${unsafeHTML(nav.icon())} ${unsafeHTML(nav.groups())} ${unsafeHTML(nav.scroll())}`);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'nav/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'nav/modern-dark.png');
  });
});
