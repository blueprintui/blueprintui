import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { attachInternals, baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/toggle-group.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>Time frame</label>
 *   <bp-toggle-group name="timeframe" value="day">
 *     <bp-toggle-group-option value="day" checked>Day</bp-toggle-group-option>
 *     <bp-toggle-group-option value="week">Week</bp-toggle-group-option>
 *     <bp-toggle-group-option value="month">Month</bp-toggle-group-option>
 *   </bp-toggle-group>
 * </bp-field>
 * ```
 *
 * @summary Toggle group allows users to select one option from a set of closely related choices with immediate visual feedback
 * @element bp-toggle-group
 * @since 2.11.0
 * @event {InputEvent} input - occurs during value change
 * @event {InputEvent} change - occurs when value change is committed
 * @slot - content slot for bp-toggle-group-option elements
 * @cssprop --background - background color of the group container
 * @cssprop --border-radius - border radius of the group container
 * @cssprop --gap - gap between options
 */
export class BpToggleGroup extends LitElement {
  static styles = [baseStyles, styles];

  static formAssociated = true;

  /** @private */
  _internals: ElementInternals;

  /** form control name */
  @property({ type: String }) accessor name: string;

  /** currently selected value */
  @property({ type: String }) accessor value: string;

  /** disables all options */
  @property({ type: Boolean }) accessor disabled: boolean;

  /** options fill container width equally */
  @property({ type: Boolean }) accessor expand: boolean;

  /** form validation requirement */
  @property({ type: Boolean }) accessor required: boolean;

  /** prevents value changes */
  @property({ type: Boolean }) accessor readonly: boolean;

  @state() private accessor _options: BpToggleGroupOption[] = [];

  get form() {
    return this._internals.form;
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'radiogroup';
    this._internals.states.add('bp-layer');

    this.addEventListener('_toggle-option-change', this.#handleOptionChange as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('_toggle-option-change', this.#handleOptionChange as EventListener);
  }

  firstUpdated() {
    this.#updateOptions();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('name') || changedProperties.has('disabled') || changedProperties.has('readonly')) {
      this.#updateOptions();
    }

    if (changedProperties.has('value')) {
      this.#syncValueToOptions();
      this.#updateFormValue();
    }

    if (changedProperties.has('expand')) {
      this.#updateOptions();
    }

    if (changedProperties.has('required')) {
      this.#updateValidity();
    }

    this.#updateAriaState();
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }

  reset() {
    const initialOption = this._options.find(option => option.hasAttribute('checked'));
    if (initialOption) {
      this.value = initialOption.value;
    } else if (this._options.length > 0) {
      this.value = this._options[0].value;
    }
  }

  #handleOptionChange(e: CustomEvent) {
    const option = e.target as BpToggleGroupOption;
    if (option.checked && option.value !== this.value) {
      this.value = option.value;
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  #updateOptions() {
    const slot = this.renderRoot.querySelector('slot');
    if (slot) {
      this._options = Array.from(slot.assignedElements()).filter(
        (el): el is BpToggleGroupOption => el.tagName === 'BP-TOGGLE-GROUP-OPTION'
      );

      this._options.forEach(option => {
        option.name = this.name;
        option.disabled = this.disabled || option.disabled;
        option.readonly = this.readonly || option.readonly;
        option._expand = this.expand;
      });
    }
  }

  #syncValueToOptions() {
    this._options.forEach(option => {
      option.checked = option.value === this.value;
    });
  }

  #updateFormValue() {
    this._internals.setFormValue(this.value || null);
  }

  #updateValidity() {
    if (this.required && !this.value) {
      this._internals.setValidity({ valueMissing: true }, 'Please select an option');
    } else {
      this._internals.setValidity({});
    }
  }

  #updateAriaState() {
    this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
    this._internals.ariaRequired = this.required ? 'true' : 'false';
  }

  render() {
    return html`<slot @slotchange=${this.#updateOptions}></slot>`;
  }
}

