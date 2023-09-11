import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  typePositioned,
  Position,
  I18nService,
  i18n,
  typePopover
} from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/popover.js';
 * ```
 *
 * ```html
 * <bp-popover>
 *
 * </bp-popover>
 * ```
 *
 * @element bp-popover
 * @since 1.0.0
 * @slot - content
 * @cssprop --padding
 * @cssprop --filter
 * @cssprop --background
 * @cssprop --color
 * @cssprop --width
 * @cssprop --height
 * @cssprop --min-width
 * @cssprop --min-height
 * @cssprop --font-size
 */
@i18n<BpPopover>({ key: 'actions' })
@typePopover<BpPopover>(host => ({
  trigger: host.trigger,
  type: 'manual'
}))
@typePositioned<BpPopover>(host => ({
  position: host.position,
  popover: host,
  anchor: host.anchor,
  arrow: host.shadowRoot.querySelector<HTMLElement>('[part=arrow]')
}))
export class BpPopover extends LitElement {
  static styles = [baseStyles, styles];

  /** determine user closable state */
  @property({ type: Boolean }) accessor closable = false;

  @property({ type: String, reflect: true }) accessor position: Position = 'bottom';

  @property({ type: String }) accessor anchor: HTMLElement | string;

  /** the triggering element that opens the popover */
  @property({ type: String }) accessor trigger: HTMLElement | string;

  @property({ type: Boolean }) accessor modal = false;

  @property({ type: Boolean }) accessor focusTrap = false;

  @property({ type: Boolean }) accessor arrow: boolean;

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  render() {
    return html`
      <div part="internal">
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.hidePopover}
              aria-label=${this.i18n.close}
              shape="close"
              action="flat"
              type="button"></bp-button-icon>`
          : nothing}
        <slot name="header"></slot>
        <div class="content">
          <slot></slot>
        </div>
        <slot name="footer"></slot>
        ${this.arrow ? html`<div part="arrow"></div>` : nothing}
      </div>
    `;
  }
}
