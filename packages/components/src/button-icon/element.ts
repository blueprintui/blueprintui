import { html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, interactionStyles, BaseButton, I18nService, i18n, Directions } from '@blueprintui/components/internals';
import { BpIcon } from '@blueprintui/icons';
import styles from './element.css' assert { type: 'css' };

export const buttonIconStyles = styles;

/**
 * Action Button
 *
 * ```typescript
 * import '@blueprintui/components/include/button-icon.js';
 * ```
 *
 * ```html
 * <bp-button-icon></bp-button-icon>
 * ```
 *
 * @element bp-button-icon
 * @slot - slot for text content or bp-icon
 * @cssprop --icon-width
 * @cssprop --icon-height
 * @cssprop --width
 * @cssprop --height
 * @cssprop --color
 * @cssprop --cursor
 * @cssprop --background
 * @cssprop --padding
 * @cssprop --outline
 * @cssprop --outline-offset
 * @cssprop --border
 */
@i18n<BpButtonIcon>({ key: 'actions' })
export class BpButtonIcon extends BaseButton {
  @property({ type: Object }) i18n = I18nService.keys.actions;

  @property({ type: String }) shape = 'ellipsis-vertical';

  @property({ type: String, reflect: true }) action: string;

  @property({ type: String, reflect: true }) direction: Directions;

  static styles = [baseStyles, interactionStyles, styles];

  get icon() {
    return this.shadowRoot.querySelector<BpIcon>('bp-icon');
  }

  render() {
    return html`
      <div part="internal">
        <slot>
          <bp-icon .direction=${this.direction} .shape=${this.shape} .type=${this.pressed || this.expanded ? 'solid' : ''} inner-offset=${1}></bp-icon>
        </slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('bp-button-icon', '');
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    if (props.has('readonly')) {
      this.readonly && !this._internals.ariaLabel ? (this._internals.ariaHidden = 'true') : (this._internals.ariaHidden = null);
    }
  }
}
