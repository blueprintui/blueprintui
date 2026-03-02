import { focusable } from './focus.js';

export function getFlatFocusableItems(element: Node, depth = 10) {
  return getFlatDOMTree(element, depth).filter((e: HTMLElement) => focusable(e)) as HTMLElement[];
}

export function getFlatDOMTree(node: Node, depth = 10): HTMLElement[] {
  return (Array.from(getChildren(node)) as HTMLElement[])
    .reduce(
      (prev: (HTMLElement | HTMLElement[])[], next: HTMLElement) => {
        return [
          ...prev,
          next,
          ...(Array.from(getChildren(next)) as HTMLElement[]).flatMap(i => [i, ...getFlatDOMTree(i, depth)])
        ];
      },
      [] as (HTMLElement | HTMLElement[])[]
    )
    .flat(depth) as HTMLElement[];
}

export function getChildren(node: Node): HTMLCollection | HTMLElement[] {
  if ((node as Document).documentElement) {
    return (node as Document).documentElement.children;
  } else if ((node as HTMLElement).shadowRoot) {
    return (node as HTMLElement).shadowRoot!.children;
  } else if (node instanceof HTMLSlotElement) {
    const slotted = node.assignedElements() as HTMLElement[];
    return slotted.length ? slotted : (node as HTMLElement).children;
  } else {
    return (node as HTMLElement).children;
  }
}
