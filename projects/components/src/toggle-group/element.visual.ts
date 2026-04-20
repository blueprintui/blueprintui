import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as toggleGroup from './element.examples.js';
import '@blueprintui/components/include/toggle-group.js';

describe('bp-toggle-group', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(toggleGroup.example())} ${unsafeHTML(toggleGroup.expand())} ${unsafeHTML(toggleGroup.withIcons())}
      ${unsafeHTML(toggleGroup.iconOnly())} ${unsafeHTML(toggleGroup.disabled())} ${unsafeHTML(toggleGroup.readonly())}
      ${unsafeHTML(toggleGroup.twoOptions())} ${unsafeHTML(toggleGroup.manyOptions())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'toggle-group/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'toggle-group/dark.png');
  });
});
