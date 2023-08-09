import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  i18n,
  I18nService,
  layerStyles,
  TypePopoverController,
  typePopover,
  typePositioned,
  stateScrollLock,
  attachRootNodeStyles,
  fade
} from '@blueprintui/components/internals';
import type { Position } from '@blueprintui/components/internals';
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
 * @event open - dispatched when the dialog is opened
 * @event close - dispatched when the dialog is closed
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
  /** determine the visual size state */
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg';

  /** determine the position relative to the viewport */
  @property({ type: String, reflect: true }) position: Position = 'center';

  /** determine user closable state */
  @property({ type: Boolean, reflect: true }) closable = false;

  /** the triggering element that opens the popover */
  @property({ type: String }) trigger: HTMLElement | string;

  /** determine if dialog is modal with a backdrop layer */
  @property({ type: Boolean }) modal = false;

  /** set default aria/i18n strings */
  @property({ type: Object }) i18n = I18nService.keys.actions;

  // eslint-disable-next-line
  @property({ type: Boolean, reflect: true }) hidden = false; // @lit-labs/motion

  protected declare typePopoverController: TypePopoverController<this>;

  static styles = [baseStyles, layerStyles, styles];

  render() {
    return html`
      <dialog layer ${fade(this)} part="internal">
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.#close}
              aria-label=${this.i18n.close}
              shape="close"
              type="button"></bp-button-icon>`
          : nothing}
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </dialog>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('bp-theme', 'layer');
    attachRootNodeStyles(this.parentNode, [globalStyles]);
  }

  #close() {
    this.typePopoverController.close();
  }
}
