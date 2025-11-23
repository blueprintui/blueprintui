import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * Control Message
 *
 * ```typescript
 * import '@blueprintui/components/include/forms.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>Test</label>
 *   <input type="text" />
 *   <bp-field-message>helper text</bp-field-message>
 * </bp-field>
 * ```
 *
 * @element bp-field-message
 * @since 1.0.0
 * @slot - For projecting helper message text
 * @cssprop --color
 * @cssprop --font-size
 * @cssprop --font-weight
 * @cssprop --max-width
 * @cssprop --min-width
 */
export class BpFieldMessage extends LitElement {
  /** Set the status of field message validation */
  @property({ type: String, reflect: true }) accessor status: 'error' | 'success';

  /** HTML5 ValidityState https://developer.mozilla.org/en-US/docs/Web/API/ValidityState */
  @property({ type: String, reflect: true }) accessor error: keyof ValidityState;

  static styles = [baseStyles, styles];

  render() {
    return html`<div part="internal">
      ${this.status
        ? html` ${this.status === 'error' ? html`<bp-icon size="sm" status="danger" shape="error"></bp-icon>` : nothing}
          ${this.status === 'success' ? html`<bp-icon size="sm" status="success" shape="success"></bp-icon>` : nothing}`
        : nothing}
      <slot></slot>
    </div> `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.slot = 'message';
  }
}
