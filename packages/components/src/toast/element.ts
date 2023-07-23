import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  attachInternals,
  baseStyles,
  fade,
  i18n,
  I18nService,
  typePopover,
  TypePopoverController,
  typePositioned
} from '@blueprintui/components/internals';
import type { Position } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

const statusIcon = {
  undefined: 'info',
  accent: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error'
};

/**
 * ```typescript
 * import '@blueprintui/components/include/toast.js';
 * ```
 *
 * ```html
 * <bp-toast></bp-toast>
 * ```
 *
 * @element bp-toast
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
@i18n<BpToast>({ key: 'actions' })
@typePopover<BpToast>(host => ({
  trigger: host.trigger
}))
@typePositioned<BpToast>(host => ({
  position: host.position,
  anchor: host.anchor,
  popover: host.shadowRoot.querySelector<HTMLElement>('dialog'),
  arrow: host.shadowRoot.querySelector<HTMLElement>('[part=arrow]')
}))
export class BpToast extends LitElement {
  /** determine user closable state */
  @property({ type: Boolean, reflect: true }) closable = false;

  @property({ type: String, reflect: true }) position: Position = 'top';

  @property({ type: String }) anchor: HTMLElement | string;

  @property({ type: String }) trigger: HTMLElement | string;

  /** set default aria/i18n strings */
  @property({ type: Object }) i18n = I18nService.keys.actions;

  /** determine the visual status state */
  @property({ type: String, reflect: true }) status: 'accent' | 'success' | 'warning' | 'danger';

  // eslint-disable-next-line
  @property({ type: Boolean, reflect: true }) hidden = false; // @lit-labs/motion

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  private declare typePopoverController: TypePopoverController<this>;

  render() {
    return html`
      <dialog ${fade(this)} part="internal">
        <bp-icon part="icon" .shape=${statusIcon[this.status]} size="md"></bp-icon>
        <slot></slot>
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.#close}
              part="close"
              shape="close"
              aria-label=${this.i18n.close}></bp-button-icon>`
          : nothing}
      </dialog>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'alert';
  }

  #close() {
    this.typePopoverController.close();
  }
}
