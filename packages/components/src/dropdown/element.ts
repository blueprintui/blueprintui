import { html, LitElement, nothing, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  layerStyles,
  i18n,
  I18nService,
  interactionClose,
  TypePopoverController,
  typePopover,
  typePositioned,
  fade,
  assignedElements
} from '@blueprintui/components/internals';
import type { Position } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

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
  focusTrap: true,
  lightDismiss: true,
  closeOnScroll: true,
  trigger: host.trigger
}))
@typePositioned<BpDropdown>(host => ({
  anchor: host.anchor,
  position: host.position,
  popover: host.shadowRoot.querySelector<HTMLElement>('dialog')
}))
export class BpDropdown extends LitElement {
  @property({ type: String }) anchor: HTMLElement | string;

  @property({ type: String, reflect: true }) position: Position = 'bottom';

  /** determine user closable state */
  @property({ type: Boolean, reflect: true }) closable = false;

  @property({ type: String }) trigger: HTMLElement | string;

  /** set default aria/i18n strings */
  @property({ type: Object }) i18n = I18nService.keys.actions;

  // eslint-disable-next-line
  @property({ type: Boolean, reflect: true }) hidden = false; // @lit-labs/motion

  protected declare typePopoverController: TypePopoverController<this>;

  static styles = [baseStyles, layerStyles, styles];

  render() {
    return html`
      <dialog ${fade(this)} part="internal">
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.#close}
              aria-label=${this.i18n.close}
              shape="close"
              type="button"></bp-button-icon>`
          : nothing}
        <div class="content">
          <slot></slot>
        </div>
      </dialog>
    `;
  }

  protected firstUpdated(props: PropertyValueMap<this>) {
    super.firstUpdated(props);
    this.#setMenu();
    this.addEventListener('slotchange', () => this.#setMenu());
    this.setAttribute('bp-theme', 'layer');
  }

  #setMenu() {
    this.toggleAttribute('_menu', !!assignedElements(this).find(i => i.tagName === 'BP-MENU'));
  }

  #close() {
    this.typePopoverController.close();
  }
}
