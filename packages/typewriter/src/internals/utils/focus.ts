export function getActiveElement(root: Document | ShadowRoot = document): Element | null {
  if (root.activeElement && root.activeElement.shadowRoot) {
    return getActiveElement(root.activeElement.shadowRoot) ?? root.activeElement;
  } else {
    return root.activeElement;
  }
}

export function focusElement(element: HTMLElement) {
  if (element && !focusable(element)) {
    element.setAttribute('tabindex', '-1');
    element.focus();
    element.addEventListener('blur', () => element.removeAttribute('tabindex'), { once: true });
  } else {
    element?.focus();
  }
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
      '*[tabindex]',
      '*[contenteditable=true]',
      '[role=button]:not([disabled])'
    ].join(',')
  );
}

/** focus primitives, any interactive element does not requiring advanced keyboard interactions like arrow/navigation */
export function simpleFocusable(element: Element) {
  return (
    element.matches(':not(:--complex-focus)') &&
    element.matches(
      [
        'a[href]',
        'button:not([disabled])',
        'input[type=checkbox]',
        'input[type=radio]',
        'object',
        'embed',
        '*[tabindex]',
        '[role=button]:not([disabled])'
      ].join(',')
    )
  );
}

export function setActiveKeyListItem(items: NodeListOf<HTMLElement> | HTMLElement[], item: HTMLElement) {
  items.forEach(i => (i.tabIndex = -1));
  item.tabIndex = 0;
}

export function initializeKeyListItems(items: NodeListOf<HTMLElement> | HTMLElement[]) {
  if (items.length) {
    items.forEach(i => (i.tabIndex = -1));
    items[0].tabIndex = 0;
  }
}
