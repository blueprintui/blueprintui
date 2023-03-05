import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ariaNavigation, baseStyles, elevationStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

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
 * @slot - badge content
 * @cssprop --padding
 * @cssprop --background
 * @cssprop --color
 * @cssprop --height
 * @cssprop --font-size
 * @cssprop --gap
 */
@ariaNavigation<BpHeader>()
export class BpHeader extends LitElement {
  @property({ type: String, reflect: true }) elevation: 'raised' | 'flat';

  static styles = [baseStyles, elevationStyles, styles];

  render() {
    return html`
      <div elevation part="internal">
        <slot></slot>
      </div>
    `;
  }
}
