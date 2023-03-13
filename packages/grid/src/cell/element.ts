import { LitElement, html } from 'lit';
import { baseStyles } from '@blueprintui/components/internals';
import { focusStyles } from '../internals/index.js';
import styles from './element.css' assert { type: 'css' };

/**
 * Grid Cell
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * @element bp-grid-cell
 * @slot - cell content
 * @cssprop --border-right
 * @cssprop --border-left
 * @cssprop --min-height
 * @cssprop --min-width
 * @cssprop --font-size
 * @cssprop --justify-content
 * @cssprop --padding-block
 * @cssprop --padding-inline-start
 * @cssprop --padding-inline-end
 * @cssprop --color
 */
export class BpGridCell extends LitElement {
  static styles = [baseStyles, styles, focusStyles];

  /** @private */
  _internals = this.attachInternals();

  render() {
    return html`<slot focusable></slot>`;
  }

  constructor() {
    super();
    this._internals.role = 'gridcell';
  }
}
