import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, typePositioned, Position, typeClosable, typePopover, I18nService, i18n, TypePopoverController } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/popover.js';
 * ```
 *
 * ```html
 * <bp-popover>
 * 
 * </bp-popover>
 * ```
 *
 * @element bp-popover
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
@i18n<BpPopover>({ key: 'actions' })
@typeClosable<BpPopover>()
@typePopover<BpPopover>(host => ({
  modal: host.modal,
  trigger: host.trigger,
  focusTrap: host.focusTrap
}))
@typePositioned<BpPopover>(host => ({
  position: host.position,
  anchor: host.anchor,
  popover: host.shadowRoot.querySelector<HTMLElement>('dialog'),
  arrow: host.shadowRoot.querySelector<HTMLElement>('[part=arrow]')
}))
export class BpPopover extends LitElement {
  static styles = [baseStyles, styles];

  @property({ type: Boolean, reflect: true }) closable = false;

  @property({ type: String, reflect: true }) position: Position = 'bottom';

  @property({ type: String }) anchor?: HTMLElement | string;

  @property({ type: String }) trigger: HTMLElement | string;

  @property({ type: Boolean }) modal = false;

  @property({ type: Boolean }) focusTrap = false;

  @property({ type: Boolean }) arrow: boolean;

  @property({ type: Object }) i18n = I18nService.keys.actions;

  declare protected typePopoverController: TypePopoverController<this>;

  render() {
    return html`
      <div part="internal">
        <dialog hidden>
          ${this.closable ? html`<bp-button-icon @click=${() => this.typePopoverController.close()} aria-label=${this.i18n.close} shape="close" type="button"></bp-button-icon>` : ''}
          <slot name="header"></slot>
          <div class="content">
            <slot></slot>
          </div>
          <slot name="footer"></slot>
          ${this.arrow ? html`<div part="arrow"></div>` : ''}
        </dialog>
      </div>
    `;
  }
}