import { ReactiveController, ReactiveElement } from 'lit';

export interface TypeAnchor extends ReactiveElement {
  disabled: boolean;
  readonly: boolean;
}

export function typeAnchor<T extends TypeAnchor>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new TypeAnchorController(instance));
}

export class TypeAnchorController<T extends TypeAnchor> implements ReactiveController {
  get #anchor() {
    return this.host.shadowRoot.querySelector<HTMLAnchorElement>('a') ||
      this.host.querySelector<HTMLAnchorElement>('a') ||
      this.host.parentElement.tagName === 'A'
      ? (this.host.parentElement as HTMLAnchorElement)
      : undefined;
  }

  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;

    if (this.#anchor) {
      this.host.readonly = true;
      this.#anchor.style.textDecoration = 'none';
    }

    this.#anchor?.addEventListener('click', e => {
      if (this.host.disabled) {
        e.preventDefault();
      }
    });
  }
}
