import { getFlattenedDOMTree } from './traversal.js';

export function attachRootNodeStyles(host: HTMLElement | Element | ParentNode, styles: CSSStyleSheet[]) {
  const rootNode: any = host.getRootNode();
  const root = rootNode?.host?.shadowRoot ? rootNode.host.shadowRoot : rootNode;
  root.adoptedStyleSheets = [...Array.from(root.adoptedStyleSheets), ...styles];
}

export function toggleState(internals: ElementInternals, state: string, value: boolean) {
  if (value) {
    internals.states.add(state);
  } else {
    internals.states.delete(state);
  }
}

/** Get host render root for a given element. This may be the document or the nearest shadow root. */
export function getRenderRoot(element: HTMLElement) {
  const root = element.parentNode as HTMLElement;
  return root.shadowRoot ? root.shadowRoot : document.body;
}

export function querySelectorByIdRef(element: HTMLElement, idRef: string) {
  return getFlattenedDOMTree(getRenderRoot(element)).find(e => e?.id !== '' && e.id === idRef);
}

export function getOffesetDifference(min: number, end: number) {
  return Math.sign(end - min) * Math.abs(min - end);
}

export function assignedElements<T extends HTMLElement>(
  element: HTMLElement,
  config: { name?: string; flatten?: boolean } = { flatten: false }
) {
  const items = element.shadowRoot
    .querySelector<HTMLSlotElement>(config.name ? `slot[name="${config.name}"]` : 'slot')
    ?.assignedElements({ flatten: config.flatten });
  return items ? (Array.from(items) as T[]) : [];
}
