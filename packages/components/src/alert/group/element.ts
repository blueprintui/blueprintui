import { html, LitElement, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators/property.js';
import { assignedElements, attachRootNodeStyles, baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import { BpAlert } from '../element.js';
import styles from './element.css' with { type: 'css' };
import globalStyles from './element.global.css' with { type: 'css' };

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
 * @summary The alert group component is used to inform users of important information or to provide feedback on an action they have taken.
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

  connectedCallback() {
    super.connectedCallback();
    attachRootNodeStyles(this, [globalStyles]);
  }

  protected updated(props: PropertyValueMap<this>) {
    super.updated(props);

    assignedElements<BpAlert>(this).forEach(alert => {
      alert.setAttribute('_group', '');
      alert.status = this.status;
    });
  }
}
