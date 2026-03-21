import { GlobalStateService } from '../services/global.service.js';

export const version = '0.0.0';

export interface ElementMetadata {
  name: string;
  version: string;
}

declare global {
  interface CustomElementRegistry {
    initialize(root: ShadowRoot | Document): void;
  }

  var CustomElementRegistry: {
    new (): CustomElementRegistry;
    prototype: CustomElementRegistry;
  };
}

export const scopedRegistriesSupported = 'initialize' in CustomElementRegistry.prototype;

export const blueprintRegistry: CustomElementRegistry = scopedRegistriesSupported
  ? new CustomElementRegistry()
  : customElements;

function setShadowRootOptions(element: typeof HTMLElement) {
  if (!scopedRegistriesSupported) {
    return;
  }

  const existing: ShadowRootInit = (element as any).shadowRootOptions ?? { mode: 'open' };
  if (!(existing as any).customElementRegistry) {
    Object.defineProperty(element, 'shadowRootOptions', {
      value: { ...existing, customElementRegistry: blueprintRegistry },
      configurable: true
    });
  }
}

export function defineScopedElement(name: string, element: typeof HTMLElement & { __meta?: ElementMetadata }) {
  setShadowRootOptions(element);
  if (!blueprintRegistry.get(name)) {
    blueprintRegistry.define(name, element);
    const meta = { name, version: '0.0.0' };
    element.__meta = meta;
    GlobalStateService.dispatch('defineElement', { elementRegistry: [meta] });
  }
}

export function defineElement(name: string, element: typeof HTMLElement & { __meta?: ElementMetadata }) {
  defineScopedElement(name, element);
  if (!customElements.get(name)) {
    customElements.define(name, element);
  }
}
