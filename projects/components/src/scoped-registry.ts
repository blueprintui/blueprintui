import { setRegistry, getRegistry } from './internals/utils/define.js';

export { setRegistry, getRegistry } from './internals/utils/define.js';

/**
 * Creates a new scoped `CustomElementRegistry` and registers Blueprint UI
 * components into it by executing the provided loader functions.
 *
 * The returned registry can be passed to `attachShadow({ customElementRegistry })`
 * so that Blueprint UI elements are resolved within that shadow root without
 * polluting the global `customElements` registry.
 *
 * Falls back to the global registry when `CustomElementRegistry` is not
 * constructible (Firefox < 135 and older browsers).
 *
 * @example
 * ```ts
 * import { createBlueprintRegistry } from '@blueprintui/components/scoped-registry';
 *
 * const registry = await createBlueprintRegistry([
 *   () => import('@blueprintui/components/include/button.js'),
 *   () => import('@blueprintui/components/include/input.js'),
 * ]);
 *
 * const shadow = host.attachShadow({ mode: 'open', customElementRegistry: registry });
 * shadow.innerHTML = '<bp-button>Click me</bp-button>';
 * ```
 */
export async function createBlueprintRegistry(loaders: Array<() => Promise<unknown>>): Promise<CustomElementRegistry> {
  // Feature detection: fall back to global registry when constructor is unavailable
  let registry: CustomElementRegistry;
  try {
    registry = new CustomElementRegistry();
  } catch {
    await Promise.all(loaders.map(fn => fn()));
    return customElements;
  }

  const previous = getRegistry();
  setRegistry(registry);
  try {
    await Promise.all(loaders.map(fn => fn()));
  } finally {
    setRegistry(previous);
  }
  return registry;
}
