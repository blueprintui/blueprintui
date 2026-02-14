import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import styles from './element.css' with { type: 'css' };

/**
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
 * @summary The Search component is used for searching for specific content within an application.
 * @element bp-search
 * @since 1.0.0
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpSearch extends BpInput {
  // implements Pick<BpTypeControl, keyof BpSearch>
  /** Specifies the input type as search for optimized search behavior */
  @property({ type: String }) accessor type = 'search';

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get prefixTemplate() {
    return html`<bp-button-icon shape="search" action="inline" readonly></bp-button-icon>`;
  }
}
