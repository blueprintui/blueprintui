import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { BpCheckbox } from '@blueprintui/components/checkbox';
import '@blueprintui/components/include/checkbox.js';

describe('bp-checkbox', () => {
  let form: HTMLFormElement;
  let button: HTMLButtonElement;
  let element: BpCheckbox;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <form>
        <bp-field>
          <label>checkbox</label>
          <bp-checkbox name="checkbox"></bp-checkbox>
          <bp-field-message>message text</bp-field-message>
        </bp-field>
        <button>submit</button>
      </form>
    `);

    form = fixture.querySelector('form');
    button = fixture.querySelector('button');
    element = fixture.querySelector<BpCheckbox>('bp-checkbox');
    form.addEventListener('submit', e => e.preventDefault());
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should update :--checked state when input control is checked', async () => {
    await elementIsStable(element);
    expect(element.matches(':--checked')).toBe(false);

    element.checked = true;
    await elementIsStable(element);
    expect(element.matches(':--checked')).toBe(true);
  });

  it('should emit change event on click', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('on');
    expect(element.checked).toBe(undefined);

    const event = onceEvent(element, 'change');
    emulateClick(element);
    await elementIsStable(element);
    await event;
    expect(element.value).toBe('on');
    expect(element.checked).toBe(true);

    const eventTwo = onceEvent(element, 'change');
    emulateClick(element);
    await elementIsStable(element);
    await eventTwo;
    expect(element.value).toBe('on');
    expect(element.checked).toBe(false);
  });

  it('should emit submit event to form', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('on');
    expect(element.checked).toBe(undefined);

    const event = onceEvent(form, 'submit');
    emulateClick(element);
    emulateClick(button);
    await event;
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ checkbox: 'on' });
  });
});
