import { focusable } from './focus.js';

export function getFlattenedFocusableItems(element: Node, depth = 10) {
  return getFlattenedDOMTree(element, depth).filter((e: HTMLElement) => focusable(e)) as HTMLElement[];
}

export function getFlattenedDOMTree(node: Node, depth = 10): HTMLElement[] {
  return Array.from(getChildren(node))
    .reduce((prev: any[], next: any) => {
      return [...prev, [next, [...Array.from(getChildren(next)).map((i: any) => [i, getFlattenedDOMTree(i, depth)])]]];
    }, [])
    .flat(depth);
}

export function getChildren(node: any) {
  if (node.documentElement) {
    return node.documentElement.children;
  } else if (node.shadowRoot) {
    return node.shadowRoot.children;
  } else if (node.assignedElements) {
    const slotted = node.assignedElements(); // slotted elements
    return slotted.length ? slotted : node.children; // else slot fallback
  } else {
    return node.children;
  }
}

export function isObject(val: any) {
  return val?.constructor === Object;
}

export function mergeObjects(...objs: object[]): object {
  const clone: any = {};
  objs
    .map(o => (isObject(o) ? { ...o } : {}))
    .forEach((obj: any) => {
      Object.keys(obj).forEach(prop => {
        const propVal = obj[prop];

        if (Array.isArray(propVal)) {
          clone[prop] = Array.from(propVal);
        } else if (isObject(propVal)) {
          clone[prop] = mergeObjects(clone[prop] || {}, propVal);
        } else {
          clone[prop] = propVal;
        }
      });
    });

  return clone;
}

/**
 * Given a list of cells, duplicate the cell 1 * n of the ariaColSpan
 *
 * 1, 2, 3 (span 2), 4, 5, 6
 * 1, 2, 3, 3, 4, 5, 6
 */
export function insertSpanningCells(cells: HTMLElement[]) {
  const updated = [...cells];
  [...cells].forEach(cell => {
    if (cell.ariaColSpan) {
      const index = cells.indexOf(cell);
      for (let i = 1; i < parseInt(cell.ariaColSpan); i++) {
        updated.splice(index + i, 0, cell);
      }
    }
  });
  return updated;
}
