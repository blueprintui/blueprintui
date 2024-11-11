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
 * @element bp-toast
 * @since 1.0.0
 * @event open - dispatched when the toast is opened
 * @event close - dispatched when the toast is closed
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
  trigger: host.trigger,
  anchor: host.anchor,
  open: host.open,
  static: host.static,
  type: 'manual'
}))
export class BpToast extends LitElement implements Pick<BpTypePopover, keyof BpToast> {
  /** determine user closable state */
  @property({ type: Boolean }) accessor closable = false;

  /** default popover to open on intialization */
  @property({ type: Boolean, reflect: true }) accessor open = false;

  @property({ type: Boolean, reflect: true }) accessor static = false;

  /** determine the position relative to the anchor */
  @property({ type: String, reflect: true }) accessor position: Position = 'top';

  /** the triggering element that opens the popover */
  @property({ type: String }) accessor trigger: HTMLElement | string;

  /** anchor element popover will positiion relative to */
  @property({ type: String }) accessor anchor: HTMLElement | string;

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  /** determine the visual status state */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <bp-icon part="icon" .shape=${statusIcon[this.status]} size="md"></bp-icon>
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
