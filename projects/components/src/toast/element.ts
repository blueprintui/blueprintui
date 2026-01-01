import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, i18n, I18nService, PopoverMixin } from '@blueprintui/components/internals';
import type { Position } from '@blueprintui/components/internals';
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
export class BpToast extends PopoverMixin(LitElement) {
  /** Determines whether a close button is displayed for dismissing the toast */
  @property({ type: Boolean }) accessor closable = false;

  /** Specifies the position of the toast relative to its anchor or viewport */
  @property({ type: String, reflect: true }) accessor position: Position = 'top';

  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  /** Defines the visual status type affecting color, icon, and semantic meaning */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  static styles = [baseStyles, styles];

  get popoverConfig() {
    return {
      type: 'manual',
      focusTrap: false,
      scrollLock: false,
      modal: false
    } as const;
  }

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
    this._internals.role = 'alert';
  }
}
