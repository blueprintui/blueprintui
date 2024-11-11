import { html, LitElement, nothing, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  i18n,
  I18nService,
  interactionClose,
  assignedElements,
  attachInternals,
  typePopover,
  popoverStyles
} from '@blueprintui/components/internals';
import type { BpTypePopover, Position } from '@blueprintui/components/internals';
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
 * @element bp-dropdown
 * @since 1.0.0
 * @event open - dispatched when the dialog is opened
 * @event close - dispatched when the dialog is closed
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
@interactionClose<BpDropdown>()
@typePopover<BpDropdown>(host => ({
  trigger: host.trigger,
  anchor: host.anchor,
  closeOnScroll: true,
  type: 'auto'
}))
export class BpDropdown extends LitElement implements Pick<BpTypePopover, keyof BpDropdown> {
  /** determine the position relative to the anchor */
  @property({ type: String, reflect: true }) accessor position: Position = 'bottom';

  /** determine user closable state */
  @property({ type: Boolean }) accessor closable = false;

  /** the triggering element that opens the popover */
  @property({ type: String }) accessor trigger: HTMLElement | string;

  /** anchor element popover will positiion relative to */
  @property({ type: String }) accessor anchor: HTMLElement | string;

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static styles = [baseStyles, popoverStyles, styles];

  declare _internals: ElementInternals;

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
    attachInternals(this);
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
