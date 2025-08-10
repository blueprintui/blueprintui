import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as switchElement from './element.examples.js';
import '@blueprintui/components/include/switch.js';

describe('bp-switch', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html` ${unsafeHTML(switchElement.example())} ${unsafeHTML(switchElement.status())}
      ${unsafeHTML(switchElement.verticalGroup())} ${unsafeHTML(switchElement.verticalInlineGroup())}
      ${unsafeHTML(switchElement.horizontalGroup())} ${unsafeHTML(switchElement.horizontalInlineGroup())}
      ${unsafeHTML(switchElement.compactGroup())} ${unsafeHTML(switchElement.switchAlign())}
      ${unsafeHTML(switchElement.inlineGroupControlMessages())}`
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'switch/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'switch/dark.png');
  });
});
