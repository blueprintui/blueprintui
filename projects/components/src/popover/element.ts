import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, popoverStyles, Position, I18nService, i18n, typePopover } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

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
 * @slot header - slot for popover header
 * @slot footer - slot for popover footer
 * @event open - dispatched when the popover is opened
 * @event close - dispatched when the popover is closed
 * @command --toggle-popover
 * @command --show-popover
 * @command --hide-popover
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
@typePopover<BpPopover>(() => ({
  type: 'manual'
}))
export class BpPopover extends LitElement {
  static styles = [baseStyles, popoverStyles, styles];

  /** Determines whether a close button is displayed for dismissing the popover */
  @property({ type: Boolean }) accessor closable = false;

  /** Specifies the position of the popover relative to its anchor element */
  @property({ type: String, reflect: true }) accessor position: Position = 'bottom';

  /** Defines the anchor element or selector that the popover will position relative to */
  @property({ type: String }) accessor anchor: HTMLElement | string;

  /** Determines if a visual backdrop should be rendered behind the popover */
  @property({ type: Boolean }) accessor modal = false;

  /** Controls whether focus is trapped within the popover when open */
  @property({ type: Boolean }) accessor focusTrap = false;

  /** Determines whether an arrow indicator is displayed pointing to the anchor */
  @property({ type: Boolean }) accessor arrow: boolean;

  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  render() {
    return html`
      <div part="internal" id="internal">
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
      </div>
      ${this.arrow ? html`<div part="arrow"></div>` : nothing}
    `;
  }
}
