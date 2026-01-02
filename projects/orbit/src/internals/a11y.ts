export function attachInternals(element: HTMLElement & { _internals?: ElementInternals }) {
  try {
    element._internals = element.attachInternals();
  } catch {
    return;
  }
}
