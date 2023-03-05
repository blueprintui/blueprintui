import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type AriaMultiSelectable = ReactiveElement & {
  selectable: 'multi' | 'single' | null;
  _internals?: ElementInternals;
};

export function ariaMultiSelectable<T extends AriaMultiSelectable>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new AriaMultiSelectableController(instance));
}

export class AriaMultiSelectableController<T extends AriaMultiSelectable> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    if (this.host.selectable !== undefined && this.host.selectable !== null) {
      this.host._internals.ariaMultiSelectable = this.host.selectable === 'multi' ? 'true' : 'false';
    } else {
      this.host._internals.ariaMultiSelectable = null;
    }
  }
}
