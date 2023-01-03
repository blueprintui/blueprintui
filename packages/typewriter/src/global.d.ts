declare module '*.css' {
  const value: CSSStyleSheet;
  export default value;
}

interface ElementInternals {
  role: string;
}