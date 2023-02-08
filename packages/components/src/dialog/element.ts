import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, i18n, I18nService, layerStyles, Position, TypePopoverController, typePopover, typePositioned, stateScrollLock, attachRootNodeStyles } from '@blueprintui/components/internals';
import globalStyles from './element.global.css' assert { type: 'css' };
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/dialog.js';
 * ```
 *
 * ```html
 * <bp-dialog>
 * 
 * </bp-dialog>
 * ```
 *
 * @element bp-dialog
 * @slot - slot for dialog content
 * @slot header - slot for dialog header
 * @slot footer - slot for dialog footer
 * @cssprop --padding
 * @cssprop --filter
 * @cssprop --background
 * @cssprop --color
 * @cssprop --width
 * @cssprop --height
 * @cssprop --min-width
 * @cssprop --min-height
 * @cssprop --font-size
 * @cssprop --internal-offset-margin
 * @cssprop --animation-duration
 */
@stateScrollLock<BpDialog>()
@i18n<BpDialog>({ key: 'actions' })
@typePopover<BpDialog>(host => ({
  modal: host.modal,
  trigger: host.trigger,
  lightDismiss: host.modal || host.closable
}))
@typePositioned<BpDialog>(host => ({
  scroll: !host.modal,
  anchor: document.body,
  position: host.position,
  popover: host.shadowRoot.querySelector<HTMLElement>('dialog')
}))
export class BpDialog extends LitElement {
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg';

  @property({ type: String, reflect: true }) position: Position = 'center';

  @property({ type: Boolean, reflect: true }) closable = false;

  @property({ type: String }) trigger: HTMLElement | string;

  @property({ type: Boolean }) modal = false;

  @property({ type: Object }) i18n = I18nService.keys.actions;

  declare protected typePopoverController: TypePopoverController<this>;

  static styles = [baseStyles, layerStyles, styles];

  render() {
    return html`
      <div part="internal">
        <dialog layer hidden>
          ${this.closable ? html`<bp-button-icon @click=${() => this.typePopoverController.close()} aria-label=${this.i18n.close} shape="close" type="button"></bp-button-icon>` : ''}
          <slot name="header"></slot>
          <slot></slot>
          <slot name="footer"></slot>
        </dialog>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('bp-theme', 'layer');
    attachRootNodeStyles(this.parentNode, [globalStyles]);
  }
}
