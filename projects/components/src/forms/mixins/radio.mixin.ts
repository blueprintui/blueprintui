import { stopEvent, toggleState } from '@blueprintui/components/internals';
import { FormControlInstance, FormControlMixin, FormControlValue } from './form-control.mixin.js';

interface FormControlRadioInstance extends FormControlInstance {
  checked: boolean;
  updateCheckedState(): void;
}

export interface RadioFormControlMixin {
  new (...args: any[]): FormControlRadioInstance;
  formAssociated: boolean;
  readonly observedAttributes: string[];
}

type Constructor = new (...args: any[]) => HTMLElement & {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  attributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void;
  requestUpdate?(name?: string, oldValue?: unknown): void;
} & {
  observedAttributes?: string[];
};

/**
 * Mixin that extends FormControlMixin with radio-specific functionality.
 * Provides native HTMLInputElement[type=radio]-like behavior for custom radio components.
 *
 * Features:
 * - checked: Get/set the checked state of the radio
 * - value: Defaults to 'on' (native radio behavior)
 * - type: Returns 'radio'
 * - CSS state management for :state(checked)
 * - Form value handling based on checked state
 * - Radio group exclusivity (only one radio with same name can be checked)
 */
export function RadioFormControlMixin<TBase extends Constructor, T extends FormControlValue>(
  SuperClass: TBase
): TBase & RadioFormControlMixin {
  const Base = FormControlMixin<TBase, T>(SuperClass);

  return class RadioBase extends Base {
    #checked = false;
    #value = 'on';
    #boundGroupChangeHandler = this.#handleGroupChange.bind(this);

    static get observedAttributes() {
      return super.observedAttributes.concat(['checked']);
    }

    get type(): string {
      return 'radio';
    }

    set type(_value: string) {
      // Radio type is fixed
    }

    /**
     * The value of the radio for form submission when checked.
     * Defaults to 'on' (native radio behavior).
     */
    get value(): T {
      return this.#value as T;
    }

    set value(val: T) {
      this.#value = val as string;
      this.setAttribute('value', this.#value);
      this.updateCheckedState();
      this.requestUpdate?.();
    }

    get checked(): boolean {
      return this.#checked;
    }

    set checked(val: boolean) {
      this.#checked = val;
      this.updateCheckedState();
      this.requestUpdate?.();
    }

    connectedCallback() {
      super.connectedCallback?.();
      this.setAttribute('bp-field', 'inline');
      this._internals.role = 'radio';
      this.tabIndex = 0;

      if (this.hasAttribute('checked')) {
        this.#checked = true;
      }
      if (this.hasAttribute('value')) {
        this.#value = this.getAttribute('value') ?? 'on';
      }

      this.updateCheckedState();

      this.addEventListener('click', () => this.#check());

      this.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.code === 'Space') {
          this.#check();
        }
      });

      this.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.code === 'Space') {
          stopEvent(e);
        }
      });

      // Listen for changes from other radios in the same group
      document.addEventListener('_change', this.#boundGroupChangeHandler);
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();
      document.removeEventListener('_change', this.#boundGroupChangeHandler);
    }

    /**
     * Handles _change events from other radios in the same group.
     * Unchecks this radio when another radio in the group is checked.
     */
    async #handleGroupChange(e: Event) {
      const target = e.target as RadioBase;
      if (target !== this && target.name === this.name) {
        this.#checked = false;
        this.updateCheckedState();
        this.requestUpdate?.();
      } else if (target.name === this.name) {
        await new Promise(r => requestAnimationFrame(() => r('')));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      }
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      // Handle value attribute before super to override FormControlMixin behavior
      if (name === 'value') {
        this.#value = newValue ?? 'on';
        this.updateCheckedState();
        this.requestUpdate?.();
      } else if (name === 'checked') {
        this.#checked = newValue !== null;
        this.updateCheckedState();
        this.requestUpdate?.();
      } else if (super.attributeChangedCallback) {
        // Only call super for attributes we don't handle
        super.attributeChangedCallback(name, oldValue, newValue);
      }
    }

    /**
     * Updates the internal state and form value based on the checked state.
     * Call this method when the checked state changes.
     */
    updateCheckedState() {
      this._internals.ariaChecked = this.#checked ? 'true' : 'false';
      toggleState(this._internals, 'checked', this.#checked);

      // Set form value based on checked state
      const value = typeof this.#value === 'number' ? `${this.#value}` : this.#value;
      this._internals.setFormValue(this.#checked ? value : null);
    }

    /**
     * Checks the radio if not disabled or readonly.
     * Dispatches internal _change event to notify other radios in the group.
     */
    #check() {
      if (!this.disabled && !this.readOnly && !this.#checked) {
        this.#checked = true;
        this.updateCheckedState();
        this.requestUpdate?.();
        this.dispatchEvent(new Event('_change', { bubbles: true, composed: true }));
      }
    }

    /**
     * @override Radio-specific validation for required + checked state in group
     */
    checkValidity(): boolean {
      if (this.noValidate) {
        this._internals.setValidity({});
        return true;
      }

      // Radio-specific: required but no radio in group is checked = valueMissing
      if (this.required && !this.#isGroupChecked()) {
        this._internals.setValidity({ valueMissing: true, valid: false }, 'Please select one of these options.');
        return false;
      }

      this._internals.setValidity({ valid: true });
      return true;
    }

    /**
     * Checks if any radio in the same group (by name) is checked.
     */
    #isGroupChecked(): boolean {
      if (!this.name) {
        return this.#checked;
      }

      const radios = document.querySelectorAll(`[name="${this.name}"]`);
      return Array.from(radios).some((radio: any) => radio.checked);
    }
  } as any;
}
