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

  typeFormControlController = new TypeFormControlController(this);
  typeFormSwitchController = new TypeFormSwitchController(this);
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
});
