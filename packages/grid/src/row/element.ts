import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, dynamicControllers, interactionStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Grid Row
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * @element bp-grid-row
 * @cssprop --border-top
 * @cssprop --border-bottom
 * @cssprop --background
 * @cssprop --min-height
 */
@dynamicControllers()
export class BpGridRow extends LitElement {
  /** selected visual state */
  @property({ type: Boolean, reflect: true }) selected: boolean;

  /** position individual row relative to the grid scroll container */
  @property({ type: String, reflect: true }) position: 'fixed' | 'sticky' | '';

  static styles = [baseStyles, interactionStyles, styles];

  #internals = this.attachInternals();

  render() {
    return html`<slot></slot>`;
  }

  constructor() {
    super();
    this.#internals.role = 'row';
  }
}
