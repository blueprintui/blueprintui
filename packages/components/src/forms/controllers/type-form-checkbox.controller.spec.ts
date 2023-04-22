import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/components/test';
import { CheckboxControl, TypeFormCheckboxController, TypeFormControlController } from '@blueprintui/components/forms';

interface TypeFormCheckboxControllerTestElement extends CheckboxControl {} // eslint-disable-line

@customElement('type-form-checkbox-test-element')
class TypeFormCheckboxControllerTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) value: string | FormData = '';

  @property({ type: Boolean, reflect: true }) checked: boolean;

  @property({ type: Boolean, reflect: true }) disabled: boolean;

  typeFormControlController = new TypeFormControlController(this);
  typeFormCheckboxController = new TypeFormCheckboxController(this);
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
});
