import { getFlattenedDOMTree } from './traversal.js';

export function attachRootNodeStyles(host: HTMLElement | Element | ParentNode, styles: CSSStyleSheet[]) {
  const root = host.getRootNode() as ShadowRoot | Document;
  const hasStyles = (root.adoptedStyleSheets as CSSStyleSheet[]).some(styleSheet =>
    styles.some(s => styleSheetToString(s) === styleSheetToString(styleSheet))
  );

  if (!hasStyles) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...styles];
  }
}

function styleSheetToString(styleSheet: CSSStyleSheet) {
  return Array.from(styleSheet.cssRules)
    .map(rule => rule.cssText)
    .join('');
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
  return getFlattenedDOMTree(element.getRootNode()).find(e => e?.id !== '' && e.id === idRef);
}

export function queryCommandTriggerRef(element: HTMLElement) {
  return element.id
    ? getFlattenedDOMTree(element.getRootNode()).find(e => e.getAttribute('commandfor') === element.id)
    : null;
}

export function sameRenderRoot(elementOne: HTMLElement, elementTwo: HTMLElement) {
  const rootOne = elementOne.getRootNode();
  const rootTwo = elementTwo.getRootNode();
  const sameShadowRoot =
    rootOne instanceof ShadowRoot && rootTwo instanceof ShadowRoot && rootOne.host === rootTwo.host;
  const sameDocument = rootOne instanceof Document && rootTwo instanceof Document && rootOne === rootTwo;
  return sameShadowRoot || sameDocument;
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
