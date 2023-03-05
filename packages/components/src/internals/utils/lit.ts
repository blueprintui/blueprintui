import { LitElement } from 'lit';

export function childrenUpdateComplete(elements: LitElement[] | NodeListOf<LitElement>) {
  return Promise.all(Array.from(elements).map(e => e.updateComplete));
}

export function syncProps(
  target: { [prop: string]: any },
  source: { [prop: string]: any },
  conditions: { [prop: string]: boolean }
) {
  Object.keys(conditions)
    .filter(c => conditions[c])
    .forEach(c => (target[c] = source[c]));
}

export function syncUpdatedProps(source: { [prop: string]: any }, values: { [prop: string]: any }) {
  Object.keys(values)
    .filter(k => values[k] !== undefined)
    .filter(k => values[k] !== source[k])
    .forEach((key: any) => {
      source[key] = values[key];
    });
}
