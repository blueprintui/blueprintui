import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  attachInternals,
  attachRootNodeStyles,
  baseStyles,
  i18n,
  I18nService,
  typePopover,
  typePositioned
} from '@blueprintui/components/internals';
import type { Position } from '@blueprintui/components/internals';
import globalStyles from './element.global.css' assert { type: 'css' };
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/toggletip.js';
 * ```
 *
 * ```html
 * <bp-toggletip></bp-toggletip>
 * ```
 *
 * @element bp-toggletip
 * @since 1.0.0
 * @event open - dispatched when the toggletip is opened
 * @event close - dispatched when the toggletip is closed
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
@i18n<BpToggletip>({ key: 'actions' })
@typePopover<BpToggletip>(host => ({
  trigger: host.trigger,
  closeOnScroll: true,
  type: 'auto'
}))
@typePositioned<BpToggletip>(host => ({
  anchor: host.anchor,
  position: host.position,
  popover: host,
  open: host.open,
  arrow: host.shadowRoot.querySelector<HTMLElement>('[part=arrow]')
}))
export class BpToggletip extends LitElement {
  // implements Pick<BpTypePopover, keyof BpToggletip>
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
        <slot></slot>
        <slot name="footer"></slot>
        <div part="arrow"></div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'tooltip';
    attachRootNodeStyles(this.parentNode, [globalStyles]);
  }
}
