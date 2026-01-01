import { html, LitElement, nothing, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  i18n,
  I18nService,
  assignedElements,
  PopoverMixin,
  popoverStyles
} from '@blueprintui/components/internals';
import type { Position } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/dropdown.js';
 * ```
 *
 * ```html
 * <bp-dropdown closable>
 *
 * </bp-dropdown>
 * ```
 *
 * @summary The dropdown are a is a generic popup component that can be positioned relative to an anchor element.
 * @element bp-dropdown
 * @since 1.0.0
 * @event open - dispatched when the dialog is opened
 * @event close - dispatched when the dialog is closed
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
@i18n<BpDropdown>({ key: 'actions' })
export class BpDropdown extends PopoverMixin(LitElement) {
  /** Controls the position of the dropdown relative to its anchor element */
  @property({ type: String, reflect: true }) accessor position: Position = 'bottom';

  /** Controls whether the dropdown displays a close button, allowing users to dismiss it */
  @property({ type: Boolean }) accessor closable = false;

  /** Provides internationalization strings for accessibility labels and screen reader announcements */
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
      <div part="internal">
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.hidePopover}
              aria-label=${this.i18n.close}
              shape="close"
              action="flat"
              type="button"></bp-button-icon>`
          : nothing}
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.states.add('bp-layer');
  }

  protected firstUpdated(props: PropertyValueMap<this>) {
    super.firstUpdated(props);
    this.#setMenu();
    this.addEventListener('slotchange', () => this.#setMenu());
  }

  #setMenu() {
    this.toggleAttribute('_menu', !!assignedElements(this).find(i => i.tagName === 'BP-MENU'));
  }
}
