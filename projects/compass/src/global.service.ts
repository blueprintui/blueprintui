import { BroadcastSubject } from './utils/event-subject.js';
import { mergeObjects } from './utils/traversal.js';

declare global {
  interface Window {
    bpCompass: { _stateService: GlobalState };
  }
}

export interface CompassState {
  i18nRegistry: Readonly<Record<string, any>>;
}

export class GlobalState {
  #stateUpdate = new BroadcastSubject<{ type: string; state: Partial<CompassState> }>();

  #state: CompassState = {
    i18nRegistry: {}
  };

  readonly stateUpdate = this.#stateUpdate.toEventObservable();

  get state(): CompassState {
    return this.#state;
  }

  dispatch(type: string, state: Partial<CompassState>) {
    this.#state = mergeObjects(this.#state, state) as any;
    this.#stateUpdate.emit({ type, state: this.#state });
  }
}

window.bpCompass = window.bpCompass ?? {
  _stateService: new GlobalState()
};

export const GlobalStateService = window.bpCompass._stateService;