/**
 * ```typescript
 * import '@blueprintui/components/include/toggle-group.js';
 * ```
 *
 * ```html
 * <bp-toggle-group name="view" value="list">
 *   <bp-toggle-group-option value="list" checked>List</bp-toggle-group-option>
 *   <bp-toggle-group-option value="grid">Grid</bp-toggle-group-option>
 * </bp-toggle-group>
 * ```
 *
 * @summary Toggle group option represents a single selectable option within a toggle group
 * @element bp-toggle-group-option
 * @since 2.11.0
 * @slot - default content slot
 * @slot label - custom label content with icons
 * @cssprop --background - background color
 * @cssprop --background-hover - background color on hover
 * @cssprop --background-checked - background color when checked
 * @cssprop --color - text color
 * @cssprop --color-checked - text color when checked
 * @cssprop --padding-block - vertical padding
 * @cssprop --padding-inline - horizontal padding
 * @cssprop --border-radius - border radius
 */
export class BpToggleGroupOption extends LitElement {
  static styles = [baseStyles, styles];

  static formAssociated = true;

  /** @private */
  _internals: ElementInternals;

  /** @private */
  @property({ type: Boolean }) accessor _expand: boolean;

  /** option value */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** selected state */
  @property({ type: Boolean }) accessor checked: boolean;

  /** disables this option */
  @property({ type: Boolean }) accessor disabled: boolean;

  /** prevents value changes */
  @property({ type: Boolean }) accessor readonly: boolean;

  /** form control name (set by parent group) */
  @property({ type: String }) accessor name: string;

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'radio';
    this.tabIndex = 0;
    this.setAttribute('bp-field', 'inline');

    this.addEventListener('click', this.#handleClick);
    this.addEventListener('keydown', this.#handleKeyDown);
    this.addEventListener('keyup', this.#handleKeyUp);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#handleClick);
    this.removeEventListener('keydown', this.#handleKeyDown);
    this.removeEventListener('keyup', this.#handleKeyUp);
  }

  updated() {
    this.#updateAriaState();
    this.#updateCSSState();
  }

  #handleClick = () => {
    if (!this.disabled && !this.readonly && !this.checked) {
      this.checked = true;
      this.#notifyChange();
    }
  };

  #handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
    }

    // Arrow key navigation
    const parent = this.parentElement as BpToggleGroup;
    if (parent && parent.tagName === 'BP-TOGGLE-GROUP') {
      const options = Array.from(parent.querySelectorAll('bp-toggle-group-option'));
      const currentIndex = options.indexOf(this);

      if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % options.length;
        (options[nextIndex] as BpToggleGroupOption).focus();
      } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + options.length) % options.length;
        (options[prevIndex] as BpToggleGroupOption).focus();
      }
    }
  };

  #handleKeyUp = (e: KeyboardEvent) => {
    if ((e.code === 'Space' || e.code === 'Enter') && !this.disabled && !this.readonly) {
      if (!this.checked) {
        this.checked = true;
        this.#notifyChange();
      }
    }
  };

  #notifyChange() {
    this.dispatchEvent(
      new CustomEvent('_toggle-option-change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      })
    );
  }

  #updateAriaState() {
    this._internals.ariaChecked = this.checked ? 'true' : 'false';
    this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
  }

  #updateCSSState() {
    if (this.checked) {
      this._internals.states.add('checked');
    } else {
      this._internals.states.delete('checked');
    }

    if (this.disabled) {
      this._internals.states.add('disabled');
    } else {
      this._internals.states.delete('disabled');
    }

    if (this.readonly) {
      this._internals.states.add('readonly');
    } else {
      this._internals.states.delete('readonly');
    }

    if (this._expand) {
      this._internals.states.add('expand');
    } else {
      this._internals.states.delete('expand');
    }
  }

  render() {
    return html`
      <div part="container">
        <slot name="label"></slot>
        <slot></slot>
      </div>
    `;
  }
}
