import { ReactiveController, ReactiveElement } from 'lit';
import { GlobalStateService } from '../services/global.service.js';
import { I18nService, I18nStrings } from '../services/i18n.service.js';
import { mergeObjects } from '../utils/traversal.js';
import { matchInterpolate } from '../utils/i18n.js';

export function i18n<T extends ReactiveElement & { i18n: any }>(config: { key: keyof I18nStrings }): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new I18nController(instance, config));
}

export class I18nController<T extends ReactiveElement & { i18n: any }> implements ReactiveController {
  #i18n = { };

  constructor(private host: T, private config: { key: keyof I18nStrings }) {
    this.host.addController(this);
  }

  hostConnected() {
    GlobalStateService.stateUpdate.subscribe(update => {
      if (update.type === 'i18nRegistry') {
        this.#updateProp();
      }
    });
  }

  hostUpdated() {
    if (this.#firstUpdated && !(this.host.i18n as any)?.__set) {
      this.#i18n = this.host.i18n;
      this.#updateProp();
    }
  }

  #updateProp() {
    const i18nObj = mergeObjects(I18nService.keys[this.config.key], this.#i18n);
    this.host.i18n = { ...JSON.parse(matchInterpolate(JSON.stringify(i18nObj), this.host)), __set: true };
    this.host.requestUpdate('i18n');
  }

  #updates = 0;
  get #firstUpdated() {
    this.#updates++;
    return this.#updates > 1;
  }
}
