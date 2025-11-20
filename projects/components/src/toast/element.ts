import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles, i18n, I18nService, typePopover } from '@blueprintui/components/internals';
import type { BpTypePopover, Position } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

const statusIcon = {
  undefined: 'info',
  accent: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error'
};

/**
 * ```typescript
 * import '@blueprintui/components/include/toast.js';
 * ```
 *
 * ```html
 * <bp-toast></bp-toast>
 * ```
 *
 * @summary A Toast component is a notification that appears on the screen for a short period of time and provides feedback about an action performed by the user. A Toast should be used for short, non-interruptive notifications that are meant to supplement the current screen.
 * @element bp-toast
 * @since 1.0.0
 * @event open - dispatched when the toast is opened
 * @event close - dispatched when the toast is closed
 * @command --toggle-popover
 * @command --show-popover
 * @command --hide-popover
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
@i18n<BpToast>({ key: 'actions' })
@typePopover<BpToast>(host => ({
  anchor: host.anchor,
  open: host.open,
  static: host.static,
  type: 'manual'
}))
export class BpToast extends LitElement implements Pick<BpTypePopover, keyof BpToast> {
  /** Determines whether a close button is displayed for dismissing the toast */
  @property({ type: Boolean }) accessor closable = false;

  /** Controls whether the toast is visible on initialization */
  @property({ type: Boolean, reflect: true }) accessor open = false;

  /** Determines whether the toast remains in a fixed position without repositioning */
  @property({ type: Boolean, reflect: true }) accessor static = false;

  /** Specifies the position of the toast relative to its anchor or viewport */
  @property({ type: String, reflect: true }) accessor position: Position = 'top';

  /** Defines the anchor element or selector that the toast will position relative to */
  @property({ type: String }) accessor anchor: HTMLElement | string;

  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  /** Defines the visual status type affecting color, icon, and semantic meaning */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <bp-icon part="icon" .shape=${statusIcon[this.status]} size="sm"></bp-icon>
        <slot></slot>
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.hidePopover}
              part="close"
              shape="close"
              action="inline"
              aria-label=${this.i18n.close}></bp-button-icon>`
          : nothing}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'alert';
  }
}
