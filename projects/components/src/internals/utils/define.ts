import { GlobalStateService } from '../services/global.service.js';

export const version = '0.0.0';

export interface ElementMetadata {
  name: string;
  version: string;
}

export function defineElement(name: string, element: typeof HTMLElement & { __meta?: ElementMetadata }) {
  if (!customElements.get(name)) {
    customElements.define(name, element);
    const meta = { name, version: '0.0.0' };
    element.__meta = meta;
    GlobalStateService.dispatch('defineElement', { elementRegistry: [meta] });
  }
}
