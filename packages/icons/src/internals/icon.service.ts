import { BroadcastSubject } from './event-subject.js';
import { IconRegistry } from './interfaces.js';
import { mergeObjects } from './utils.js';

const unknown = {
  viewBox: 24,
  type: {
    default: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>',
  }
};

export class GlobalIconService {
  #stateUpdate = new BroadcastSubject<{ type: string, state: Partial<IconRegistry> }>();

  readonly stateUpdate = this.#stateUpdate.toEventObservable();

  #state = { };

  get registry(): Readonly<Partial<IconRegistry>> {
    return { unknown, ...this.#state as any };
  }

  add(...shapes: any[]) {
    this.#state = mergeObjects(this.#state, { ...Object.fromEntries(shapes.filter(s => !this.registry[s.name]).map(s => [s.name, s])) }) as any;
    this.#stateUpdate.emit({ type: 'BpIconRegistry', state: this.#state });
  }
}

window.blueprintuiIcons ?? (window.blueprintuiIcons = new GlobalIconService());
export const IconService = window.blueprintuiIcons;

declare global {
  interface Window {
    blueprintuiIcons: GlobalIconService;
  }
}
