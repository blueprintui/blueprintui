import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';
import { SwitchControl, TypeFormSwitchController, TypeFormControlController } from '@blueprintui/components/forms';

interface TypeFormSwitchControllerTestElement extends SwitchControl {} // eslint-disable-line

@customElement('type-form-switch-test-element')
class TypeFormSwitchControllerTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) accessor value: string | FormData = '';

  @property({ type: Boolean }) accessor checked: boolean;

  @property({ type: Boolean }) accessor disabled: boolean;

  @property({ type: Boolean }) accessor readonly: boolean;

  typeFormControlController = new TypeFormControlController(this);
  typeFormSwitchController = new TypeFormSwitchController(this);
}

@customElement('type-form-switch-require-name-test-element')
class TypeFormSwitchRequireNameTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) accessor value: string | FormData = '';

  @property({ type: Boolean }) accessor checked: boolean;

  @property({ type: Boolean }) accessor disabled: boolean;

  @property({ type: Boolean }) accessor readonly: boolean;

  typeFormControlController = new TypeFormControlController(this);
  typeFormSwitchController = new TypeFormSwitchController(this, { requireName: true });
}

describe('type-form-switch.controller', () => {
  let element: TypeFormSwitchControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<form>
        <type-form-switch-test-element name="test-switch" value="test-value"></type-form-switch-test-element>
      </form>`
    );
    element = fixture.querySelector<TypeFormSwitchControllerTestElement>('type-form-switch-test-element');
    await element.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('type-form-switch-test-element')).toBe(TypeFormSwitchControllerTestElement);
  });

  it('should add inline field marker attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('bp-field')).toBe('inline');
  });

  it('should initialize component to be focusable', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should initialize component to have role switch', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('switch');
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
    await elementIsStable(element);

    const event = onceEvent(element, 'change');
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));

    expect(await event).toBeTruthy();
    expect(element.checked).toBe(true);
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
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-switch': 'test-value' });

    element.checked = false;
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({});
  });

  it('should handle click interactions', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(undefined);

    const event = onceEvent(element, 'change');
    element.click();

    expect(await event).toBeTruthy();
    expect(element.checked).toBe(true);
  });

  it('should prevent default behavior on space keydown', async () => {
    await elementIsStable(element);

    const keydownEvent = new KeyboardEvent('keydown', { code: 'Space' });
    const preventDefaultSpy = spyOn(keydownEvent, 'preventDefault');

    element.dispatchEvent(keydownEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should not respond to interactions when disabled', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    const changeSpy = jasmine.createSpy('change');
    element.addEventListener('change', changeSpy);

    element.click();
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));

    expect(changeSpy).not.toHaveBeenCalled();
    expect(element.checked).toBe(undefined);
  });

  it('should not respond to interactions when readonly', async () => {
    await elementIsStable(element);
    element.readonly = true;
    await elementIsStable(element);

    const changeSpy = jasmine.createSpy('change');
    element.addEventListener('change', changeSpy);

    element.click();
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));

    expect(changeSpy).not.toHaveBeenCalled();
    expect(element.checked).toBe(undefined);
  });

  it('should handle disabled state correctly', async () => {
    await elementIsStable(element);
    expect(element.disabled).toBe(undefined);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    expect(element._internals.ariaDisabled).toBe('true');

    element.disabled = false;
    await elementIsStable(element);
    expect(element.disabled).toBe(false);
    expect(element._internals.ariaDisabled).toBe('false');
  });

  it('should toggle checked state on multiple interactions', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(undefined);

    // First click - should check
    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(true);

    // Second click - should uncheck
    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(false);

    // Third click - should check again
    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(true);
  });

  it('should handle space key interactions correctly', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(undefined);

    // First space keyup - should check
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    await elementIsStable(element);
    expect(element.checked).toBe(true);

    // Second space keyup - should uncheck
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    await elementIsStable(element);
    expect(element.checked).toBe(false);
  });

  it('should not respond to non-space key events', async () => {
    await elementIsStable(element);

    const changeSpy = jasmine.createSpy('change');
    element.addEventListener('change', changeSpy);

    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' }));
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Tab' }));
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowRight' }));

    expect(changeSpy).not.toHaveBeenCalled();
    expect(element.checked).toBe(undefined);
  });

  it('should maintain form value consistency with checked state', async () => {
    const form = fixture.querySelector('form');

    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({});

    // Check via click
    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(true);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-switch': 'test-value' });

    // Uncheck via space
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    await elementIsStable(element);
    expect(element.checked).toBe(false);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({});
  });

  it('should handle indeterminate state correctly', async () => {
    await elementIsStable(element);
    element.indeterminate = true;
    await elementIsStable(element);

    // Click should remove indeterminate and set checked to true
    element.click();
    await elementIsStable(element);
    expect(element.indeterminate).toBe(false);
    expect(element.checked).toBe(true);

    // Space should toggle to false
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    await elementIsStable(element);
    expect(element.checked).toBe(false);
  });

  it('should respect requireName config option', async () => {
    const requireNameFixture = await createFixture(
      html`<form>
        <type-form-switch-require-name-test-element value="test-value"></type-form-switch-require-name-test-element>
      </form>`
    );
    const requireNameElement = requireNameFixture.querySelector<TypeFormSwitchRequireNameTestElement>(
      'type-form-switch-require-name-test-element'
    );

    await elementIsStable(requireNameElement);

    // Without name attribute, interactions should dispatch change event but not update checked state
    const changeSpy = jasmine.createSpy('change');
    requireNameElement.addEventListener('change', changeSpy);

    requireNameElement.click();
    await elementIsStable(requireNameElement);

    expect(changeSpy).toHaveBeenCalled();
    expect(requireNameElement.checked).toBe(undefined); // Should not change without name

    // With name attribute, interactions should work normally
    requireNameElement.setAttribute('name', 'test-switch');
    await elementIsStable(requireNameElement);

    const secondChangeSpy = jasmine.createSpy('change2');
    requireNameElement.addEventListener('change', secondChangeSpy);

    requireNameElement.click();
    await elementIsStable(requireNameElement);

    expect(secondChangeSpy).toHaveBeenCalled();
    expect(requireNameElement.checked).toBe(true); // Should change with name

    removeFixture(requireNameFixture);
  });
});
