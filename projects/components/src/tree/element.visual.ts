import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as tree from './element.examples.js';
import '@blueprintui/components/include/tree.js';

describe('bp-tree', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${unsafeHTML(tree.example())} ${unsafeHTML(tree.multiSelectable())} ${unsafeHTML(tree.selectable())}
      ${unsafeHTML(tree.icons())} ${unsafeHTML(tree.links())} ${unsafeHTML(tree.stateless())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'tree/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'tree/dark.png');
  });
});
