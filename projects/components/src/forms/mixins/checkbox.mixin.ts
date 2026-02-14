import { stopEvent, toggleState } from '@blueprintui/components/internals';
import { FormControlInstance, FormControlMixin, FormControlValue } from './form-control.mixin.js';

interface FormControlCheckboxInstance extends FormControlInstance {
  checked: boolean;
  indeterminate: boolean;
  updateCheckedState(): void;
}

export interface CheckboxFormControlMixin {
  new (...args: any[]): FormControlCheckboxInstance;
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
 * Mixin that extends FormControlMixin with checkbox-specific functionality.
 * Provides native HTMLInputElement[type=checkbox]-like behavior for custom checkbox components.
 *
 * Features:
 * - checked: Get/set the checked state of the checkbox
 * - indeterminate: Get/set the indeterminate state (displays a dash)
 * - value: Defaults to 'on' (native checkbox behavior)
 * - type: Returns 'checkbox'
 * - CSS state management for :state(checked) and :state(indeterminate)
 * - Form value handling based on checked state
 */
export function CheckboxFormControlMixin<TBase extends Constructor, T extends FormControlValue>(
  SuperClass: TBase
): TBase & CheckboxFormControlMixin {
  const Base = FormControlMixin<TBase, T>(SuperClass);

  return class CheckboxBase extends Base {
    #checked = false;
    #indeterminate = false;
    #value = 'on';

    static get observedAttributes() {
      return super.observedAttributes.concat(['checked', 'indeterminate']);
    }

    /**
     * Returns the type of the checkbox element.
     */
    get type(): string {
      return 'checkbox';
    }

    set type(_value: string) {
      // Checkbox type is fixed
    }

    /**
     * The value of the checkbox for form submission when checked.
     * Defaults to 'on' (native checkbox behavior).
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

    /**
     * Controls the checked state of the checkbox.
     */
    get checked(): boolean {
      return this.#checked;
    }

    set checked(val: boolean) {
      this.#checked = val;
      this.updateCheckedState();
      this.requestUpdate?.();
    }

    /**
     * Controls the indeterminate state, displaying a dash when
     * neither fully checked nor unchecked.
     */
    get indeterminate(): boolean {
      return this.#indeterminate;
    }

    set indeterminate(val: boolean) {
      this.#indeterminate = val;
      toggleState(this._internals, 'indeterminate', val);
      this.requestUpdate?.();
    }

    connectedCallback() {
      super.connectedCallback?.();
      this.setAttribute('bp-field', 'inline');
      this._internals.role = 'checkbox';
      this.tabIndex = 0;

      // Initialize from attributes on connect
      if (this.hasAttribute('checked')) {
        this.#checked = true;
      }
      if (this.hasAttribute('indeterminate')) {
        this.#indeterminate = true;
      }
      if (this.hasAttribute('value')) {
        this.#value = this.getAttribute('value') ?? 'on';
      }

      this.updateCheckedState();

      // Event listeners for checkbox interaction
      this.addEventListener('click', () => this.toggle());

      this.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.code === 'Space') {
          this.toggle();
        }
      });

      this.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.code === 'Space') {
          stopEvent(e);
        }
      });
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
      } else if (name === 'indeterminate') {
        this.#indeterminate = newValue !== null;
        toggleState(this._internals, 'indeterminate', this.#indeterminate);
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
     * Toggles the checked state if not disabled or readonly.
     * Clears the indeterminate state and dispatches a change event.
     */
    toggle() {
      if (!this.disabled && !this.readOnly) {
        this.checked = !this.checked;
        this.indeterminate = false;
        this.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    /**
     * @override Checkbox-specific validation for required + checked state
     */
    checkValidity(): boolean {
      if (this.noValidate) {
        this._internals.setValidity({});
        return true;
      }

      // Checkbox-specific: required but not checked = valueMissing
      if (this.required && !this.#checked) {
        this._internals.setValidity(
          { valueMissing: true, valid: false },
          'Please check this box if you want to proceed.'
        );
        return false;
      }

      this._internals.setValidity({ valid: true });
      return true;
    }
  } as any;
}
