import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as header from './element.examples.js';
import '@blueprintui/components/include/header.js';

describe('bp-header', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(header.example())} `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'header/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'header/modern-dark.png');
  });
});
