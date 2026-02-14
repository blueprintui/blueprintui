import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { CheckboxFormControlMixin } from './checkbox.mixin.js';
import '@blueprintui/components/include/forms.js';

@customElement('bp-test-checkbox')
class TestCheckbox extends CheckboxFormControlMixin<typeof LitElement, string>(LitElement) {
  render() {
    return html`
      <input
        type="checkbox"
        tabindex="-1"
        inert
        .checked=${this.checked}
        .disabled=${this.disabled}
        .indeterminate=${this.indeterminate} />
    `;
  }
}

describe('CheckboxFormControlMixin', () => {
  let element: TestCheckbox;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>checkbox</label>
        <bp-test-checkbox name="test"></bp-test-checkbox>
      </bp-field>
    `);

    element = fixture.querySelector<TestCheckbox>('bp-test-checkbox');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    expect(element).toBeTruthy();
  });

  it('should have form association enabled', async () => {
    expect((TestCheckbox as any).formAssociated).toBe(true);
  });

  describe('type property', () => {
    it('should return "checkbox"', async () => {
      expect(element.type).toBe('checkbox');
    });

    it('should not change when type is set', async () => {
      element.type = 'text';
      expect(element.type).toBe('checkbox');
    });
  });

  describe('value property', () => {
    it('should default to "on"', async () => {
      expect(element.value).toBe('on');
    });

    it('should be settable via property', async () => {
      element.value = 'custom-value';
      expect(element.value).toBe('custom-value');
    });

    it('should reflect value attribute', async () => {
      element.setAttribute('value', 'attr-value');
      await elementIsStable(element);
      expect(element.value).toBe('attr-value');
    });

    it('should update attribute when property is set', async () => {
      element.value = 'new-value';
      await elementIsStable(element);
      expect(element.getAttribute('value')).toBe('new-value');
    });
  });

  describe('checked property', () => {
    it('should default to false', async () => {
      expect(element.checked).toBe(false);
    });

    it('should be settable via property', async () => {
      element.checked = true;
      expect(element.checked).toBe(true);

      element.checked = false;
      expect(element.checked).toBe(false);
    });

    it('should reflect checked attribute on initialization', async () => {
      const checkedFixture = await createFixture(html`<bp-test-checkbox checked></bp-test-checkbox>`);
      const checkedElement = checkedFixture.querySelector<TestCheckbox>('bp-test-checkbox');
      await elementIsStable(checkedElement);

      expect(checkedElement.checked).toBe(true);
      removeFixture(checkedFixture);
    });

    it('should update when attribute is added', async () => {
      element.setAttribute('checked', '');
      await elementIsStable(element);
      expect(element.checked).toBe(true);
    });

    it('should update when attribute is removed', async () => {
      const checkedFixture = await createFixture(html`<bp-test-checkbox checked></bp-test-checkbox>`);
      const checkedElement = checkedFixture.querySelector<TestCheckbox>('bp-test-checkbox');
      await elementIsStable(checkedElement);

      expect(checkedElement.checked).toBe(true);
      checkedElement.removeAttribute('checked');
      await elementIsStable(checkedElement);
      expect(checkedElement.checked).toBe(false);
      removeFixture(checkedFixture);
    });
  });

  describe('indeterminate property', () => {
    it('should default to false', async () => {
      expect(element.indeterminate).toBe(false);
    });

    it('should be settable via property', async () => {
      element.indeterminate = true;
      expect(element.indeterminate).toBe(true);

      element.indeterminate = false;
      expect(element.indeterminate).toBe(false);
    });

    it('should reflect indeterminate attribute on initialization', async () => {
      const indeterminateFixture = await createFixture(html`<bp-test-checkbox indeterminate></bp-test-checkbox>`);
      const indeterminateElement = indeterminateFixture.querySelector<TestCheckbox>('bp-test-checkbox');
      await elementIsStable(indeterminateElement);

      expect(indeterminateElement.indeterminate).toBe(true);
      removeFixture(indeterminateFixture);
    });

    it('should sync with internal input', async () => {
      element.indeterminate = true;
      await elementIsStable(element);
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.indeterminate).toBe(true);
    });
  });

  describe('CSS states', () => {
    it('should add :state(checked) when checked', async () => {
      expect(element.matches(':state(checked)')).toBe(false);

      element.checked = true;
      await elementIsStable(element);
      expect(element.matches(':state(checked)')).toBe(true);
    });

    it('should remove :state(checked) when unchecked', async () => {
      element.checked = true;
      await elementIsStable(element);
      expect(element.matches(':state(checked)')).toBe(true);

      element.checked = false;
      await elementIsStable(element);
      expect(element.matches(':state(checked)')).toBe(false);
    });

    it('should add :state(indeterminate) when indeterminate', async () => {
      expect(element.matches(':state(indeterminate)')).toBe(false);

      element.indeterminate = true;
      await elementIsStable(element);
      expect(element.matches(':state(indeterminate)')).toBe(true);
    });

    it('should remove :state(indeterminate) when not indeterminate', async () => {
      element.indeterminate = true;
      await elementIsStable(element);
      expect(element.matches(':state(indeterminate)')).toBe(true);

      element.indeterminate = false;
      await elementIsStable(element);
      expect(element.matches(':state(indeterminate)')).toBe(false);
    });
  });

  describe('aria attributes', () => {
    it('should set role to checkbox', async () => {
      expect((element as any)._internals.role).toBe('checkbox');
    });

    it('should set ariaChecked to "true" when checked', async () => {
      element.checked = true;
      await elementIsStable(element);
      expect((element as any)._internals.ariaChecked).toBe('true');
    });

    it('should set ariaChecked to "false" when unchecked', async () => {
      element.checked = false;
      await elementIsStable(element);
      expect((element as any)._internals.ariaChecked).toBe('false');
    });
  });

  describe('toggle method', () => {
    it('should toggle checked state', async () => {
      expect(element.checked).toBe(false);

      element.toggle();
      await elementIsStable(element);
      expect(element.checked).toBe(true);

      element.toggle();
      await elementIsStable(element);
      expect(element.checked).toBe(false);
    });

    it('should clear indeterminate state on toggle', async () => {
      element.indeterminate = true;
      await elementIsStable(element);
      expect(element.indeterminate).toBe(true);

      element.toggle();
      await elementIsStable(element);
      expect(element.indeterminate).toBe(false);
    });

    it('should dispatch change event', async () => {
      const event = onceEvent(element, 'change');
      element.toggle();
      await event;
    });

    it('should not toggle when disabled', async () => {
      element.disabled = true;
      await elementIsStable(element);

      element.toggle();
      await elementIsStable(element);
      expect(element.checked).toBe(false);
    });

    it('should not toggle when readonly', async () => {
      element.readOnly = true;
      await elementIsStable(element);

      element.toggle();
      await elementIsStable(element);
      expect(element.checked).toBe(false);
    });
  });

  describe('click behavior', () => {
    it('should toggle on click', async () => {
      expect(element.checked).toBe(false);

      emulateClick(element);
      await elementIsStable(element);
      expect(element.checked).toBe(true);

      emulateClick(element);
      await elementIsStable(element);
      expect(element.checked).toBe(false);
    });

    it('should emit change event on click', async () => {
      const event = onceEvent(element, 'change');
      emulateClick(element);
      await event;
      expect(element.checked).toBe(true);
    });
  });

  describe('form integration', () => {
    it('should include value in form data when checked', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-checkbox name="accept" checked></bp-test-checkbox>
        </form>
      `);
      const checkboxElement = formFixture.querySelector<TestCheckbox>('bp-test-checkbox');
      await elementIsStable(checkboxElement);

      const form = formFixture.querySelector('form');
      const formData = new FormData(form);

      expect(formData.get('accept')).toBe('on');
      removeFixture(formFixture);
    });

    it('should not include value in form data when unchecked', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-checkbox name="accept"></bp-test-checkbox>
        </form>
      `);
      const checkboxElement = formFixture.querySelector<TestCheckbox>('bp-test-checkbox');
      await elementIsStable(checkboxElement);

      const form = formFixture.querySelector('form');
      const formData = new FormData(form);

      expect(formData.get('accept')).toBe(null);
      removeFixture(formFixture);
    });

    it('should include custom value in form data when checked', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-checkbox name="accept" value="yes" checked></bp-test-checkbox>
        </form>
      `);
      const checkboxElement = formFixture.querySelector<TestCheckbox>('bp-test-checkbox');
      await elementIsStable(checkboxElement);

      const form = formFixture.querySelector('form');
      const formData = new FormData(form);

      expect(formData.get('accept')).toBe('yes');
      removeFixture(formFixture);
    });

    it('should update form value when checked changes', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-checkbox name="accept"></bp-test-checkbox>
        </form>
      `);
      const checkboxElement = formFixture.querySelector<TestCheckbox>('bp-test-checkbox');
      await elementIsStable(checkboxElement);

      const form = formFixture.querySelector('form');

      // Initially unchecked
      expect(new FormData(form).get('accept')).toBe(null);

      // Check the checkbox
      checkboxElement.checked = true;
      await elementIsStable(checkboxElement);
      expect(new FormData(form).get('accept')).toBe('on');

      // Uncheck the checkbox
      checkboxElement.checked = false;
      await elementIsStable(checkboxElement);
      expect(new FormData(form).get('accept')).toBe(null);

      removeFixture(formFixture);
    });

    it('should submit to form when checked', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-checkbox name="terms"></bp-test-checkbox>
          <button type="submit">Submit</button>
        </form>
      `);
      const checkboxElement = formFixture.querySelector<TestCheckbox>('bp-test-checkbox');
      const form = formFixture.querySelector('form');
      const button = formFixture.querySelector('button');

      form.addEventListener('submit', e => e.preventDefault());

      emulateClick(checkboxElement);
      await elementIsStable(checkboxElement);

      const event = onceEvent(form, 'submit');
      emulateClick(button);
      await event;

      expect(Object.fromEntries(new FormData(form) as any)).toEqual({ terms: 'on' });
      removeFixture(formFixture);
    });
  });

  describe('disabled state', () => {
    it('should support disabled property', async () => {
      expect(element.disabled).toBe(false);

      element.disabled = true;
      await elementIsStable(element);
      expect(element.disabled).toBe(true);
    });

    it('should add :state(disabled) CSS state', async () => {
      element.disabled = true;
      await elementIsStable(element);
      expect(element.matches(':state(disabled)')).toBe(true);
    });

    it('should sync with internal input', async () => {
      element.disabled = true;
      await elementIsStable(element);
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.disabled).toBe(true);
    });
  });

  describe('readonly state', () => {
    it('should support readOnly property', async () => {
      expect(element.readOnly).toBe(false);

      element.readOnly = true;
      await elementIsStable(element);
      expect(element.readOnly).toBe(true);
    });

    it('should add :state(readonly) CSS state', async () => {
      element.readOnly = true;
      await elementIsStable(element);
      expect(element.matches(':state(readonly)')).toBe(true);
    });
  });

  describe('required state', () => {
    it('should support required property', async () => {
      expect(element.required).toBe(false);

      element.required = true;
      await elementIsStable(element);
      expect(element.required).toBe(true);
    });

    it('should add :state(required) CSS state', async () => {
      element.required = true;
      await elementIsStable(element);
      expect(element.matches(':state(required)')).toBe(true);
    });
  });

  describe('validation', () => {
    it('should be invalid when required and not checked', async () => {
      element.required = true;
      await elementIsStable(element);
      element.checkValidity();
      expect(element.validity.valueMissing).toBe(true);
    });

    it('should be valid when required and checked', async () => {
      element.required = true;
      element.checked = true;
      await elementIsStable(element);
      expect(element.validity.valid).toBe(true);
    });

    it('should have checkValidity method', async () => {
      expect(typeof element.checkValidity).toBe('function');
    });

    it('should have reportValidity method', async () => {
      expect(typeof element.reportValidity).toBe('function');
    });
  });

  describe('focusability', () => {
    it('should be focusable', async () => {
      element.focus();
      expect(document.activeElement).toBe(element);
    });

    it('should have tabIndex of 0', async () => {
      expect(element.tabIndex).toBe(0);
    });
  });

  describe('touched state', () => {
    it('should add :state(touched) after focus and blur', async () => {
      expect(element.matches(':state(touched)')).toBe(false);

      element.focus();
      element.blur();
      await elementIsStable(element);
      expect(element.matches(':state(touched)')).toBe(true);
    });
  });

  describe('bp-field attribute', () => {
    it('should have bp-field="inline" attribute', async () => {
      expect(element.getAttribute('bp-field')).toBe('inline');
    });
  });

  describe('state transitions', () => {
    it('should handle unchecked -> checked -> indeterminate -> unchecked', async () => {
      // unchecked -> checked
      element.checked = true;
      await elementIsStable(element);
      expect(element.matches(':state(checked)')).toBe(true);

      // checked -> indeterminate
      element.indeterminate = true;
      await elementIsStable(element);
      expect(element.indeterminate).toBe(true);

      // indeterminate -> unchecked
      element.indeterminate = false;
      element.checked = false;
      await elementIsStable(element);
      expect(element.matches(':state(checked)')).toBe(false);
      expect(element.indeterminate).toBe(false);
    });
  });

  describe('internal input sync', () => {
    it('should sync checked state with internal input', async () => {
      element.checked = true;
      await elementIsStable(element);
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.checked).toBe(true);
    });

    it('should sync disabled state with internal input', async () => {
      element.disabled = true;
      await elementIsStable(element);
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.disabled).toBe(true);
    });

    it('should sync indeterminate state with internal input', async () => {
      element.indeterminate = true;
      await elementIsStable(element);
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.indeterminate).toBe(true);
    });

    it('should have internal input with tabindex="-1"', async () => {
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('tabindex')).toBe('-1');
    });

    it('should have internal input with inert attribute', async () => {
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.hasAttribute('inert')).toBe(true);
    });
  });
});
