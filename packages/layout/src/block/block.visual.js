import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import { styles } from '../test.js';
import * as block from './block.examples.js';

describe('block', () => {
  let fixture;

  beforeEach(async () => {
    fixture = await createVisualFixture(html`
      ${styles} ${unsafeHTML(block.example())} ${unsafeHTML(block.gap())} ${unsafeHTML(block.alignment())}
      ${unsafeHTML(block.itemAlignment())} ${unsafeHTML(block.stretch())}
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('block layout', async () => {
    await visualDiff(fixture, 'block.png');
  });
});
