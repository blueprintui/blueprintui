import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  attachRootNodeStyles,
  baseStyles,
  popoverStyles,
  i18n,
  I18nService,
  PopoverMixin
} from '@blueprintui/components/internals';
import type { Position } from '@blueprintui/components/internals';
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
export class BpToggletip extends PopoverMixin(LitElement) {
  /** Determines whether a close button is displayed for dismissing the toggletip */
  @property({ type: Boolean }) accessor closable = false;

  /** Specifies the position of the toggletip relative to its anchor element */
  @property({ type: String, reflect: true }) accessor position: Position = 'top';

  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static styles = [baseStyles, popoverStyles, styles];

  get popoverConfig() {
    return {
      type: 'auto',
      focusTrap: false,
      scrollLock: false,
      modal: false
    } as const;
  }

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
    this._internals.role = 'tooltip';
    attachRootNodeStyles(this, [globalStyles]);
  }
}
