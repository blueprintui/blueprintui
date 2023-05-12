import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as select from './element.examples.js';
import '@blueprintui/components/include/select.js';

describe('bp-select', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(select.example())} ${unsafeHTML(select.vertical())}
    ${unsafeHTML(select.horizontal())} ${unsafeHTML(select.compact())} ${unsafeHTML(select.multiple())}
    ${unsafeHTML(select.size())} ${unsafeHTML(select.selectionDefaults())}`);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'select/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'select/modern-dark.png');
  });
});
