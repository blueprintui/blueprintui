import { html, LitElement } from 'lit';
import { typeNavigation, baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/header.js';
 * ```
 *
 * ```html
 * <bp-header>
 *   <bp-header-item>header</bp-header-item>
 * </bp-header>
 * ```
 *
 * @element bp-header
 * @since 1.0.0
 * @slot - badge content
 * @cssprop --padding
 * @cssprop --background
 * @cssprop --color
 * @cssprop --height
 * @cssprop --font-size
 * @cssprop --gap
 */
@typeNavigation<BpHeader>()
export class BpHeader extends LitElement implements Pick<BpTypeElement, keyof BpHeader> {
  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }
}
