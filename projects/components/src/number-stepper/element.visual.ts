import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as numberStepper from './element.examples.js';
import '@blueprintui/components/include/number-stepper.js';

describe('bp-number-stepper', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(numberStepper.example())} ${unsafeHTML(numberStepper.basic())}
        ${unsafeHTML(numberStepper.decimal())} ${unsafeHTML(numberStepper.currency())}
        ${unsafeHTML(numberStepper.continuousStepping())} ${unsafeHTML(numberStepper.customIcons())}
        ${unsafeHTML(numberStepper.readonly())} ${unsafeHTML(numberStepper.disabled())}
        ${unsafeHTML(numberStepper.validation())} ${unsafeHTML(numberStepper.vertical())}
        ${unsafeHTML(numberStepper.horizontal())} ${unsafeHTML(numberStepper.compact())}
      `,
      { width: '800px', height: '2500px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'number-stepper/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'number-stepper/dark.png');
  });
});
