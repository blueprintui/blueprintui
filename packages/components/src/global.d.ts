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

interface ElementInternals {
  role: string;
  validity: any;
  validationMessage: string;
  setValidity: (error: Partial<ValidityState>, message?: string) => any;
  checkValidity: () => any;
  reportValidity: () => boolean;
  states: {
    add: (state: string) => void;
    delete: (state: string) => void;
  };
}

interface CSSStyleSheet {
  replace: (styles: string) => void;
}

interface HTMLInputElement {
  showPicker: () => void;
}

interface ValidityStateFlags {
  valid?: boolean;
}
