import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { TypeFormControl, TypeFormControlController } from '../controllers/type-form-control.controller.js';

export interface FormControl extends TypeFormControl { } // eslint-disable-line @typescript-eslint/no-empty-interface

export class FormControl extends LitElement {
  @property({ type: String }) value: string | FormData = null;

  @property({ type: Boolean, reflect: true }) disabled: boolean;

  @property({ type: Boolean, reflect: true }) required: boolean;

  @property({ type: Boolean, reflect: true }) readonly: boolean;

  @property({ type: Boolean, reflect: true }) multiple: boolean;

  @property({ type: String, reflect: true }) autocomplete: string;

  @property({ type: String, reflect: true }) type: string;

  @property({ type: String }) pattern: string;

  @property({ type: String }) placeholder: string;

  @property({ type: Number }) minLength: number;

  @property({ type: Number }) maxLength: number;

  @property({ type: String }) min: string;

  @property({ type: String }) max: string;

  @property({ type: String }) size: string;

  get valueAsNumber() {
    return parseFloat(this.value as string);
  }

  set valueAsNumber(value: number) {
    this.value = `${value}`;
  }

  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};

  static formAssociated = true;

  protected typeFormControlController = new TypeFormControlController<FormControl>(this);

  protected onChange(e: any) {
    this.value = e.target.value;
    this.typeFormControlController.dispatchChange(e);
  }

  protected onInput(e: any) {
    this.value = e.target.value;
    this.typeFormControlController.dispatchInput(e);
  }
}