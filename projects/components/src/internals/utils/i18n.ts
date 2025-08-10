import { getFromObjectPath } from './string.js';

export function matchInterpolate(template: string, obj: any = {}) {
  return template.replace(/\$\{.+?\}/g, match => getFromObjectPath(match.substring(2, match.length - 1).trim(), obj));
}

export function getElementLanguageDirection(element: HTMLElement) {
  return getComputedStyle(element).getPropertyValue('direction').trim();
}
