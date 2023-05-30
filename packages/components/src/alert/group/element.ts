import { html, LitElement, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { BpAlert } from '../element.js';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/alert.js';
 * ```
 *
 * ```html
 * <bp-alert-group status="success">
 *   <bp-alert>alert</bp-alert>
 * </bp-alert-group>
 * ```
 *
 * @element bp-alert-group
 * @slot - slot for content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --padding
 * @cssprop --border-radius
 */
export class BpAlertGroup extends LitElement {
  static styles = [baseStyles, styles];

  /** determine the visual status state */
  @property({ type: String, reflect: true }) status: 'accent' | 'success' | 'warning' | 'danger';

  get #alerts() {
    return this.querySelectorAll<BpAlert>('bp-alert');
  }

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }

  protected updated(props: PropertyValueMap<this>) {
    super.updated(props);

    this.#alerts.forEach(alert => {
      alert.setAttribute('_group', '');
      alert.status = this.status;
    });
  }
}
