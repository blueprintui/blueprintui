import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as textarea from './element.examples.js';
import '@blueprintui/components/include/textarea.js';

describe('bp-textarea', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(textarea.example())} ${unsafeHTML(textarea.vertical())} ${unsafeHTML(textarea.horizontal())}
        ${unsafeHTML(textarea.compact())}
      `
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'textarea/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'textarea/modern-dark.png');
  });
});
