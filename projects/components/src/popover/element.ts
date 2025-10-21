import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, popoverStyles, Position, I18nService, i18n, typePopover } from '@blueprintui/components/internals';
import type { BpPopoverEventMap } from '@blueprintui/components/internals/events';
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

  /** determine user closable state */
  @property({ type: Boolean }) accessor closable = false;

  /** determine the position relative to the anchor */
  @property({ type: String, reflect: true }) accessor position: Position = 'bottom';

  /** anchor element popover will positiion relative to */
  @property({ type: String }) accessor anchor: HTMLElement | string;

  /** determines if a visual backdrop should be rendered */
  @property({ type: Boolean }) accessor modal = false;

  @property({ type: Boolean }) accessor focusTrap = false;

  @property({ type: Boolean }) accessor arrow: boolean;

  /** set default aria/i18n strings */
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

// Declaration merging for strongly typed events
export interface BpPopover {
  addEventListener<K extends keyof BpPopoverEventMap>(
    type: K,
    listener: (this: BpPopover, ev: BpPopoverEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof BpPopoverEventMap>(
    type: K,
    listener: (this: BpPopover, ev: BpPopoverEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}
