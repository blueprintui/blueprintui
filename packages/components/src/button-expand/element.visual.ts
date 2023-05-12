import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as buttonExpand from './element.examples.js';
import '@blueprintui/components/include/button-expand.js';

describe('bp-button-expand', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(buttonExpand.example())} ${unsafeHTML(buttonExpand.disabled())}
        ${unsafeHTML(buttonExpand.readonly())} ${unsafeHTML(buttonExpand.horizontal())}
      `,
      { width: '800px', height: '300px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'button-expand/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'button-expand/modern-dark.png');
  });
});
