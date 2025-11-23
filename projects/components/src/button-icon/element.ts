import { html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { I18nService, i18n, BpTypeButton } from '@blueprintui/components/internals';
import { BpButton } from '@blueprintui/components/button';
import type { BpIcon } from '@blueprintui/icons';
import styles from './element.css' with { type: 'css' };

export const buttonIconStyles = styles;

/**
 * ```typescript
 * import '@blueprintui/components/include/button-icon.js';
 * ```
 *
 * ```html
 * <bp-button-icon></bp-button-icon>
 * ```
 *
 * @summary The icon button component is used to provide a visual representation of an action.
 * @element bp-button-icon
 * @since 1.0.0
 * @slot - slot for text content or bp-icon
 * @csspart icon
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
export class BpButtonIcon extends BpButton implements Pick<BpTypeButton, keyof Omit<BpButtonIcon, 'shape' | 'icon'>> {
  /** Defines the icon shape to display within the button */
  @property({ type: String, reflect: true }) accessor shape = 'ellipsis-vertical';

  /** Controls the directional orientation of the icon within the button */
  @property({ type: String, reflect: true }) accessor direction: 'up' | 'down' | 'left' | 'right';

  /** Provides internationalization strings for accessibility labels and screen reader announcements */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static get styles() {
    return [...super.styles, styles]; // todo: inherited styles from button are missing from button-expand, button-handle, button-sort
  }

  get icon() {
    return this.shadowRoot.querySelector<BpIcon>('bp-icon');
  }

  render() {
    return html`
      <div part="internal" interaction interaction-after>
        <slot>
          <bp-icon
            part="icon"
            .direction=${this.direction}
            .shape=${this.shape}
            .type=${this.pressed || this.expanded ? 'solid' : ''}
            size="sm"
            inner-offset="1"></bp-icon>
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
      this.readonly && !this._internals.ariaLabel
        ? (this._internals.ariaHidden = 'true')
        : (this._internals.ariaHidden = null);
    }
  }
}
