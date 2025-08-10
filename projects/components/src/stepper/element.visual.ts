import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as stepper from './element.examples.js';
import '@blueprintui/components/include/stepper.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';

describe('bp-stepper', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html` ${unsafeHTML(stepper.example())} ${unsafeHTML(stepper.status())} ${unsafeHTML(stepper.vertical())}
      ${unsafeHTML(stepper.statusVertical())}`
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'stepper/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'stepper/dark.png');
  });
});
