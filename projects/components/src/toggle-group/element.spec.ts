import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { BpToggleGroup, BpToggleGroupOption } from '@blueprintui/components/toggle-group';
import '@blueprintui/components/include/toggle-group.js';

describe('bp-toggle-group', () => {
  let form: HTMLFormElement;
  let button: HTMLButtonElement;
  let element: BpToggleGroup;
  let option1: BpToggleGroupOption;
  let option2: BpToggleGroupOption;
  let option3: BpToggleGroupOption;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <form>
        <bp-field>
          <label>Time frame</label>
          <bp-toggle-group name="timeframe" value="day">
            <bp-toggle-group-option value="day" checked>Day</bp-toggle-group-option>
            <bp-toggle-group-option value="week">Week</bp-toggle-group-option>
            <bp-toggle-group-option value="month">Month</bp-toggle-group-option>
          </bp-toggle-group>
        </bp-field>
        <button type="submit">submit</button>
      </form>
    `);

    form = fixture.querySelector('form');
    button = fixture.querySelector('button');
    element = fixture.querySelector<BpToggleGroup>('bp-toggle-group');
    const options = fixture.querySelectorAll<BpToggleGroupOption>('bp-toggle-group-option');
    option1 = options[0];
    option2 = options[1];
    option3 = options[2];
    form.addEventListener('submit', e => e.preventDefault());
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should have correct role', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('radiogroup');
  });

  it('should initialize with checked option', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('day');
    expect(option1.checked).toBe(true);
    expect(option2.checked).toBe(false);
    expect(option3.checked).toBe(false);
  });

  it('should update value when option is clicked', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('day');

    emulateClick(option2);
    await elementIsStable(element);

    expect(element.value).toBe('week');
    expect(option1.checked).toBe(false);
    expect(option2.checked).toBe(true);
    expect(option3.checked).toBe(false);
  });

  it('should emit input and change events', async () => {
    await elementIsStable(element);

    const inputEvent = onceEvent(element, 'input');
    const changeEvent = onceEvent(element, 'change');

    emulateClick(option2);

    await inputEvent;
    await changeEvent;

    expect((await inputEvent).target).toBe(element);
    expect((await changeEvent).target).toBe(element);
  });

  it('should propagate name to options', async () => {
    await elementIsStable(element);
    expect(option1.name).toBe('timeframe');
    expect(option2.name).toBe('timeframe');
    expect(option3.name).toBe('timeframe');
  });

  it('should handle disabled state', async () => {
    await elementIsStable(element);

    element.disabled = true;
    await elementIsStable(element);

    expect(element.disabled).toBe(true);
    expect(option1.disabled).toBe(true);
    expect(option2.disabled).toBe(true);
    expect(option3.disabled).toBe(true);

    // Disabled options should not be clickable
    const originalValue = element.value;
    emulateClick(option2);
    await elementIsStable(element);
    expect(element.value).toBe(originalValue);
  });

  it('should handle readonly state', async () => {
    await elementIsStable(element);

    element.readonly = true;
    await elementIsStable(element);

    expect(element.readonly).toBe(true);
    expect(option1.readonly).toBe(true);
    expect(option2.readonly).toBe(true);
    expect(option3.readonly).toBe(true);

    // Readonly options should not be clickable
    const originalValue = element.value;
    emulateClick(option2);
    await elementIsStable(element);
    expect(element.value).toBe(originalValue);
  });

  it('should handle expand property', async () => {
    await elementIsStable(element);

    element.expand = true;
    await elementIsStable(element);

    expect(element.expand).toBe(true);
    expect(option1._expand).toBe(true);
    expect(option2._expand).toBe(true);
    expect(option3._expand).toBe(true);
    expect(option1.matches(':state(expand)')).toBe(true);
  });

  it('should handle required validation', async () => {
    const fixture2 = await createFixture(html`
      <form>
        <bp-toggle-group name="required-test" required>
          <bp-toggle-group-option value="1">Option 1</bp-toggle-group-option>
          <bp-toggle-group-option value="2">Option 2</bp-toggle-group-option>
        </bp-toggle-group>
      </form>
    `);

    const group = fixture2.querySelector<BpToggleGroup>('bp-toggle-group');
    await elementIsStable(group);

    expect(group.required).toBe(true);
    expect(group.checkValidity()).toBe(false);

    const opt = fixture2.querySelector<BpToggleGroupOption>('bp-toggle-group-option');
    emulateClick(opt);
    await elementIsStable(group);

    expect(group.checkValidity()).toBe(true);

    removeFixture(fixture2);
  });

  it('should integrate with FormData', async () => {
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ timeframe: 'day' });

    emulateClick(option3);
    await elementIsStable(element);

    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ timeframe: 'month' });
  });

  it('should handle form submission', async () => {
    await elementIsStable(element);

    const submitEvent = onceEvent(form, 'submit');
    emulateClick(option2);
    await elementIsStable(element);

    emulateClick(button);
    await submitEvent;

    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ timeframe: 'week' });
  });

  it('should reset to initial value', async () => {
    await elementIsStable(element);

    emulateClick(option3);
    await elementIsStable(element);
    expect(element.value).toBe('month');

    element.reset();
    await elementIsStable(element);
    expect(element.value).toBe('day');
  });

  it('should update checked state when value is set programmatically', async () => {
    await elementIsStable(element);

    element.value = 'month';
    await elementIsStable(element);

    expect(option1.checked).toBe(false);
    expect(option2.checked).toBe(false);
    expect(option3.checked).toBe(true);
  });

  it('should have correct ARIA attributes', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');
    expect(element._internals.ariaRequired).toBe('false');

    element.disabled = true;
    element.required = true;
    await elementIsStable(element);

    expect(element._internals.ariaDisabled).toBe('true');
    expect(element._internals.ariaRequired).toBe('true');
  });
});

describe('bp-toggle-group-option', () => {
  let element: BpToggleGroupOption;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-toggle-group name="test" value="1">
        <bp-toggle-group-option value="1" checked>Option 1</bp-toggle-group-option>
      </bp-toggle-group>
    `);

    element = fixture.querySelector<BpToggleGroupOption>('bp-toggle-group-option');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should have correct role', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('radio');
  });

  it('should be focusable', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should have checked CSS state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(checked)')).toBe(true);

    element.checked = false;
    await elementIsStable(element);
    expect(element.matches(':state(checked)')).toBe(false);
  });

  it('should have disabled CSS state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(true);
  });

  it('should have readonly CSS state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(false);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(true);
  });

  it('should handle keyboard navigation - Space key', async () => {
    const fixture2 = await createFixture(html`
      <bp-toggle-group name="test" value="1">
        <bp-toggle-group-option value="1" checked>Option 1</bp-toggle-group-option>
        <bp-toggle-group-option value="2">Option 2</bp-toggle-group-option>
      </bp-toggle-group>
    `);

    const option2 = fixture2.querySelectorAll<BpToggleGroupOption>('bp-toggle-group-option')[1];
    await elementIsStable(option2);

    option2.focus();
    option2.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    await elementIsStable(option2);

    expect(option2.checked).toBe(true);

    removeFixture(fixture2);
  });

  it('should handle keyboard navigation - Enter key', async () => {
    const fixture2 = await createFixture(html`
      <bp-toggle-group name="test" value="1">
        <bp-toggle-group-option value="1" checked>Option 1</bp-toggle-group-option>
        <bp-toggle-group-option value="2">Option 2</bp-toggle-group-option>
      </bp-toggle-group>
    `);

    const option2 = fixture2.querySelectorAll<BpToggleGroupOption>('bp-toggle-group-option')[1];
    await elementIsStable(option2);

    option2.focus();
    option2.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' }));
    await elementIsStable(option2);

    expect(option2.checked).toBe(true);

    removeFixture(fixture2);
  });

  it('should handle keyboard navigation - Arrow keys', async () => {
    const fixture2 = await createFixture(html`
      <bp-toggle-group name="test" value="1">
        <bp-toggle-group-option value="1" checked>Option 1</bp-toggle-group-option>
        <bp-toggle-group-option value="2">Option 2</bp-toggle-group-option>
        <bp-toggle-group-option value="3">Option 3</bp-toggle-group-option>
      </bp-toggle-group>
    `);

    const options = fixture2.querySelectorAll<BpToggleGroupOption>('bp-toggle-group-option');
    await elementIsStable(options[0]);

    options[0].focus();
    expect(document.activeElement).toBe(options[0]);

    // Test arrow right
    options[0].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
    await elementIsStable(options[1]);
    expect(document.activeElement).toBe(options[1]);

    // Test arrow left
    options[1].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    await elementIsStable(options[0]);
    expect(document.activeElement).toBe(options[0]);

    removeFixture(fixture2);
  });

  it('should have correct ARIA attributes', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe('true');
    expect(element._internals.ariaDisabled).toBe('false');

    element.checked = false;
    element.disabled = true;
    await elementIsStable(element);

    expect(element._internals.ariaChecked).toBe('false');
    expect(element._internals.ariaDisabled).toBe('true');
  });

  it('should not toggle when already checked', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(true);

    let changeCount = 0;
    element.addEventListener('_toggle-option-change', () => changeCount++);

    emulateClick(element);
    await elementIsStable(element);

    expect(element.checked).toBe(true);
    expect(changeCount).toBe(0);
  });

  it('should handle label slot', async () => {
    const fixture2 = await createFixture(html`
      <bp-toggle-group name="test" value="1">
        <bp-toggle-group-option value="1" checked>
          <bp-icon shape="list" slot="label"></bp-icon>
          List
        </bp-toggle-group-option>
      </bp-toggle-group>
    `);

    const option = fixture2.querySelector<BpToggleGroupOption>('bp-toggle-group-option');
    await elementIsStable(option);

    const container = option.shadowRoot.querySelector('[part="container"]');
    expect(container).toBeTruthy();

    removeFixture(fixture2);
  });
});
