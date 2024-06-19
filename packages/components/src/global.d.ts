declare module '*.css' {
  const value: CSSStyleSheet;
  export default value;
}

interface Document {
  adoptedStyleSheets: any;
}

interface HTMLDialog extends HTMLElement {
  showModal?: () => void;
  show?: () => void;
  close?: () => void;
}

interface ValidityState {
  readonly badInput: boolean;
  readonly customError: boolean;
  readonly patternMismatch: boolean;
  readonly rangeOverflow: boolean;
  readonly rangeUnderflow: boolean;
  readonly stepMismatch: boolean;
  readonly tooLong: boolean;
  readonly tooShort: boolean;
  readonly typeMismatch: boolean;
  readonly valid: boolean;
  readonly valueMissing: boolean;
}

interface ValidityStateFlags {
  badInput?: boolean;
  customError?: boolean;
  patternMismatch?: boolean;
  rangeOverflow?: boolean;
  rangeUnderflow?: boolean;
  stepMismatch?: boolean;
  tooLong?: boolean;
  tooShort?: boolean;
  typeMismatch?: boolean;
  valueMissing?: boolean;
}

interface ElementInternals {
  // role: string;
  ariaRelevant: string;
  // setValidity: (flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement) => void;
  // checkValidity: () => boolean;
  // reportValidity: () => boolean;
  // states: {
  //   has: (state: string) => boolean;
  //   add: (state: string) => void;
  //   delete: (state: string) => void;
  // };
}

interface HTMLInputElement {
  showPicker: () => void;
}

interface ValidityStateFlags {
  valid?: boolean;
}
