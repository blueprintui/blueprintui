import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  attachInternals,
  baseStyles,
  i18n,
  I18nService,
  typePopover,
  typePositioned
} from '@blueprintui/components/internals';
import type { Position } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/tooltip.js';
 * ```
 *
 * ```html
 * <bp-tooltip></bp-tooltip>
 * ```
 *
 * @element bp-tooltip
 * @since 1.0.0
 * @event open - dispatched when the tooltip is opened
 * @event close - dispatched when the tooltip is closed
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
@i18n<BpTooltip>({ key: 'actions' })
@typePopover<BpTooltip>(host => ({
  trigger: host.trigger,
  open: host.open,
  type: 'hint'
}))
@typePositioned<BpTooltip>(host => ({
  anchor: host.anchor,
  position: host.position,
  popover: host,
  open: host.open,
  arrow: host.shadowRoot.querySelector<HTMLElement>('[part=arrow]')
}))
export class BpTooltip extends LitElement {
  // implements Pick<BpTypePopover, keyof BpTooltip>
  /** determine user closable state */
  @property({ type: Boolean }) accessor closable = false;

  @property({ type: Boolean, reflect: true }) accessor open = false;

  @property({ type: String, reflect: true }) accessor position: Position = 'top';

  @property({ type: String }) accessor anchor: HTMLElement | string;

  /** the triggering element that opens the popover */
  @property({ type: String }) accessor trigger: HTMLElement | string;

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.hidePopover}
              aria-label=${this.i18n.close}
              shape="close"
              action="inline"
              type="button"></bp-button-icon>`
          : nothing}
        <div class="content">
          <slot></slot>
        </div>
        <div part="arrow"></div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'tooltip';
  }
}
