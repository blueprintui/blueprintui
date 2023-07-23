import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { TypeFormControl, TypeFormControlController } from '../controllers/type-form-control.controller.js';

export interface FormControl extends TypeFormControl {} // eslint-disable-line @typescript-eslint/no-empty-interface

export class FormControl extends LitElement {
  /** control value */
  @property({ type: String }) value?: string | number | FormData | File;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean, reflect: true }) disabled: boolean;

  /** indicates that the user must specify a value for the input before the owning form can be submitted */
  @property({ type: Boolean, reflect: true }) required: boolean;

  /** makes the element not mutable, meaning the user can not edit the control */
  @property({ type: Boolean, reflect: true }) readonly?: boolean;

  /** determines he form control accepts one or more values */
  @property({ type: Boolean, reflect: true }) multiple: boolean;

  /** provide automated assistance in filling out form field values, and guidance to the browser as to the type of information expected in the field */
  @property({ type: String, reflect: true }) autocomplete: string;

  /** string specifying the type of control to render */
  @property({ type: String, reflect: true }) type: string;

  /** represents the name of the current <form> element as a string. */
  @property({ type: String, reflect: true }) name: string;

  /** regular expression the form control's value should match */
  @property({ type: String }) pattern: string;

  /** defines a short hint to help the user with data entry when a form control has no value */
  @property({ type: String }) placeholder: string;

  /** defines minimum number of characters */
  @property({ type: Number }) minLength: number;

  /** defines maximum number of characters */
  @property({ type: Number }) maxLength: number;

  /** defines the most negative value in the range of permitted values */
  @property({ type: Number }) min: number;

  /** defines the greatest value in the range of permitted values */
  @property({ type: Number }) max: number;

  /** determines number of characters */
  @property({ type: Number }) size: number = null;

  get valueAsNumber() {
    return parseFloat(this.value as string);
  }

  set valueAsNumber(value: number) {
    this.value = `${value}`;
  }

  static formAssociated = true;

  protected typeFormControlController = new TypeFormControlController<FormControl>(this);

  protected get composedLabel() {
    return Array.from(this._internals.labels)
      .reduce((prev, label) => `${prev} ${label.textContent}`, '')
      .trim();
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'presentation';
  }

  reset() {
    this.typeFormControlController.reset();
  }

  #setValue(e: any, config = { valueType: 'string' }) {
    this.value = config.valueType === 'number' ? e.target.valueAsNumber : e.target.value;
  }

  protected onChange(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
    this.#setValue(e, config);
    this.typeFormControlController.dispatchChange(e);
  }

  protected onInput(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
    this.#setValue(e, config);
    this.typeFormControlController.dispatchInput(e);
  }
}
