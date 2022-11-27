import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpRadio } from '@blueprintui/components/radio';
import '@blueprintui/components/include/radio.js';

describe('bp-radio', () => {
  let element: BpRadio;
  let elementTwo: BpRadio;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-fieldset>
        <label>label</label>

        <label>radio 1</label>
        <bp-radio value="1" checked></bp-radio>

        <label>radio 2</label>
        <bp-radio value="2"></bp-radio>

        <label>radio 3</label>
        <bp-radio value="3"></bp-radio>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>
    `);

    element = fixture.querySelector<BpRadio>('bp-radio');
    elementTwo = fixture.querySelectorAll<BpRadio>('bp-radio')[1];
    await elementIsStable(element);
    await elementIsStable(elementTwo);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should mark radio as checked', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(true);

    elementTwo.click();
    await elementIsStable(element);
    expect(elementTwo.checked).toBe(true);
    expect(element.checked).toBe(false);
  });

  it('should mark checked radio with a checked attribute based on input checked state', async () => {
    expect(element.matches(':--checked')).toBe(true);
    expect(elementTwo.matches(':--checked')).toBe(false);

    elementTwo.click();
    await elementIsStable(elementTwo);

    expect(element.matches(':--checked')).toBe(false);
    expect(elementTwo.matches(':--checked')).toBe(true);
  });
});