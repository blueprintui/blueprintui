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
