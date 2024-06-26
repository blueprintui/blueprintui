import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles, BpTypeElement, stateTextContent } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/badge.js';
 * ```
 *
 * ```html
 * <bp-badge status="warning">2</bp-badge>
 * ```
 *
 * @element bp-badge
 * @since 1.0.0
 * @slot - badge content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --font-size
 * @cssprop --width
 * @cssprop --height
 * @cssprop --min-width
 * @cssprop --min-height
 * @cssprop --border-radius
 * @cssprop --padding
 */
@stateTextContent<BpBadge>()
export class BpBadge extends LitElement implements Pick<BpTypeElement, keyof BpBadge> {
  static styles = [baseStyles, styles];

  /** determine the visual status state */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'status';
  }
}
