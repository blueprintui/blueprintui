import { getFlattenedDOMTree } from './traversal.js';

export function createFocusTrap(element: HTMLElement) {
  element.addEventListener('keydown', e => {
    if (e.code === 'Tab' && !element.hidden) {
      const focusableItems = getFlattenedFocusableItems(element);
      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];

      if (e.shiftKey && (document.activeElement === first || document.activeElement === element)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

export function getFlattenedFocusableItems(element: Node, depth = 10) {
  return getFlattenedDOMTree(element, depth).filter((e: HTMLElement) => focusable(e)) as HTMLElement[];
}

export function focusable(element: Element) {
  return element.matches(
    [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'button:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'iframe',
      'object',
      'embed',
      '*[tabindex]', // -1 tabindex is a focusable element and needed for keyboard navigation
      '*[contenteditable=true]',
      '[role=button]:not([disabled])'
    ].join(',')
  );
}
