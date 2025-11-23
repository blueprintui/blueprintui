import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, dynamicControllers } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * Grid Row
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * @element bp-grid-row
 * @since 1.0.0
 * @cssprop --border-top
 * @cssprop --border-bottom
 * @cssprop --background
 * @cssprop --min-height
 * @cssprop --border-width
 * @cssprop --border-color
 */
@dynamicControllers()
export class BpGridRow extends LitElement {
  /** selected visual state */
  @property({ type: Boolean, reflect: true }) accessor selected: boolean;

  /** position individual row relative to the grid scroll container */
  @property({ type: String, reflect: true }) accessor position: 'fixed' | 'sticky' | '';

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
}
