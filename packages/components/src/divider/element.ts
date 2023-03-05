import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { html, LitElement, PropertyValueMap } from 'lit';
import styles from './element.css' assert { type: 'css' };

/**
 * Divider
 *
 * ```typescript
 * import '@blueprintui/components/include/divider.js';
 * ```
 *
 * ```html
 * <bp-divider></bp-divider>
 * ```
 *
 * @element bp-divider
 * @cssprop --background
 * @cssprop --size
 */
export class BpDivider extends LitElement {
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  private _internals = this.attachInternals();

  render() {
    return html`<div part="internal"></div>`;
  }

  static get styles() {
    return [baseStyles, styles];
  }

  constructor() {
    super();
    this._internals.role = 'separator';
    this._internals.ariaOrientation = 'horizontal';
  }

  protected updated(props: PropertyValueMap<this>) {
    super.updated(props);
    this._internals.ariaOrientation = this.orientation;
  }
}
