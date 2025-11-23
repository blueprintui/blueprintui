import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, dynamicControllers } from '@blueprintui/components/internals';
import focusStyles from '../internals/styles/focus.css' with { type: 'css' };
import { GridColumnWidthController } from './width.controller.js';
import styles from './element.css' with { type: 'css' };

/**
 * Grid Column
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * @element bp-grid-column
 * @since 1.0.0
 * @slot - column content
 * @cssprop --min-height
 * @cssprop --min-width
 * @cssprop --justify-content
 * @cssprop --padding-block
 * @cssprop --padding-inline
 * @cssprop --background
 * @cssprop --font-size
 * @cssprop --color
 * @cssprop --border-width
 */
@dynamicControllers()
export class BpGridColumn extends LitElement {
  /** control width of grid column via numeric or CSS value types */
  @property({ type: String }) accessor width: string;

  /** position individual column relative to the grid scroll container */
  @property({ type: String, reflect: true }) accessor position: 'sticky' | 'fixed';

  /** align column content and corresponding column cells */
  @property({ type: String, reflect: true }) accessor alignment: 'start' | 'center' | 'end';

  static styles = [baseStyles, styles, focusStyles];

  /** @private */
  _internals = this.attachInternals();

  render() {
    return html`
      <div role="group" part="internal" focusable>
        <slot>&nbsp;</slot>
        <slot name="resize">
          <div class="border"></div>
        </slot>
        <div class="line"></div>
      </div>
    `;
  }

  constructor() {
    super();
    new GridColumnWidthController(this);
    this._internals.role = 'columnheader';
    this._internals.ariaSort = 'none';
  }
}
