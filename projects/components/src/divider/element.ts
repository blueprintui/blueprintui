import { property } from 'lit/decorators/property.js';
import { BpTypeElement, attachInternals, baseStyles } from '@blueprintui/components/internals';
import { html, LitElement, PropertyValueMap } from 'lit';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/divider.js';
 * ```
 *
 * ```html
 * <bp-divider></bp-divider>
 * ```
 *
 * @summary The divider component is used to visually separate content into distinct sections. It can be used to separate a group of related items or to indicate a change in content or context.
 * @element bp-divider
 * @since 1.0.0
 * @cssprop --background
 * @cssprop --size
 */
export class BpDivider extends LitElement implements Pick<BpTypeElement, keyof BpDivider> {
  @property({ type: String }) accessor orientation: 'horizontal' | 'vertical' = 'horizontal';

  declare _internals: ElementInternals;

  render() {
    return html`<div part="internal"></div>`;
  }

  static get styles() {
    return [baseStyles, styles];
  }

  constructor() {
    super();
    attachInternals(this);
    this._internals.role = 'separator';
    this._internals.ariaOrientation = 'horizontal';
  }

  protected updated(props: PropertyValueMap<this>) {
    super.updated(props);
    this._internals.ariaOrientation = this.orientation;
  }
}
