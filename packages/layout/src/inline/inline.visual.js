import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import { styles } from '../test.js';
import * as inline from './inline.examples.js';

describe('inline', () => {
  let fixture;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${styles} ${unsafeHTML(inline.example())} ${unsafeHTML(inline.wrap())} ${unsafeHTML(inline.gap())}
      ${unsafeHTML(inline.alignment())} ${unsafeHTML(inline.itemAlignment())} ${unsafeHTML(inline.stretch())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('inline layout', async () => {
    await visualDiff(fixture, 'inline.png');
  });
});
