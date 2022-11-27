import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import styles from './element.css' assert { type: 'css' };

/**
 * Search Input
 *
 * ```typescript
 * import '@blueprintui/components/include/time.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>search</label>
 *   <bp-search></bp-search>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-field>
 * ```
 *
 * @beta
 * @element bp-search
 * @slot
 */
export class BpSearch extends BpInput {
  @property({ type: String, reflect: true }) type = 'search';

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get prefixTemplate() {
    return html`<bp-button-icon shape="search" readonly></bp-button-icon>`;
  }
}
