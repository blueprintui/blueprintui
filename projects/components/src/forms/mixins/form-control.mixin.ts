import { getFlattenedFocusableItems, toggleState } from '@blueprintui/components/internals';
import { isObjectLiteral } from '../utils/utils.js';
import {
  badInput,
  patternMismatch,
  rangeOverflow,
  rangeUnderflow,
  stepMismatch,
  tooLong,
  tooShort,
  typeMismatch,
  valueMissing
} from '../utils/validity.js';

export interface FormControlInstance extends HTMLElement {
  _internals: ElementInternals;
  formAssociated: true;
  form: HTMLFormElement;
  name: string;
  type: string;
  defaultValue: string;
  validity: ValidityState;
  validationMessage: string;
  willValidate: boolean;
  valueAsNumber: number;
  composedLabel: string;
  checked?: boolean;
  readOnly: boolean;
  required: boolean;
  noValidate: boolean;
  disabled: boolean;
  value?: FormControlValue;
  min: number | string | null;
  max: number | string | null;
  pattern?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  step?: number;
  multiple?: boolean;
  autocomplete?: string;
  size?: number;
  formNoValidate?: boolean;
  formAction?: string;
  formMethod?: string;
  formTarget?: string;
  dirName?: string;
  list?: HTMLDataListElement | null;
  selectionStart?: number | null;
  selectionEnd?: number | null;
  selectionDirection?: 'forward' | 'backward' | 'none';
  reset(): void;
  focus(): void;
  select(): void;
  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none'): void;
  setRangeText(
    replacement: string,
    start?: number,
    end?: number,
    selectMode?: 'select' | 'start' | 'end' | 'preserve'
  ): void;
  updateValue(value: FormControlValue): void;
  checkValidity(): boolean;
  reportValidity(): boolean;
  setValidity(validity: Partial<ValidityState>, message?: string): void;
  setCustomValidity(message: string): void;
  setFormValue(value: string | File | FormData | null): void;
  _onChange(e: InputEvent, config?: { valueType: 'string' | 'number' }): void;
  _onInput(e: InputEvent, config?: { valueType: 'string' | 'number' }): void;
}

export interface FormControlMixin {
  new (...args: any[]): FormControlInstance;
  formAssociated: boolean;
  readonly observedAttributes: string[];
}

export type FormControlValue = string | number | File | File[] | FormData | null | Record<string, unknown>;

type Constructor = (new (...args: any[]) => HTMLElement & {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  attributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void;
  requestUpdate?(name?: string, oldValue?: unknown): void;
}) & {
  observedAttributes?: string[];
};

