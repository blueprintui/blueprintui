import { BroadcastSubject } from '../utils/event-subject.js';
import { mergeObjects } from '../utils/traversal.js';

declare global {
  interface Window {
    bp: { _stateService: GlobalState, debug: () => void, debugElements: () => void };
    structuredClone: <T>(value: T, transferables?: any) => T;
  }
}

export interface BpState {
  environment: { production: boolean; };
  i18nRegistry: Readonly<Record<string, any>>;
  elementRegistry: { name: string, version: string }[];
}

export class GlobalState {
  #stateUpdate = new BroadcastSubject<{ type: string, state: Partial<BpState> }>();
  
  #state: BpState = {
    environment: { production: false },
    i18nRegistry: {},
    elementRegistry: []
  };

  readonly stateUpdate = this.#stateUpdate.toEventObservable();

  get state(): BpState {
    return this.#state;
  }

  dispatch(type: string, state: Partial<BpState>) {
    this.#state = mergeObjects(this.#state, state) as any;
    this.#stateUpdate.emit({ type, state: this.#state });
  }
}

window.bp = window.bp ?? {
  _stateService: new GlobalState(),
  debug() {
    console.log(JSON.stringify(window.bp._stateService.state, null, 2));
  },
  debugElements() {
    console.table(window.bp._stateService.state.elementRegistry.sort((a, b) => a.name.localeCompare(b.name)));
  }
};

export const GlobalStateService = window.bp._stateService;