import { LitElement, html } from 'lit';
import { baseStyles, dynamicControllers } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Grid Row
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * @element bp-grid-header
 * @since 1.0.0
 * @cssprop --border-top
 * @cssprop --border-bottom
 * @cssprop --background
 * @cssprop --min-height
 */
@dynamicControllers()
export class BpGridHeader extends LitElement {
  static styles = [baseStyles, styles];

  /** @private */
  _internals = this.attachInternals();

  render() {
    return html`<slot></slot>`;
  }

  constructor() {
    super();
    this._internals.role = 'row';
  }

  connectedCallback() {
    super.connectedCallback();
    this.slot = 'header';
  }
}