export function FormControlMixin<TBase extends Constructor, T extends FormControlValue>(
  SuperClass: TBase
): TBase & FormControlMixin {
  return class Base extends SuperClass {
    static formAssociated = true;

    _internals: ElementInternals;

    #value: T = '' as T;

    #customValidityMessage = '';

    #selectionStart: number | null = null;
    #selectionEnd: number | null = null;
    #selectionDirection: 'forward' | 'backward' | 'none' = 'none';

    get defaultValue(): string {
      return this.getAttribute('value') ?? '';
    }

    set defaultValue(value: string) {
      this.setAttribute('value', value);
    }

    get name(): string {
      return this.getAttribute('name') ?? '';
    }

    set name(value: string) {
      this.setAttribute('name', value);
      this.#requestUpdate();
    }

    get value(): T {
      return this.#value;
    }

    set value(value: T) {
      this.updateValue(value);
      this.#requestUpdate();
    }

    get form(): HTMLFormElement | null {
      return this._internals.form;
    }

    get willValidate(): boolean {
      return this._internals.willValidate;
    }

    get validity(): ValidityState {
      return this._internals.validity;
    }

    get validationMessage(): string {
      return this._internals.validationMessage;
    }

    get noValidate(): boolean {
      const hasAttr = this.hasAttribute('novalidate');
      const hasFormNoValidate = this._internals.form?.noValidate;
      return !!(hasAttr || hasFormNoValidate);
    }

    set noValidate(value: boolean) {
      this.toggleAttribute('novalidate', value);
    }

    get valueAsString(): string {
      return this.#value?.toString() ?? '';
    }

    get valueAsNumber(): number {
      return Number(this.#value);
    }

    set valueAsNumber(value: number) {
      if (typeof value === 'number') {
        this.updateValue(`${value}` as T);
      } else {
        throw new Error('value must be of type number');
      }
    }

    get valueAsDate(): Date {
      return new Date(this.#value as string);
    }

    get type(): string {
      return this.getAttribute('type') ?? 'text';
    }

    set type(value: string) {
      this.setAttribute('type', value);
      this.#requestUpdate();
    }

    get required(): boolean {
      return this.hasAttribute('required');
    }

    set required(value: boolean) {
      this.toggleAttribute('required', value);
      toggleState(this._internals, 'required', value);
      this.#requestUpdate();
    }

    get disabled(): boolean | null {
      return this.hasAttribute('disabled');
    }

    set disabled(value: boolean) {
      this.toggleAttribute('disabled', value);
      this._internals.ariaDisabled = value ? 'true' : 'false';
      toggleState(this._internals, 'disabled', value);
      this.#requestUpdate();
    }

    get readOnly(): boolean {
      return this.hasAttribute('readonly');
    }

    set readOnly(value: boolean) {
      this.toggleAttribute('readonly', value);
      toggleState(this._internals, 'readonly', value);
      this.#requestUpdate();
    }

    get min(): number | string | null {
      return this.getAttribute('min') ? Number(this.getAttribute('min')) : null;
    }

    set min(value: number | string) {
      this.setAttribute('min', value.toString());
      toggleState(this._internals, 'min', value !== null);
      this._internals.ariaValueMin = value !== undefined ? value.toString() : null;
      this.#requestUpdate();
    }

    get max(): number | string | null {
      return this.getAttribute('max') ? Number(this.getAttribute('max')) : null;
    }

    set max(value: number | string) {
      this.setAttribute('max', value.toString());
      toggleState(this._internals, 'max', value !== null);
      this._internals.ariaValueMax = value !== undefined ? value.toString() : null;
      this.#requestUpdate();
    }

    get pattern(): string {
      return this.getAttribute('pattern') ?? '';
    }

    set pattern(value: string) {
      this.setAttribute('pattern', value);
      toggleState(this._internals, 'pattern', !!value);
      this.#requestUpdate();
    }

    get placeholder(): string {
      return this.getAttribute('placeholder') ?? '';
    }

    set placeholder(value: string) {
      this.setAttribute('placeholder', value);
      toggleState(this._internals, 'placeholder', !!value);
      this.#requestUpdate();
    }

    get minLength(): number {
      return this.hasAttribute('minlength') ? Number(this.getAttribute('minlength')) : -1;
    }

    set minLength(value: number) {
      if (value === -1) {
        this.removeAttribute('minlength');
      } else {
        this.setAttribute('minlength', value.toString());
      }
      toggleState(this._internals, 'minlength', value !== -1);
      this.#requestUpdate();
    }

    get maxLength(): number {
      return this.hasAttribute('maxlength') ? Number(this.getAttribute('maxlength')) : -1;
    }

    set maxLength(value: number) {
      if (value === -1) {
        this.removeAttribute('maxlength');
      } else {
        this.setAttribute('maxlength', value.toString());
      }
      toggleState(this._internals, 'maxlength', value !== -1);
      this.#requestUpdate();
    }

    get step(): number | null {
      return this.getAttribute('step') ? Number(this.getAttribute('step')) : null;
    }

    set step(value: number) {
      this.setAttribute('step', value.toString());
      toggleState(this._internals, 'step', value !== null);
      this.#requestUpdate();
    }

    get multiple(): boolean {
      return this.hasAttribute('multiple');
    }

    set multiple(value: boolean) {
      this.toggleAttribute('multiple', value);
      toggleState(this._internals, 'multiple', value);
      this.#requestUpdate();
    }

    get autocomplete(): string {
      return this.getAttribute('autocomplete') ?? '';
    }

    set autocomplete(value: string) {
      this.setAttribute('autocomplete', value);
      toggleState(this._internals, 'autocomplete', value === 'on');
      this.#requestUpdate();
    }

    get size(): number {
      return this.hasAttribute('size') ? Number(this.getAttribute('size')) : 20;
    }

    set size(value: number) {
      if (value !== null && value > 0) {
        this.setAttribute('size', value.toString());
        toggleState(this._internals, 'size', true);
      } else {
        this.removeAttribute('size');
        toggleState(this._internals, 'size', false);
      }
      this.#requestUpdate();
    }

    get formNoValidate(): boolean {
      return this.hasAttribute('formnovalidate');
    }

    set formNoValidate(value: boolean) {
      this.toggleAttribute('formnovalidate', value);
      toggleState(this._internals, 'formnovalidate', value);
      this.#requestUpdate();
    }

    get formAction(): string {
      const attr = this.getAttribute('formaction');
      if (attr) {
        return new URL(attr, window.location.href).href;
      }
      return '';
    }

    set formAction(value: string) {
      this.setAttribute('formaction', value);
      this.#requestUpdate();
    }

    get formMethod(): string {
      return this.getAttribute('formmethod') ?? '';
    }

    set formMethod(value: string) {
      this.setAttribute('formmethod', value);
      this.#requestUpdate();
    }

    get formTarget(): string {
      return this.getAttribute('formtarget') ?? '';
    }

    set formTarget(value: string) {
      this.setAttribute('formtarget', value);
      this.#requestUpdate();
    }

    get dirName(): string {
      return this.getAttribute('dirname') ?? '';
    }

    set dirName(value: string) {
      this.setAttribute('dirname', value);
      this.#requestUpdate();
    }

    get list(): HTMLDataListElement | null {
      const listId = this.getAttribute('list');
      if (listId) {
        return this.ownerDocument.getElementById(listId) as HTMLDataListElement | null;
      }
      return null;
    }

    get selectionStart(): number | null {
      return this.#selectionStart ?? (this.#value as string)?.length ?? 0;
    }

    set selectionStart(value: number | null) {
      const max = (this.#value as string)?.length ?? 0;
      this.#selectionStart = value !== null ? Math.min(Math.max(0, value), max) : null;
    }

    get selectionEnd(): number | null {
      return this.#selectionEnd ?? (this.#value as string)?.length ?? 0;
    }

    set selectionEnd(value: number | null) {
      const max = (this.#value as string)?.length ?? 0;
      this.#selectionEnd = value !== null ? Math.min(Math.max(0, value), max) : null;
    }

    get selectionDirection(): 'forward' | 'backward' | 'none' {
      return this.#selectionDirection;
    }

    set selectionDirection(value: 'forward' | 'backward' | 'none') {
      this.#selectionDirection = value;
    }

    get labels(): NodeList {
      return this._internals.labels;
    }

    get composedLabel() {
      return Array.from(this._internals.labels)
        .reduce((prev, label) => `${prev} ${label.textContent}`, '')
        .trim();
    }

    static get observedAttributes() {
      return super.observedAttributes.concat([
        'name',
        'value',
        'type',
        'disabled',
        'readonly',
        'novalidate',
        'required',
        'pattern',
        'placeholder',
        'minlength',
        'maxlength',
        'min',
        'max',
        'step',
        'multiple',
        'autocomplete',
        'size',
        'formnovalidate',
        'formaction',
        'formenctype',
        'formmethod',
        'formtarget',
        'dirname',
        'list'
      ]);
    }

    constructor(...args: any[]) {
      super(...args);
      this._internals = this.attachInternals();
    }

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      if (!this._internals.role) {
        this._internals.role = 'presentation';
      }

      this._internals.states.add('bp-layer');

      this.tabIndex = 0;
      this.#updateFormState();
      this.#updateValidityState();
      // input events are composed, change events are not (https://github.com/whatwg/html/issues/5453)
      this.shadowRoot?.addEventListener('input', e => e.stopPropagation());
      this.shadowRoot?.addEventListener('change', e => e.stopPropagation());
      this.form?.addEventListener('reset', () => this.reset());

      this.addEventListener('focus', () => {
        this._internals.states.add('focused');
        this.#updateValidityState();
      });

      this.addEventListener('blur', () => {
        this._internals.states.add('touched');
        this._internals.states.delete('focused');
        this.#updateValidityState();
      });

      this.addEventListener('input', () => {
        this._internals.states.add('dirty');
        this.#updateValidityState();
      });

      this.addEventListener('invalid', () => {
        this._internals.states.add('user-invalid');
      });
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      if (super.attributeChangedCallback) {
        super.attributeChangedCallback(name, oldValue, newValue);
      }

      if (name === 'value' && newValue !== oldValue) {
        this.updateValue(newValue as T);
      }

      if (name === 'disabled' && newValue !== oldValue) {
        this.disabled = newValue !== null;
      }

      if (name === 'readonly' && newValue !== oldValue) {
        this.readOnly = newValue !== null;
      }

      if (name === 'novalidate' && newValue !== oldValue) {
        this.noValidate = newValue !== null;
      }

      if (name === 'required' && newValue !== oldValue) {
        this.required = newValue !== null;
      }

      if (name === 'multiple' && newValue !== oldValue) {
        this.multiple = newValue !== null;
      }

      if (name === 'size' && newValue !== oldValue) {
        toggleState(this._internals, 'size', newValue !== null);
      }
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    formDisabledCallback(disabled: boolean) {
      this.disabled = disabled;
    }

    formStateRestoreCallback(state: T, _reason: string) {
      this.value = state;
      this.checkValidity();
    }

    // https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/
    formAssociatedCallback(_form: HTMLFormElement) {}

    formResetCallback() {
      this.value = this.defaultValue as T;
      this.checkValidity();
    }

    checkValidity(): boolean {
      if (this.noValidate) {
        this._internals.setValidity({});
        return true;
      } else {
        this.#updateValidityState();
        return this._internals.checkValidity();
      }
    }

    setValidity(validity: Partial<ValidityState>, message?: string) {
      this._internals.setValidity(validity, message);
    }

    /**
     * Sets a custom validity message for the element.
     * If the message is non-empty, the element is considered invalid with customError.
     * If the message is empty, the custom error is cleared.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity
     */
    setCustomValidity(message: string) {
      this.#customValidityMessage = message;
      this.#updateValidityState();
    }

    reportValidity(): boolean {
      this.#updateValidityState();
      return this._internals.reportValidity();
    }

    updateValue(value: T) {
      this.#value = value;
      this._internals.ariaValueNow = value !== undefined ? `${value}` : null;
      this.#updateValidityState();
      this.#updateFormState();
    }

    focus() {
      super.focus();
      if (this._internals.role === 'presentation') {
        getFlattenedFocusableItems(this)[0]?.focus();
      }
    }

    select() {
      this.#selectionStart = 0;
      this.#selectionEnd = (this.#value as string)?.length ?? 0;
      this.#selectionDirection = 'none';
    }

    setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none') {
      const max = (this.#value as string)?.length ?? 0;
      this.#selectionStart = Math.min(Math.max(0, start), max);
      this.#selectionEnd = Math.min(Math.max(0, end), max);
      this.#selectionDirection = direction ?? 'none';
    }

    setRangeText(
      replacement: string,
      start?: number,
      end?: number,
      selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve'
    ) {
      const value = (this.#value as string) ?? '';
      const selStart = start ?? this.#selectionStart ?? 0;
      const selEnd = end ?? this.#selectionEnd ?? value.length;

      const before = value.substring(0, selStart);
      const after = value.substring(selEnd);
      const newValue = before + replacement + after;

      this.updateValue(newValue as T);

      switch (selectMode) {
        case 'select':
          this.#selectionStart = selStart;
          this.#selectionEnd = selStart + replacement.length;
          break;
        case 'start':
          this.#selectionStart = selStart;
          this.#selectionEnd = selStart;
          break;
        case 'end':
          this.#selectionStart = selStart + replacement.length;
          this.#selectionEnd = selStart + replacement.length;
          break;
        case 'preserve':
        default:
          // Adjust selection based on the replacement
          const delta = replacement.length - (selEnd - selStart);
          if (this.#selectionEnd !== null) {
            this.#selectionEnd = Math.max(selStart, this.#selectionEnd + delta);
          }
          break;
      }
    }

    reset() {
      this.value = this.defaultValue as T;
      this.#resetValidity();
      this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      this.dispatchEvent(new Event('reset', { bubbles: true, cancelable: true }));
    }

    /**
     * @protected
     */
    _onChange(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
      this.#setValue(e, config);
      e?.preventDefault();
      e?.stopPropagation();

      if (!this.disabled) {
        this.#updateValidityState();
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      }
    }

    /**
     * @protected
     */
    _onInput(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
      this.#setValue(e, config);
      e?.preventDefault();
      e?.stopPropagation();

      if (!this.disabled) {
        this.#updateValidityState();
        this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, data: e.data }));
      }
    }

    #setValue(e: any, config = { valueType: 'string' }) {
      this.value = config.valueType === 'number' ? e.target.valueAsNumber : (e.target.value as T);
    }

    #requestUpdate() {
      // base reactive components (Lit Reactive Element)
      if (this.requestUpdate) {
        this.requestUpdate();
      }
    }

    #updateFormState() {
      if (this.name) {
        if (typeof this.value === 'number') {
          this._internals.setFormValue(`${this.value}`);
        } else if (isObjectLiteral(this.value)) {
          const formData = new FormData();
          Object.entries(this.value)
            .filter(([key]) => key !== 'value')
            .forEach(([key, value]) => formData.set(`${this.name}-${key}`, `${value}`));
          this._internals.setFormValue(formData);
        } else {
          this._internals.setFormValue(this.value as string | File | FormData | null);
        }
      }
    }

    #resetValidity() {
      this._internals.states.delete('dirty');
      this._internals.states.delete('focused');
      this._internals.states.delete('touched');
      this._internals.states.delete('valid');
      this._internals.states.delete('invalid');
      this._internals.states.delete('user-invalid');
    }

    #updateValidityState() {
      if (!this.noValidate) {
        const element = this as unknown as HTMLInputElement;

        if (this.#customValidityMessage) {
          this._internals.setValidity({ customError: true, valid: false }, this.#customValidityMessage);
        } else if (valueMissing(this)) {
          this._internals.setValidity({ valueMissing: true, valid: false }, 'value required');
        } else if (typeMismatch(element)) {
          this._internals.setValidity({ typeMismatch: true, valid: false }, 'type mismatch');
        } else if (patternMismatch(element)) {
          this._internals.setValidity({ patternMismatch: true, valid: false }, 'pattern mismatch');
        } else if (tooShort(element)) {
          this._internals.setValidity({ tooShort: true, valid: false }, 'value too short');
        } else if (tooLong(element)) {
          this._internals.setValidity({ tooLong: true, valid: false }, 'value too long');
        } else if (rangeUnderflow(element)) {
          this._internals.setValidity({ rangeUnderflow: true, valid: false }, 'value too low');
        } else if (rangeOverflow(element)) {
          this._internals.setValidity({ rangeOverflow: true, valid: false }, 'value too high');
        } else if (stepMismatch(element)) {
          this._internals.setValidity({ stepMismatch: true, valid: false }, 'step mismatch');
        } else if (badInput(element)) {
          this._internals.setValidity({ badInput: true, valid: false }, 'bad input');
        } else {
          this._internals.setValidity({ valid: true });
        }

        if (this.validity.valid) {
          this._internals.states.delete('user-invalid');
          this._internals.states.delete('invalid');
          this._internals.states.add('valid');
        } else {
          this._internals.states.delete('valid');
          this._internals.states.add('invalid');

          if (this._internals.states.has('touched')) {
            this._internals.states.add('user-invalid');
            this.dispatchEvent(new CustomEvent('user-invalid', { bubbles: true, composed: true }));
          }
        }

        this.requestUpdate();
      }
    }
  } as any;
}
