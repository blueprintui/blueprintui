import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { BpRadio } from '@blueprintui/components/radio';
import '@blueprintui/components/include/radio.js';

describe('bp-radio', () => {
  let form: HTMLFormElement;
  let button: HTMLButtonElement;
  let element: BpRadio;
  let elementTwo: BpRadio;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <form>
        <bp-fieldset>
          <label>label</label>

          <label>radio 1</label>
          <bp-radio value="1" name="radio-group" checked></bp-radio>

          <label>radio 2</label>
          <bp-radio value="2" name="radio-group"></bp-radio>

          <bp-field-message>message text</bp-field-message>
        </bp-fieldset>
        <button>submit</button>
      </form>
    `);

    form = fixture.querySelector('form');
    button = fixture.querySelector('button');
    element = fixture.querySelector<BpRadio>('bp-radio');
    elementTwo = fixture.querySelectorAll<BpRadio>('bp-radio')[1];
    form.addEventListener('submit', e => e.preventDefault());
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

  it('should emit change event on click', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('1');
    expect(element.checked).toBe(true);

    const event = onceEvent(form, 'change');
    emulateClick(elementTwo);
    await event;
    expect((await event).target.value).toBe('2');
  });

  it('should emit submit event to form', async () => {
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'radio-group': '1' });

    const event = onceEvent(form, 'submit');
    emulateClick(elementTwo);
    emulateClick(button);
    await event;
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'radio-group': '2' });
  });
});
