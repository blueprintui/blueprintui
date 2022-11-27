import { GlobalStateService } from '../services/global.service.js';

export function defineElement(name: string, element: typeof HTMLElement) {
  if (!customElements.get(name)) {
    customElements.define(name, element);
    const meta = { name, version: 'PACKAGE_VERSION', url: import.meta.url };
    (element as any).__meta = meta;
    GlobalStateService.dispatch('defineElement', { elementRegistry: [meta] });
  }
}
