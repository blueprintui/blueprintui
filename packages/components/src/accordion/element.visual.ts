import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as accordion from './element.examples.js';
import '@blueprintui/components/include/accordion.js';
import '@blueprintui/components/include/input.js';

describe('bp-accordion', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(accordion.example())} ${unsafeHTML(accordion.content())} `, {
      width: '800px',
      height: '600px'
    });
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  xit('modern light theme', async () => {
    await visualDiff(fixture, 'accordion/modern.png');
  });

  xit('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'accordion/modern-dark.png');
  });
});
