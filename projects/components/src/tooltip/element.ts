import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  popoverStyles,
  attachInternals,
  i18n,
  I18nService,
  typePopover
} from '@blueprintui/components/internals';
import type { BpTypePopover, Position } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/tooltip.js';
 * ```
 *
 * ```html
 * <bp-tooltip></bp-tooltip>
 * ```
 *
 * @summary The tooltip component is used to provide additional information to the user when they hover over a specific element. It can be used to provide explanations, definitions, or supplementary information that is not critical to the main content.
 * @element bp-tooltip
 * @since 1.0.0
 * @event open - dispatched when the tooltip is opened
 * @event close - dispatched when the tooltip is closed
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
@i18n<BpTooltip>({ key: 'actions' })
@typePopover<BpTooltip>(host => ({
  anchor: host.anchor,
  closeOnScroll: true,
  open: host.open,
  type: 'hint'
}))
export class BpTooltip extends LitElement implements Pick<BpTypePopover, keyof BpTooltip> {
  /** Determines whether a close button is displayed for dismissing the tooltip */
  @property({ type: Boolean }) accessor closable = false;

  /** Controls whether the tooltip is visible on initialization */
  @property({ type: Boolean, reflect: true }) accessor open = false;

  /** Specifies the position of the tooltip relative to its anchor element */
  @property({ type: String, reflect: true }) accessor position: Position = 'top';

  /** Defines the anchor element or selector that the tooltip will position relative to */
  @property({ type: String }) accessor anchor: HTMLElement | string;

  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static styles = [baseStyles, popoverStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal" id="internal">
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
      </div>
      <div part="arrow"></div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'tooltip';
  }
}
