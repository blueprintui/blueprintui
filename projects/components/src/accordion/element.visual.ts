import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
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

  xit('light theme', async () => {
    await visualDiff(fixture, 'accordion/light.png');
  });

  xit('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'accordion/dark.png');
  });
});
