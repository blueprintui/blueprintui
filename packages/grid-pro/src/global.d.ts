declare module '*.css' {
  const value: CSSStyleSheet;
  export default value;
}

interface Document {
  adoptedStyleSheets: any;
}

interface ElementInternals {
  role: string;
}

interface ElementInternals {
  role: string;
  states: {
    add: (state: string) => void;
    delete: (state: string) => void;
    has: (state: string) => boolean;
  };
}
