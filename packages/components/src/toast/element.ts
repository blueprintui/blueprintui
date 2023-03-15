import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  attachInternals,
  baseStyles,
  fade,
  i18n,
  I18nService,
  Position,
  typePopover,
  TypePopoverController,
  typePositioned
} from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

const statusIcon = {
  undefined: 'info-circle',
  accent: 'info-circle',
  success: 'check-circle',
  warning: 'warning',
  danger: 'exclamation-circle'
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
  @property({ type: Boolean, reflect: true }) closable = false;

  @property({ type: String, reflect: true }) position: Position = 'top';

  @property({ type: String }) anchor: HTMLElement | string;

  @property({ type: String }) trigger: HTMLElement | string;

  @property({ type: Object }) i18n = I18nService.keys.actions;

  @property({ type: String, reflect: true }) status: 'accent' | 'success' | 'warning' | 'danger';

  // eslint-disable-next-line
  @property({ type: Boolean, reflect: true }) hidden = false; // @lit-labs/motion

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  private declare typePopoverController: TypePopoverController<this>;

  render() {
    return html`
      <div part="internal">
        <dialog ${fade(this)}>
          <bp-icon part="icon" .shape=${statusIcon[this.status]} size="md"></bp-icon>
          <slot></slot>
          ${this.closable
            ? html`<bp-button-icon
                @click=${() => this.typePopoverController?.close()}
                part="close"
                shape="close"
                aria-label=${this.i18n.close}></bp-button-icon>`
            : ''}
        </dialog>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'alert';
  }
}
