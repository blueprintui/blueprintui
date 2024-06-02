import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { TypeFormControl, TypeFormControlController } from '../controllers/type-form-control.controller.js';
import { BpTypeControl } from '@blueprintui/components/internals';

export interface FormControl extends TypeFormControl {} // eslint-disable-line @typescript-eslint/no-empty-object-type

export class FormControl extends LitElement implements Pick<BpTypeControl, keyof FormControl> {
  /** control value */
  @property({ type: String }) accessor value: string | number | FormData | File;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) accessor disabled: boolean;

  /** indicates that the user must specify a value for the input before the owning form can be submitted */
  @property({ type: Boolean }) accessor required: boolean;

  /** makes the element not mutable, meaning the user can not edit the control */
  @property({ type: Boolean }) accessor readonly: boolean;

  /** determines he form control accepts one or more values */
  @property({ type: Boolean }) accessor multiple: boolean;

  /** provide automated assistance in filling out form field values, and guidance to the browser as to the type of information expected in the field */
  @property({ type: String, reflect: true }) accessor autocomplete: string;

  /** string specifying the type of control to render */
  @property({ type: String, reflect: true }) accessor type: string;

  /** represents the name of the current <form> element as a string. */
  declare name: string;

  /** regular expression the form control's value should match */
  @property({ type: String }) accessor pattern: string;

  /** defines a short hint to help the user with data entry when a form control has no value */
  @property({ type: String }) accessor placeholder: string;

  /** defines minimum number of characters */
  @property({ type: Number }) accessor minLength: number;

  /** defines maximum number of characters */
  @property({ type: Number }) accessor maxLength: number;

  /** defines the most negative value in the range of permitted values */
  @property({ type: Number }) accessor min: number;

  /** defines the greatest value in the range of permitted values */
  @property({ type: Number }) accessor max: number;

  /** determines number of characters */
  @property({ type: Number }) accessor size: number = null;

  static formAssociated = true;

  protected typeFormControlController = new TypeFormControlController<FormControl>(this);

  get valueAsNumber() {
    return parseFloat(this.value as string);
  }

  set valueAsNumber(value: number) {
    this.value = `${value}`;
  }

  get composedLabel() {
    return Array.from(this._internals.labels)
      .reduce((prev, label) => `${prev} ${label.textContent}`, '')
      .trim();
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'presentation';
    this._internals.states.add('bp-layer');
  }

  focus() {
    super.focus();
    this.typeFormControlController.focus();
  }

  reset() {
    this.typeFormControlController.reset();
  }

  protected onChange(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
    this.typeFormControlController.onChange(e, config);
  }

  protected onInput(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
    this.typeFormControlController.onInput(e, config);
  }
}
