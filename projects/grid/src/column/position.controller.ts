import { ReactiveController, ReactiveControllerHost } from 'lit';

export type ColumnPosition = ReactiveControllerHost & HTMLElement & { position: 'sticky' | 'fixed' };

export class ColumnPositionController implements ReactiveController {
  #styles: HTMLElement;
  #previousPosition: 'sticky' | 'fixed';

  get #hostGrid() {
    return this.host.parentElement.parentElement as HTMLElement & { _id: string };
  }

  constructor(private host: ColumnPosition) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#update();
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.#update();
  }

  async #update() {
    if (this.host.ariaColIndex && this.host.position !== this.#previousPosition) {
      this.#previousPosition = this.host.position;

      if (!this.#styles) {
        this.#styles = document.createElement('style');
        this.#hostGrid.append(this.#styles);
      }

      this.#calculateColumnPositionStyles();
    }
  }

  #calculateColumnPositionStyles() {
    const gridPosition = this.#hostGrid.getBoundingClientRect();
    const side = this.host.offsetLeft < gridPosition.width / 2 ? 'left' : 'right';
    this.#styles.innerHTML = `${this.#getPositionStyle(side, gridPosition)}\n${this.#borderStyle(side)}`;
  }

  #getPositionStyle(side: 'left' | 'right', gridPosition: DOMRect) {
    const position = this.host.getBoundingClientRect();
    const left = this.host.position === 'fixed' ? `${position.left - gridPosition.left - 1}px` : 'initial';
    const right = this.host.position === 'fixed' ? `${position.right - position.left - position.width}px` : 'initial';

    return `
    [_id='${this.#hostGrid._id}'] [aria-colindex="${this.host.ariaColIndex}"] {
      ${side === 'left' ? `left: ${left};` : ''}
      ${side === 'right' ? `right: ${right};` : ''}
      ${this.host.position === 'sticky' ? `left: 0px;` : ''}
    }

    [_id='${this.#hostGrid._id}'] bp-grid-cell[aria-colindex="${this.host.ariaColIndex}"] {
      z-index: 98;
    }`;
  }

  #borderStyle(side: 'left' | 'right') {
    const lastofLeft = side === 'left' && (this.host.nextElementSibling as any).position !== this.host.position;
    const lastofRight = side === 'right' && (this.host.previousElementSibling as any).position !== this.host.position;

    if (this.host.position !== undefined && (lastofLeft || lastofRight)) {
      // todo: test last of position
      return `
      [_id='${this.#hostGrid._id}'] bp-grid-cell[aria-colindex="${this.host.ariaColIndex}"] {
        --border-${
          side === 'left' ? 'right' : 'left'
        }: var(--bp-object-border-width-100, 1px) solid var(--bp-object-border-color-100, hsl(0, 0%, 91%));
      }`;
    } else {
      return '';
    }
  }
}
