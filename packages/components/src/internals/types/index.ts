import { LitElement, TemplateResult } from 'lit';

export type Permutations<T extends string, U extends string = T> = T extends any
  ? T | `${T} ${Permutations<Exclude<U, T>>}`
  : never;

export type ConstructorTypeOf<T> = new (...args: any[]) => T;

export interface BpTypeElement extends Partial<LitElement> {
  base?: null;

  active?: boolean;

  checked?: boolean;

  closable?: boolean;

  disabled?: boolean;

  expanded?: boolean;

  pressed?: boolean;

  readonly?: boolean;

  selected?: boolean;

  indeterminate?: boolean;

  value?: string | number | FormData | File;

  type?: string;

  name?: string;

  selectable?: 'multi' | 'single';

  expandable?: boolean;

  interaction?: 'auto';

  size?: 'sm' | 'md' | 'lg';

  layer?: 'container' | 'flat' | 'inline';

  action?: 'primary' | 'secondary' | 'flat' | 'inline';

  dir?: 'ltr' | 'rtl' | 'auto' | string;

  orientation?: 'horizontal' | 'vertical';

  layout?: 'horizontal' | 'vertical';

  sort?: 'ascending' | 'descending' | 'none';

  direction?: 'up' | 'down' | 'left' | 'right';

  status?: 'accent' | 'success' | 'warning' | 'danger';

  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';

  i18n?: any;

  _internals?: ElementInternals;

  render(): TemplateResult;

  updated?: any;

  firstUpdated?: any;
}

export interface BpTypeControl extends Omit<BpTypeElement, 'size'> {
  value?: string | number | FormData | File;

  valueAsNumber?: number;

  valueAsDate?: Date;

  size?: number;

  minLength?: number;

  maxLength?: number;

  min?: number;

  max?: number;

  step?: number;

  required?: boolean;

  multiple?: boolean;

  autocomplete?: string;

  pattern?: string;

  placeholder?: string;

  reset?: any;

  formAssociated: boolean;

  form: HTMLFormElement;

  formAction: string;

  formEnctype: string;

  formMethod: string;

  formNoValidate: boolean;

  formTarget: string;

  labels: NodeListOf<HTMLLabelElement>;

  validationMessage: string;

  validity: ValidityState;

  willValidate: boolean;

  checkValidity: any;

  reportValidity: any;

  setCustomValidity: any;

  composedLabel: string;

  _internals?: ElementInternals;
}

export interface BpTypeButton extends BpTypeControl {
  popoverTargetElement?: HTMLElement;

  popovertarget?: string;

  popoverTargetAction?: 'toggle' | 'show' | 'hide';

  commandFor?: string;

  command?: string;
}

export interface BpTypePopover extends BpTypeElement {
  position: string;

  trigger: HTMLElement | string;

  anchor: HTMLElement | string;

  open: boolean;

  modal?: boolean;

  static?: boolean;
}

export declare type Alignment = 'start' | 'end';

export declare type Side = 'top' | 'right' | 'bottom' | 'left';

export declare type AlignedPosition = `${Side}-${Alignment}`;

export declare type Position = Side | AlignedPosition | 'center';
