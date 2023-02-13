import { GlobalStateService } from '../services/global.service.js';

export const version = '0.0.0';

export function defineElement(name: string, element: typeof HTMLElement) {
  if (!customElements.get(name)) {
    customElements.define(name, element);
    const meta = { name, version: '0.0.0' };
    (element as any).__meta = meta;
    GlobalStateService.dispatch('defineElement', { elementRegistry: [meta] });
  }
}
