import { html, LitElement } from 'lit';
import { baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/page.js';
 * ```
 *
 * ```html
 * <bp-page></bp-page>
 * ```
 *
 * @summary The page component is for page level layout.
 * @element bp-page
 * @since 1.0.0
 * @slot - slot for content
 * @slot header - slot for header
 * @slot subheader - slot for subheader
 * @slot aside-start - slot for aside start
 * @slot aside-end - slot for aside end
 * @slot subfooter - slot for subfooter
 * @slot footer - slot for footer
 */
export class BpPage extends LitElement implements Pick<BpTypeElement, keyof BpPage> {
  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="internal">
        <slot name="header"></slot>
        <slot name="subheader"></slot>
        <slot name="aside-start"></slot>
        <slot></slot>
        <slot name="aside-end"></slot>
        <slot name="subfooter"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}
