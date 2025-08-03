import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  attachInternals,
  attachRootNodeStyles,
  baseStyles,
  popoverStyles,
  i18n,
  I18nService,
  typePopover
} from '@blueprintui/components/internals';
import type { BpTypePopover, Position } from '@blueprintui/components/internals';
import globalStyles from './element.global.css' with { type: 'css' };
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/toggletip.js';
 * ```
 *
 * ```html
 * <bp-toggletip></bp-toggletip>
 * ```
 *
 * @summary The toggletip component is used to provide explanations, definitions, or supplementary interactions for a given element. It should be used to provide additional information or actions that are not essential to the user's understanding of the content, but that may be helpful or informative.
 * @element bp-toggletip
 * @since 1.0.0
 * @event open - dispatched when the toggletip is opened
 * @event close - dispatched when the toggletip is closed
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
@i18n<BpToggletip>({ key: 'actions' })
@typePopover<BpToggletip>(host => ({
  anchor: host.anchor,
  closeOnScroll: true,
  type: 'auto'
}))
export class BpToggletip extends LitElement implements Pick<BpTypePopover, keyof BpToggletip> {
  /** determine user closable state */
  @property({ type: Boolean }) accessor closable = false;

  /** default popover to open on intialization */
  @property({ type: Boolean, reflect: true }) accessor open = false;

  /** determine the position relative to the anchor */
  @property({ type: String, reflect: true }) accessor position: Position = 'top';

  /** anchor element popover will positiion relative to */
  @property({ type: String }) accessor anchor: HTMLElement | string;

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static styles = [baseStyles, popoverStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal" id="internal">
        <slot></slot>
        <slot name="footer"></slot>
      </div>
      <div part="arrow"></div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'tooltip';
    attachRootNodeStyles(this, [globalStyles]);
  }
}
