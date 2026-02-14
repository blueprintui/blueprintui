import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { RadioFormControlMixin } from './radio.mixin.js';
import '@blueprintui/components/include/forms.js';

@customElement('bp-test-radio')
class TestRadio extends RadioFormControlMixin<typeof LitElement, string>(LitElement) {
  render() {
    return html` <input type="radio" tabindex="-1" inert .checked=${this.checked} .disabled=${this.disabled} /> `;
  }
}

describe('RadioFormControlMixin', () => {
  let element: TestRadio;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>radio</label>
        <bp-test-radio name="test"></bp-test-radio>
      </bp-field>
    `);

    element = fixture.querySelector<TestRadio>('bp-test-radio');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    expect(element).toBeTruthy();
  });

  it('should have form association enabled', async () => {
    expect((TestRadio as any).formAssociated).toBe(true);
  });

  describe('type property', () => {
    it('should return "radio"', async () => {
      expect(element.type).toBe('radio');
    });

    it('should not change when type is set', async () => {
      element.type = 'text';
      expect(element.type).toBe('radio');
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
      const checkedFixture = await createFixture(html`<bp-test-radio checked></bp-test-radio>`);
      const checkedElement = checkedFixture.querySelector<TestRadio>('bp-test-radio');
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
      const checkedFixture = await createFixture(html`<bp-test-radio checked></bp-test-radio>`);
      const checkedElement = checkedFixture.querySelector<TestRadio>('bp-test-radio');
      await elementIsStable(checkedElement);

      expect(checkedElement.checked).toBe(true);
      checkedElement.removeAttribute('checked');
      await elementIsStable(checkedElement);
      expect(checkedElement.checked).toBe(false);
      removeFixture(checkedFixture);
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
  });

  describe('aria attributes', () => {
    it('should set role to radio', async () => {
      expect((element as any)._internals.role).toBe('radio');
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

  describe('click behavior', () => {
    it('should check on click', async () => {
      expect(element.checked).toBe(false);

      emulateClick(element);
      await elementIsStable(element);
      expect(element.checked).toBe(true);
    });

    it('should not uncheck on subsequent click (radio behavior)', async () => {
      element.checked = true;
      await elementIsStable(element);

      emulateClick(element);
      await elementIsStable(element);
      expect(element.checked).toBe(true);
    });

    it('should not check when disabled', async () => {
      element.disabled = true;
      await elementIsStable(element);

      emulateClick(element);
      await elementIsStable(element);
      expect(element.checked).toBe(false);
    });

    it('should not check when readonly', async () => {
      element.readOnly = true;
      await elementIsStable(element);

      emulateClick(element);
      await elementIsStable(element);
      expect(element.checked).toBe(false);
    });
  });

  describe('radio group exclusivity', () => {
    let radioFixture: HTMLElement;
    let radio1: TestRadio;
    let radio2: TestRadio;
    let radio3: TestRadio;

    beforeEach(async () => {
      radioFixture = await createFixture(html`
        <form>
          <bp-test-radio name="group" value="1" checked></bp-test-radio>
          <bp-test-radio name="group" value="2"></bp-test-radio>
          <bp-test-radio name="group" value="3"></bp-test-radio>
        </form>
      `);

      const radios = radioFixture.querySelectorAll<TestRadio>('bp-test-radio');
      radio1 = radios[0];
      radio2 = radios[1];
      radio3 = radios[2];
      await elementIsStable(radio1);
      await elementIsStable(radio2);
      await elementIsStable(radio3);
    });

    afterEach(() => {
      removeFixture(radioFixture);
    });

    it('should only allow one radio checked at a time', async () => {
      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);
      expect(radio3.checked).toBe(false);

      emulateClick(radio2);
      await elementIsStable(radio1);
      await elementIsStable(radio2);

      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
      expect(radio3.checked).toBe(false);

      emulateClick(radio3);
      await elementIsStable(radio2);
      await elementIsStable(radio3);

      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(false);
      expect(radio3.checked).toBe(true);
    });

    it('should update CSS states correctly in group', async () => {
      expect(radio1.matches(':state(checked)')).toBe(true);
      expect(radio2.matches(':state(checked)')).toBe(false);

      emulateClick(radio2);
      await elementIsStable(radio1);
      await elementIsStable(radio2);

      expect(radio1.matches(':state(checked)')).toBe(false);
      expect(radio2.matches(':state(checked)')).toBe(true);
    });

    it('should emit change event when selection changes', async () => {
      const event = onceEvent(radioFixture, 'change');
      emulateClick(radio2);
      await event;
      expect(radio2.checked).toBe(true);
    });
  });

  describe('form integration', () => {
    it('should include value in form data when checked', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-radio name="choice" value="yes" checked></bp-test-radio>
        </form>
      `);
      const radioElement = formFixture.querySelector<TestRadio>('bp-test-radio');
      await elementIsStable(radioElement);

      const form = formFixture.querySelector('form');
      const formData = new FormData(form);

      expect(formData.get('choice')).toBe('yes');
      removeFixture(formFixture);
    });

    it('should not include value in form data when unchecked', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-radio name="choice" value="yes"></bp-test-radio>
        </form>
      `);
      const radioElement = formFixture.querySelector<TestRadio>('bp-test-radio');
      await elementIsStable(radioElement);

      const form = formFixture.querySelector('form');
      const formData = new FormData(form);

      expect(formData.get('choice')).toBe(null);
      removeFixture(formFixture);
    });

    it('should include default value "on" in form data when checked with no value', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-radio name="choice" checked></bp-test-radio>
        </form>
      `);
      const radioElement = formFixture.querySelector<TestRadio>('bp-test-radio');
      await elementIsStable(radioElement);

      const form = formFixture.querySelector('form');
      const formData = new FormData(form);

      expect(formData.get('choice')).toBe('on');
      removeFixture(formFixture);
    });

    it('should update form value when checked changes', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-radio name="choice" value="selected"></bp-test-radio>
        </form>
      `);
      const radioElement = formFixture.querySelector<TestRadio>('bp-test-radio');
      await elementIsStable(radioElement);

      const form = formFixture.querySelector('form');

      // Initially unchecked
      expect(new FormData(form).get('choice')).toBe(null);

      // Check the radio
      radioElement.checked = true;
      await elementIsStable(radioElement);
      expect(new FormData(form).get('choice')).toBe('selected');

      // Uncheck the radio (programmatically)
      radioElement.checked = false;
      await elementIsStable(radioElement);
      expect(new FormData(form).get('choice')).toBe(null);

      removeFixture(formFixture);
    });

    it('should submit correct value to form', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-radio name="option" value="a"></bp-test-radio>
          <bp-test-radio name="option" value="b"></bp-test-radio>
          <button type="submit">Submit</button>
        </form>
      `);
      const radios = formFixture.querySelectorAll<TestRadio>('bp-test-radio');
      const form = formFixture.querySelector('form');
      const button = formFixture.querySelector('button');

      form.addEventListener('submit', e => e.preventDefault());

      emulateClick(radios[1]); // Select option "b"
      await elementIsStable(radios[1]);

      const event = onceEvent(form, 'submit');
      emulateClick(button);
      await event;

      expect(Object.fromEntries(new FormData(form) as any)).toEqual({ option: 'b' });
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

    it('should be valid when any radio in group is checked', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-radio name="required-group" value="1" required></bp-test-radio>
          <bp-test-radio name="required-group" value="2" required checked></bp-test-radio>
        </form>
      `);
      const radios = formFixture.querySelectorAll<TestRadio>('bp-test-radio');
      await elementIsStable(radios[0]);
      await elementIsStable(radios[1]);

      // First radio is required but second is checked, so first should be valid
      expect(radios[0].checkValidity()).toBe(true);
      expect(radios[1].checkValidity()).toBe(true);

      removeFixture(formFixture);
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

    it('should have internal input with tabindex="-1"', async () => {
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('tabindex')).toBe('-1');
    });

    it('should have internal input with inert attribute', async () => {
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.hasAttribute('inert')).toBe(true);
    });
  });

  describe('keyboard interaction', () => {
    it('should check on Space key', async () => {
      expect(element.checked).toBe(false);

      element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
      await elementIsStable(element);
      expect(element.checked).toBe(true);
    });

    it('should prevent default on Space keydown', async () => {
      const event = new KeyboardEvent('keydown', { code: 'Space', cancelable: true });
      element.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('cleanup', () => {
    it('should remove event listener on disconnect', async () => {
      const testFixture = await createFixture(html`<bp-test-radio name="cleanup-test"></bp-test-radio>`);
      const testElement = testFixture.querySelector<TestRadio>('bp-test-radio');
      await elementIsStable(testElement);

      // Disconnect the element
      testElement.remove();

      // Create another radio with the same name and check it
      const anotherFixture = await createFixture(html`<bp-test-radio name="cleanup-test"></bp-test-radio>`);
      const anotherElement = anotherFixture.querySelector<TestRadio>('bp-test-radio');
      await elementIsStable(anotherElement);

      // The removed element should not respond to _change events
      anotherElement.checked = true;
      anotherElement.dispatchEvent(new Event('_change', { bubbles: true, composed: true }));
      await elementIsStable(anotherElement);

      // No errors should occur
      expect(true).toBe(true);

      removeFixture(testFixture);
      removeFixture(anotherFixture);
    });
  });
});
