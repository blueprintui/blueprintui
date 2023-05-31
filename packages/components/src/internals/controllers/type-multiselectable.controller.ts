import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type TypeMultiSelectable = ReactiveElement & {
  selectable: 'multi' | 'single' | null;
  _internals?: ElementInternals;
};

export function typeMultiSelectable<T extends TypeMultiSelectable>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new TypeMultiSelectableController(instance));
}

/**
 * Responsible for setting the ariaMultiSelectable attribute of an element to indicate whether the element supports multiple selections
 */
export class TypeMultiSelectableController<T extends TypeMultiSelectable> implements ReactiveController {
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
