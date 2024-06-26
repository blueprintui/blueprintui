import { html, LitElement, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators/property.js';
import { assignedElements, baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import { BpAlert } from '../element.js';
import styles from './element.css' with { type: 'css' };

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
 * @since 1.0.0
 * @slot - slot for content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --padding
 * @cssprop --border-radius
 */
export class BpAlertGroup extends LitElement implements Pick<BpTypeElement, keyof BpAlertGroup> {
  /** determine the visual status state */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  /** determine the visual styles for top/pinned banners */
  @property({ type: String, reflect: true }) accessor type: 'banner';

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }

  protected updated(props: PropertyValueMap<this>) {
    super.updated(props);

    assignedElements<BpAlert>(this).forEach(alert => {
      alert.setAttribute('_group', '');
      alert.status = this.status;
    });
  }
}
