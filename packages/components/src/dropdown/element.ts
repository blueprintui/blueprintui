import { html, LitElement, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  i18n,
  I18nService,
  Position,
  typeClosable,
  TypePopoverController,
  typePopover,
  typePositioned,
  fade
} from '@blueprintui/components/internals';
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
@typeClosable<BpDropdown>()
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

  @property({ type: Boolean, reflect: true }) closable = false;

  @property({ type: String }) trigger: HTMLElement | string;

  @property({ type: Object }) i18n = I18nService.keys.actions;

  // eslint-disable-next-line
  @property({ type: Boolean, reflect: true }) hidden = false; // @lit-labs/motion

  protected declare typePopoverController: TypePopoverController<this>;

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="internal">
        <dialog layer ${fade(this)}>
          ${this.closable
            ? html`<bp-button-icon
                @click=${() => this.typePopoverController.close()}
                aria-label=${this.i18n.close}
                shape="close"
                type="button"></bp-button-icon>`
            : ''}
          <div class="content">
            <slot></slot>
          </div>
        </dialog>
      </div>
    `;
  }

  protected firstUpdated(props: PropertyValueMap<this>) {
    super.firstUpdated(props);
    this.#setMenu();
    this.addEventListener('slotchange', () => this.#setMenu());
    this.setAttribute('bp-theme', 'layer');
  }

  #setMenu() {
    this.querySelectorAll('bp-menu').length > 0 ? this.setAttribute('_menu', '') : this.removeAttribute('_menu');
  }
}
