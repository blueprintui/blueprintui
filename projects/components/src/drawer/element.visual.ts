import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as drawer from './element.examples.js';
import '@blueprintui/components/include/drawer.js';

describe('bp-drawer', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      // eslint-disable-next-line lit/prefer-static-styles
      html`<style>
          body {
            min-height: 420px;
          }
        </style>
        ${unsafeHTML(drawer.open())} `
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(document.body, 'drawer/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(document.body, 'drawer/dark.png');
  });
});
