import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/components/test';
import * as radio from './element.examples.js';
import '@blueprintui/components/include/radio.js';

describe('bp-radio', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(html` ${unsafeHTML(radio.example())} ${unsafeHTML(radio.verticalGroup())}
    ${unsafeHTML(radio.verticalInlineGroup())} ${unsafeHTML(radio.horizontalGroup())}
    ${unsafeHTML(radio.horizontalInlineGroup())} ${unsafeHTML(radio.compactGroup())}`);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'radio/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'radio/modern-dark.png');
  });
});
