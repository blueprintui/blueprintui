import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachRootNodeStyles, baseStyles } from '@blueprintui/components/internals';
import globalStyles from './element.global.css' assert { type: 'css' };
import styles from './element.css' assert { type: 'css' };

/**
 * Button
 *
 * ```typescript
 * import '@blueprintui/components/include/button.js';
 * ```
 *
 * ```html
 * <bp-button-group>
 *   <bp-button></bp-button>
 *   <bp-button></bp-button>
 * </bp-button-group>
 * ```
 *
 * @element bp-button-group
 * @slot
 */
export class BpButtonGroup extends LitElement {
  @property({ type: String, reflect: true }) action: 'primary' | 'outline' | 'flat' = 'primary';

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => attachRootNodeStyles(this.parentNode, [globalStyles])); // todo: workaround when host is a sync registered shadow root or another lit instance
  }
}
