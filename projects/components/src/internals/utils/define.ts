import { GlobalStateService } from '../services/global.service.js';

export const version = '0.0.0';

export interface ElementMetadata {
  name: string;
  version: string;
}

let activeRegistry: CustomElementRegistry | undefined;

export function setRegistry(registry: CustomElementRegistry | undefined) {
  activeRegistry = registry;
}

export function getRegistry(): CustomElementRegistry {
  return activeRegistry ?? customElements;
}

export function defineElement(name: string, element: typeof HTMLElement & { __meta?: ElementMetadata }) {
  const registry = getRegistry();
  if (!registry.get(name)) {
    registry.define(name, element);

    // When using a scoped registry, wire it into LitElement's shadowRootOptions
    // so that child custom elements rendered inside shadow roots are resolved correctly
    if (registry !== customElements && 'shadowRootOptions' in element) {
      (element as any).shadowRootOptions = { ...(element as any).shadowRootOptions, customElementRegistry: registry };
    }

    const meta = { name, version: '0.0.0' };
    element.__meta = meta;
    GlobalStateService.dispatch('defineElement', { elementRegistry: [meta] });
  }
}
