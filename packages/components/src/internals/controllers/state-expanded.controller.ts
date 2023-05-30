import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type AriaExpanded = ReactiveElement & { expanded: boolean; readonly?: boolean; _internals?: ElementInternals };

export function stateExpanded<T extends AriaExpanded>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new StateExpandedController(instance));
}

/**
 * Responsible for managing the aria-expanded attribute and the --expanded CSS state of a LitElement
 */
export class StateExpandedController<T extends AriaExpanded> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    if (this.host.expanded !== null && this.host.expanded !== undefined) {
      this.host._internals.ariaExpanded = `${this.host.expanded}`;
    }

    if (this.host.expanded) {
      this.host._internals.states.add('--expanded');
    } else {
      this.host._internals.states.delete('--expanded');
    }

    if (this.host.readonly) {
      this.host._internals.ariaExpanded = null;
      this.host._internals.states.delete('--expanded');
    }
  }
}
