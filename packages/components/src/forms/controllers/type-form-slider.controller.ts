import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals, InteractionTouchController } from '@blueprintui/components/internals';
import { TypeFormControl, TypeFormControlController } from './type-form-control.controller.js';

export interface SliderControl extends TypeFormControl {
  step: number;
  min: number;
  max: number;
  valueAsNumber: number;
  direction: 'horizontal' | 'vertical';
}

/**
 * https://www.w3.org/WAI/ARIA/apg/patterns/slider/
 */
export class TypeFormSliderController<T extends SliderControl & ReactiveElement> implements ReactiveController {
  protected interactionTouchController: InteractionTouchController<T>;

  protected typeFormControlController: TypeFormControlController<T>;

  set #value(value: number) {
    if (this.#validRange(value)) {
      this.host.valueAsNumber = value;
    }
  }

  get #value() {
    return this.host.valueAsNumber;
  }

  constructor(private host: T) {
    attachInternals(this.host);
    this.host.addController(this);
    this.interactionTouchController = new InteractionTouchController(this.host);
    this.host._internals.states.add('--complex-focus');
    if (!(this.host as T & { typeFormControlController: TypeFormControlController<T> }).typeFormControlController) {
      this.typeFormControlController = new TypeFormControlController<T>(this.host);
    } else {
      this.typeFormControlController = (
        this.host as T & { typeFormControlController: TypeFormControlController<T> }
      ).typeFormControlController;
    }
  }

  hostConnected() {
    this.host.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!this.host.disabled && !this.host.readonly) {
        this.#keydown(e);
      }
    });

    this.host.addEventListener('bp-touchmove', (e: any) => {
      if (!this.host.disabled && !this.host.readonly) {
        this.#touchMove(e);
      }
    });

    this.host.addEventListener('bp-touchend', () => {
      if (!this.host.disabled && !this.host.readonly) {
        this.#touchEnd();
      }
    });
  }

  hostUpdated() {
    this.host._internals.role = 'slider';
    this.host.tabIndex = this.host.disabled || this.host.readonly ? -1 : 0;
  }

  #keydown(e: KeyboardEvent) {
    if (e.code === 'ArrowLeft') {
      this.#value -= this.host.step;
    } else if (e.code === 'ArrowRight') {
      this.#value += this.host.step;
    } else if (e.code === 'ArrowUp') {
      this.#value += this.host.step;
    } else if (e.code === 'ArrowDown') {
      this.#value -= this.host.step;
    } else if (e.code === 'Home') {
      this.#value = this.host.min;
    } else if (e.code === 'End') {
      this.#value = this.host.max;
    }

    if (e.code !== 'Tab') {
      e.preventDefault();
    }

    this.#input();
    this.#change();
  }

  #touchMove(e: any) {
    const offset = this.host.direction === 'horizontal' ? e.detail.offsetX : e.detail.offsetY;
    const value = (this.#value + offset).toFixed(0);
    if (this.#validRange(value)) {
      this.#value = value;
      this.#input();
    }
  }

  #touchEnd() {
    this.#change();
  }

  #input() {
    this.typeFormControlController.dispatchInput(
      new InputEvent('input', { bubbles: true, composed: true, data: `${this.#value}` })
    );
  }

  #change() {
    this.typeFormControlController.dispatchChange(new InputEvent('change', { bubbles: true, composed: true }));
  }

  #validRange(value: number) {
    return value <= this.host.max && value >= this.host.min;
  }
}
