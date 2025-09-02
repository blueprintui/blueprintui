import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';
import { CheckboxControl, TypeFormCheckboxController, TypeFormControlController } from '@blueprintui/components/forms';

interface TypeFormCheckboxControllerTestElement extends CheckboxControl {} // eslint-disable-line

@customElement('type-form-checkbox-test-element')
class TypeFormCheckboxControllerTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) accessor value: string | FormData = '';

  @property({ type: Boolean }) accessor checked: boolean;

  @property({ type: Boolean }) accessor disabled: boolean;

  @property({ type: Boolean }) accessor readonly: boolean;

  @property({ type: Boolean }) accessor indeterminate: boolean;

  typeFormControlController = new TypeFormControlController(this);
  typeFormCheckboxController = new TypeFormCheckboxController(this);
}

@customElement('type-form-checkbox-config-test-element')
class TypeFormCheckboxConfigTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) accessor value: string | FormData = '';

  @property({ type: Boolean }) accessor checked: boolean;

  @property({ type: Boolean }) accessor disabled: boolean;

  @property({ type: Boolean }) accessor readonly: boolean;

  @property({ type: Boolean }) accessor indeterminate: boolean;

  typeFormControlController = new TypeFormControlController(this);
  typeFormCheckboxController = new TypeFormCheckboxController(this, { requireName: true });
}

describe('type-form-checkbox.controller', () => {
  let element: TypeFormCheckboxControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<form>
        <type-form-checkbox-test-element name="test-checkbox" value="test-value"></type-form-checkbox-test-element>
      </form>`
    );
    element = fixture.querySelector<TypeFormCheckboxControllerTestElement>('type-form-checkbox-test-element');
    await element.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('type-form-checkbox-test-element')).toBe(TypeFormCheckboxControllerTestElement);
  });

  it('should add inline field marker attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('bp-field')).toBe('inline');
  });

  it('should initialize component to be focusable', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should initialize component to have role checkbox', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('checkbox');
    expect(element._internals.ariaChecked).toBe('false');
  });

  it('should initialize component to not be checked', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe('false');
  });

  it('should update aria-disabled based on disabled state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');

    element.disabled = true;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('true');
  });

  it('should update aria-checked based on checked state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe('false');

    element.checked = true;
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe('true');
  });

  it('should dispatch a "change" event on space keypress', async () => {
    const form = fixture.querySelector('form');
    await elementIsStable(element);

    const event = onceEvent(element, 'change');
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));

    expect(await event).toBeTruthy();
    expect(element.checked).toBe(true);

    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-checkbox': 'test-value' });
  });

  it('should remove indeterminate state when checked', async () => {
    await elementIsStable(element);
    element.indeterminate = true;

    const event = onceEvent(element, 'change');
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));

    expect(await event).toBeTruthy();
    expect(element.indeterminate).toBe(false);
  });

  it('should set the form value if checked', async () => {
    const form = fixture.querySelector('form');

    await elementIsStable(element);
    expect(element.checked).toBe(undefined);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({});

    element.checked = true;
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-checkbox': 'test-value' });

    element.checked = false;
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({});
  });

  it('should dispatch change event on click', async () => {
    const form = fixture.querySelector('form');
    await elementIsStable(element);

    const event = onceEvent(element, 'change');
    emulateClick(element);

    expect(await event).toBeTruthy();
    expect(element.checked).toBe(true);

    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-checkbox': 'test-value' });
  });

  it('should not respond to click when disabled', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    emulateClick(element);
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(element.checked).toBe(undefined);
  });

  it('should not respond to click when readonly', async () => {
    await elementIsStable(element);
    element.readonly = true;
    await elementIsStable(element);

    emulateClick(element);
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(element.checked).toBe(undefined);
  });

  it('should not respond to space keypress when disabled', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(element.checked).toBe(undefined);
  });

  it('should not respond to space keypress when readonly', async () => {
    await elementIsStable(element);
    element.readonly = true;
    await elementIsStable(element);

    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(element.checked).toBe(undefined);
  });

  it('should prevent default on space keydown', async () => {
    await elementIsStable(element);

    const keydownEvent = new KeyboardEvent('keydown', { code: 'Space' });
    const preventDefaultSpy = spyOn(keydownEvent, 'preventDefault');
    const stopPropagationSpy = spyOn(keydownEvent, 'stopPropagation');

    element.dispatchEvent(keydownEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('should not respond to non-space key events', async () => {
    await elementIsStable(element);
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' }));
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(element.checked).toBe(undefined);
  });

  it('should handle number values correctly', async () => {
    const form = fixture.querySelector('form');
    element.value = '42';
    await elementIsStable(element);

    element.checked = true;
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-checkbox': '42' });

    element.checked = false;
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({});
  });

  it('should handle checked state updates', async () => {
    const form = fixture.querySelector('form');
    await elementIsStable(element);

    // Set checked state programmatically
    element.checked = true;
    await elementIsStable(element);

    expect(element.checked).toBe(true);
    expect(element._internals.ariaChecked).toBe('true');
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-checkbox': 'test-value' });

    // Uncheck
    element.checked = false;
    await elementIsStable(element);
    expect(element.checked).toBe(false);
    expect(element._internals.ariaChecked).toBe('false');
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({});
  });

  it('should toggle checked state on multiple interactions', async () => {
    const form = fixture.querySelector('form');
    await elementIsStable(element);

    // First click - should check
    emulateClick(element);
    await elementIsStable(element);
    expect(element.checked).toBe(true);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-checkbox': 'test-value' });

    // Second click - should uncheck
    emulateClick(element);
    await elementIsStable(element);
    expect(element.checked).toBe(false);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({});
  });
});

describe('type-form-checkbox.controller with requireName config', () => {
  let element: TypeFormCheckboxConfigTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<form>
        <type-form-checkbox-config-test-element value="test-value"></type-form-checkbox-config-test-element>
      </form>`
    );
    element = fixture.querySelector<TypeFormCheckboxConfigTestElement>('type-form-checkbox-config-test-element');
    await element.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should not update checked state when name is not set and requireName is true', async () => {
    await elementIsStable(element);

    const event = onceEvent(element, 'change');
    emulateClick(element);

    expect(await event).toBeTruthy();
    // Should not update checked state because name is not set
    expect(element.checked).toBe(undefined);
  });

  it('should update checked state when name is set and requireName is true', async () => {
    const form = fixture.querySelector('form');
    element.name = 'test-checkbox';
    await elementIsStable(element);

    const event = onceEvent(element, 'change');
    emulateClick(element);

    expect(await event).toBeTruthy();
    expect(element.checked).toBe(true);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-checkbox': 'test-value' });
  });
});
