import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { GridColumnSizeController } from './size.controller.js';
import { GridColumnPositionController } from './position.controller.js';
import styles from './element.css' assert { type: 'css' };

/**
 * Grid Column
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * @element bp-grid-column
 * @slot - column content
 * @cssprop --min-height
 * @cssprop --min-width
 * @cssprop --justify-content
 * @cssprop --padding-block
 * @cssprop --padding-inline
 * @cssprop --background
 * @cssprop --font-size
 * @cssprop --color
 */
export class BpGridColumn extends LitElement {
  /** control width of grid column via numeric or CSS value types */
  @property({ type: String }) width: string;

  /** determine if given column type for various action features */
  @property({ type: String, reflect: true }) type: '' | 'action';

  /** position individual column relative to the grid scroll container */
  @property({ type: String, reflect: true }) position: '' | 'sticky' | 'fixed' = ''; // must be '' for fixed/sticky position initial calc instead of undefined

  static styles = [baseStyles, styles];

  #internals = this.attachInternals();

  render() {
    return html`
      <slot role="group" part="internal" focusable>&nbsp;</slot>
    `;
  }

  constructor() {
    super();
    new GridColumnSizeController(this);
    new GridColumnPositionController(this);
    this.#internals.role = 'columnheader';
    this.#internals.ariaSort = 'none';
  }

  connectedCallback() {
    super.connectedCallback();
    this.slot = 'columns';
  }
}
