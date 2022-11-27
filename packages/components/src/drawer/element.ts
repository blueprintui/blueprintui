import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, elevationStyles, I18nService, layerStyles, typeClosable, TypePopoverController, typePopover, typePositioned, stateScrollLock } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/drawer.js';
 * ```
 *
 * ```html
 * <bp-drawer></bp-drawer>
 * ```
 *
 * @element bp-drawer
 * @slot - content
 */
@stateScrollLock<BpDrawer>()
@typePopover<BpDrawer>(() => ({ type: 'auto' }))
@typePositioned<BpDrawer>(host => ({
  popover: host.shadowRoot.querySelector('dialog'),
  anchor: document.body,
  position: host.position,
  anchorOffset: 0,
  scroll: false,
  flip: false
}))
@typeClosable<BpDrawer>()
export class BpDrawer extends LitElement {
  @property({ type: Boolean }) closable = false;

  @property({ type: Boolean, reflect: true }) dismissible = true;

  @property({ type: Boolean }) static = false;

  @property({ type: String, reflect: true }) position: 'left' | 'right' = 'left';

  @property({ type: String, reflect: true }) elevation: 'raised' | 'flat';

  @property({ type: Object }) i18n = I18nService.keys.actions;

  declare private typePopoverController: TypePopoverController<this>;

  static styles = [baseStyles, elevationStyles, layerStyles, styles];

  render() {
    return html`
    <dialog elevation layer hidden>
      ${this.closable ? html`<bp-button-icon @click=${() => this.typePopoverController.close()} aria-label=${this.i18n.close} shape="close" type="button"></bp-button-icon>` : ''}
      <slot></slot>
    </dialog>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('bp-theme', 'layer');
  }
}