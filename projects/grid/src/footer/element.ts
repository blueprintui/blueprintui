import { LitElement, html } from 'lit';
import { state } from 'lit/decorators/state.js';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * Grid Footer
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * @element bp-grid-footer
 * @since 1.0.0
 * @slot - footer content
 * @cssprop --min-height
 * @cssprop --background
 * @cssprop --padding-block
 * @cssprop --padding-inline
 * @cssprop --border-width
 */
export class BpGridFooter extends LitElement {
  static styles = [baseStyles, styles];

  @state() _colSpan = '';

  #internals = this.attachInternals();

  render() {
    return html`<slot role="gridcell" part="internal" .ariaColSpan=${this._colSpan}></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.slot = 'footer';
    this.#internals.role = 'row';
  }
}
