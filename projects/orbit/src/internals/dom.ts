import { getFlattenedDOMTree } from './traversal.js';

export function querySelectorByIdRef(element: HTMLElement, idRef: string) {
  return getFlattenedDOMTree(element.getRootNode()).find(
    e => e?.id !== '' && e.id === idRef && sameRenderRoot(e, element)
  );
}

function sameRenderRoot(elementOne: HTMLElement, elementTwo: HTMLElement) {
  const rootOne = elementOne.getRootNode();
  const rootTwo = elementTwo.getRootNode();
  const sameShadowRoot =
    rootOne instanceof ShadowRoot && rootTwo instanceof ShadowRoot && rootOne.host === rootTwo.host;
  const sameDocument = rootOne instanceof Document && rootTwo instanceof Document && rootOne === rootTwo;
  return sameShadowRoot || sameDocument;
}
