import { GlobalStateService } from '../services/global.service.js';

export const version = 'PACKAGE_VERSION';

export function defineElement(name: string, element: typeof HTMLElement) {
  if (!customElements.get(name)) {
    customElements.define(name, element);
    const meta = { name, version: 'PACKAGE_VERSION' };
    (element as any).__meta = meta;
    GlobalStateService.dispatch('defineElement', { elementRegistry: [meta] });
  }
}
