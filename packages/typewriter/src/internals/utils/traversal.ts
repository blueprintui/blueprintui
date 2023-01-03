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
