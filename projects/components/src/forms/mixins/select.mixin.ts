import { FormControlInstance, FormControlMixin, FormControlValue } from './form-control.mixin.js';

export interface SelectOption extends HTMLElement {
  value: string;
  selected: boolean;
  disabled: boolean;
  textContent: string | null;
  hasAttribute(name: string): boolean;
}

interface FormControlSelectInstance extends FormControlInstance {
  options: SelectOption[];
  selectedOptions: SelectOption[];
  selectedIndex: number;
  length: number;
  value: string | FormData;
  updateInitialSelected(): void;
}

export interface SelectFormControlMixin {
  new (...args: any[]): FormControlSelectInstance;
  formAssociated: boolean;
  readonly observedAttributes: string[];
}

interface OptionInstance extends HTMLElement {
  value: string;
  selected: boolean;
  disabled: boolean;
}

export interface OptionMixin {
  new (...args: any[]): OptionInstance;
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
 * Mixin that extends FormControlMixin with select-specific functionality.
 * Provides native HTMLSelectElement-like behavior for custom select components.
 *
 * Features:
 * - options: Returns array of option elements
 * - selectedOptions: Returns array of selected option elements
 * - selectedIndex: Get/set the index of the first selected option
 * - length: Returns the number of options
 * - type: Returns 'select-one' or 'select-multiple'
 * - size: Defaults to 1 (unlike input which defaults to 20)
 * - Multiple select support with FormData for form submission
 */
export function SelectFormControlMixin<TBase extends Constructor, T extends FormControlValue>(
  SuperClass: TBase
): TBase & SelectFormControlMixin {
  const Base = FormControlMixin<TBase, T>(SuperClass);

  return class SelectBase extends Base {
    /**
     * Returns the type of the select element.
     * 'select-multiple' when multiple is true, 'select-one' otherwise.
     */
    get type(): string {
      return this.multiple ? 'select-multiple' : 'select-one';
    }

    set type(value: string) {
      if (value === 'select-multiple') {
        this.multiple = true;
      } else if (value === 'select-one') {
        this.multiple = false;
      }
    }

    /**
     * Returns an array of all option elements within the select.
     * Override this getter in the component to return the appropriate option elements.
     */
    get options(): SelectOption[] {
      return Array.from(this.querySelectorAll<SelectOption>('[bp-option], bp-option'));
    }

    /**
     * @override Select element default size is 1, not 20 like input
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/size
     */
    get size(): number {
      return this.hasAttribute('size') ? Number(this.getAttribute('size')) : 1;
    }

    set size(value: number) {
      super.size = value;
    }

    /**
     * @override Sync selected state on options when value is set
     */
    set value(val: T) {
      const strVal = val as string;
      // Deselect all options first
      this.options.forEach(o => (o.selected = false));
      // Find and select matching option
      const matchingOption = this.options.find(o => o.value === strVal);
      if (matchingOption) {
        matchingOption.selected = true;
        super.value = val;
      } else {
        // If no matching option, set to empty string (native select behavior)
        super.value = '' as T;
      }
    }

    get value(): T {
      return super.value as T;
    }

    /**
     * Returns the index of the first selected option, or -1 if no option is selected.
     */
    get selectedIndex(): number {
      return this.options.findIndex(o => o.selected);
    }

    /**
     * Sets the selected option by index.
     * Deselects all other options first.
     */
    set selectedIndex(value: number) {
      // Deselect all options first
      this.options.forEach(o => (o.selected = false));
      if (value >= 0 && value < this.options.length) {
        this.options[value].selected = true;
        super.value = this.options[value].value as T;
      } else {
        super.value = '' as T;
      }
    }

    /**
     * Returns an array of all selected option elements.
     */
    get selectedOptions(): SelectOption[] {
      return this.options.filter(o => o.selected);
    }

    /**
     * Returns the number of options in the select.
     */
    get length(): number {
      return this.options.length;
    }

    /**
     * Updates the initial selected state based on options with the selected attribute.
     * Also handles auto-selecting the first option for single select when no option is selected.
     * Call this method from the component's slotchange handler.
     */
    updateInitialSelected() {
      // Check if any option has selected attribute (may not be reflected to property yet)
      const optionsWithSelectedAttr = this.options.filter(o => o.hasAttribute('selected'));

      // If options have the selected attribute, sync their property and set value
      if (optionsWithSelectedAttr.length > 0) {
        optionsWithSelectedAttr.forEach(o => (o.selected = true));
        this.#updateFormValue();
      } else if (this.options.length > 0 && this.selectedIndex === -1) {
        // Auto-select first option if none selected (native select behavior for single select)
        this.options[0].selected = true;
        this.#updateFormValue();
      }

      if (this.defaultValue === '') {
        this.defaultValue = super.value as string;
      }
    }

    #updateFormValue() {
      // value property always returns the first selected option's value (string)
      const firstSelected = this.selectedOptions[0];
      super.value = (firstSelected?.value ?? '') as T;

      // For multiple select, set FormData for form submission with all selected values
      // This must be called AFTER super.value to override the mixin's setFormValue call
      if (this.multiple && this.name) {
        const formData = new FormData();
        this.selectedOptions.forEach(o => formData.append(this.name, o.value));
        // Use queueMicrotask to ensure this runs after the mixin's updateValue completes
        queueMicrotask(() => this._internals.setFormValue(formData));
      }
    }
  } as any;
}

/**
 * Mixin that provides option-specific functionality for custom option elements.
 * Provides native HTMLOptionElement-like behavior.
 *
 * Features:
 * - value: Get/set the option value (defaults to textContent if not set)
 * - selected: Get/set whether the option is selected
 * - disabled: Get/set whether the option is disabled
 */
export function OptionMixin<TBase extends Constructor>(SuperClass: TBase): TBase & OptionMixin {
  const parentObservedAttributes =
    (SuperClass as unknown as { observedAttributes?: string[] }).observedAttributes ?? [];

  return class OptionBase extends SuperClass implements SelectOption {
    #value: string;
    #selected = false;
    #disabled = false;

    static get observedAttributes() {
      return [...parentObservedAttributes, 'value', 'selected', 'disabled'];
    }

    /**
     * The value of the option for form submission when selected.
     * Defaults to textContent if not explicitly set.
     */
    get value(): string {
      return this.#value ?? this.textContent?.trim() ?? '';
    }

    set value(val: string) {
      this.#value = val;
    }

    /**
     * Whether the option is selected in the dropdown.
     */
    get selected(): boolean {
      return this.#selected;
    }

    set selected(val: boolean) {
      this.#selected = val;
      this.requestUpdate?.();
    }

    /**
     * Whether the option is disabled and cannot be selected.
     */
    get disabled(): boolean {
      return this.#disabled;
    }

    set disabled(val: boolean) {
      this.#disabled = val;
      this.requestUpdate?.();
    }

    connectedCallback() {
      super.connectedCallback?.();
      // Initialize from attributes on connect
      if (this.hasAttribute('value')) {
        this.#value = this.getAttribute('value') ?? '';
      }
      if (this.hasAttribute('selected')) {
        this.#selected = true;
      }
      if (this.hasAttribute('disabled')) {
        this.#disabled = true;
      }
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      // Handle our own attributes first
      if (name === 'value') {
        this.#value = newValue ?? '';
      } else if (name === 'selected') {
        this.#selected = newValue !== null;
      } else if (name === 'disabled') {
        this.#disabled = newValue !== null;
      } else if (super.attributeChangedCallback) {
        // Only call super for attributes we don't handle
        super.attributeChangedCallback(name, oldValue, newValue);
      }
    }
  } as any;
}
