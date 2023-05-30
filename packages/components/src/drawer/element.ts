import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  I18nService,
  layerStyles,
  typeClosable,
  TypePopoverController,
  typePopover,
  typePositioned,
  stateScrollLock
} from '@blueprintui/components/internals';
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
 * @slot - slot for drawer content
 * @cssprop --background: var(--bp-layer-container-background);
 * @cssprop --padding
 * @cssprop --width
 * @cssprop --height
 * @cssprop --overflow
 */
@stateScrollLock<BpDrawer>()
@typePopover<BpDrawer>(host => ({
  modal: true,
  lightDismiss: host.closable
}))
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
  /** determine user closable state */
  @property({ type: Boolean }) closable = false;

  @property({ type: Boolean }) static = false;

  @property({ type: String, reflect: true }) position: 'left' | 'right' = 'left';

  /** set default aria/i18n strings */
  @property({ type: Object }) i18n = I18nService.keys.actions;

  private declare typePopoverController: TypePopoverController<this>;

  static styles = [baseStyles, layerStyles, styles];

  render() {
    return html`
      <dialog layer hidden>
        ${this.closable
          ? html`<bp-button-icon
              @click=${() => this.typePopoverController.close()}
              aria-label=${this.i18n.close}
              shape="close"
              type="button"></bp-button-icon>`
          : ''}
        <slot></slot>
      </dialog>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('bp-theme', 'layer');
  }
}
