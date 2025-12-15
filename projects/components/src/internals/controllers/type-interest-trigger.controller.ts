import { ReactiveController, ReactiveElement } from 'lit';
import { querySelectorByIdRef } from '../utils/dom.js';

export interface InterestTrigger extends ReactiveElement {
  interestForElement: HTMLElement;
  readonly?: boolean;
  disabled?: boolean;
}

/**
 * Provides necessary API for Invoker Interest support https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Interests_API
 */
export function typeInterestTrigger<T extends InterestTrigger>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) => {
    return target.addInitializer(
      (instance: T & { typeInterestTriggerController?: TypeInterestTriggerController<T> }) => {
        if (!instance.typeInterestTriggerController) {
          Object.defineProperty(instance, 'typeInterestTriggerController', {
            value: new TypeInterestTriggerController(instance),
            writable: false
          });
        }

        return instance.typeInterestTriggerController;
      }
    );
  };
}

export class TypeInterestTriggerController<T extends InterestTrigger> implements ReactiveController {
  #observer: MutationObserver;

  constructor(private host: T) {
    this.host.addController(this);

    this.#observer = new MutationObserver(mutations => {
      const element = mutations[0].target as HTMLElement;
      this.host.interestForElement = querySelectorByIdRef(this.host, element.getAttribute('interestfor'));
    });

    this.#observer.observe(this.host, { attributes: true, attributeFilter: ['interestfor'] });
  }

  async hostConnected() {
    await this.host.updateComplete;

    const interestfor = this.host.getAttribute('interestfor');
    if (interestfor) {
      this.host.interestForElement = querySelectorByIdRef(this.host, interestfor);
    }

    this.host.addEventListener('focus', this.#interestFn);
    this.host.addEventListener('mouseenter', this.#interestFn);
    this.host.addEventListener('focusout', this.#loseInterestFn);
    this.host.addEventListener('mouseleave', this.#loseInterestFn);
  }

  async hostDisconnected() {
    this.#observer.disconnect();
    this.host.removeEventListener('focus', this.#interestFn);
    this.host.removeEventListener('mouseenter', this.#interestFn);
    this.host.removeEventListener('focusout', this.#loseInterestFn);
    this.host.removeEventListener('mouseleave', this.#loseInterestFn);
  }

  #interestFn = () => {
    if (this.host.interestForElement) {
      const event = new Event('interest', {
        cancelable: true
      }) as any;
      event.source = this.host;
      this.host.interestForElement.dispatchEvent(event);
    }
  };

  #loseInterestFn = () => {
    if (this.host.interestForElement) {
      const event = new Event('loseinterest', {
        cancelable: true
      }) as any;
      event.source = this.host;
      this.host.interestForElement.dispatchEvent(event);
    }
  };
}
