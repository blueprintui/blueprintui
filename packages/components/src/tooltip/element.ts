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

/**
 * ```typescript
 * import '@blueprintui/components/include/tooltip.js';
 * ```
 *
 * ```html
 * <bp-tooltip></bp-tooltip>
 * ```
 *
 * @element bp-tooltip
 * @since 1.0.0
 * @event open - dispatched when the tooltip is opened
 * @event close - dispatched when the tooltip is closed
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
@i18n<BpTooltip>({ key: 'actions' })
@typePopover<BpTooltip>(host => ({
  trigger: host.trigger,
  triggerType: 'hint'
}))
@typePositioned<BpTooltip>(host => ({
  anchor: host.anchor,
  position: host.position,
  popover: host.shadowRoot.querySelector<HTMLElement>('dialog'),
  arrow: host.shadowRoot.querySelector<HTMLElement>('[part=arrow]')
}))
export class BpTooltip extends LitElement {
  /** determine user closable state */
  @property({ type: Boolean, reflect: true }) closable = false;

  @property({ type: String, reflect: true }) position: Position = 'top';

  @property({ type: String }) anchor: HTMLElement | string;

  @property({ type: String }) trigger: HTMLElement | string;

  /** set default aria/i18n strings */
  @property({ type: Object }) i18n = I18nService.keys.actions;

  // eslint-disable-next-line
  @property({ type: Boolean, reflect: true }) hidden = false; // @lit-labs/motion

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  private declare typePopoverController: TypePopoverController<this>;

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
        <div part="arrow"></div>
      </dialog>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'tooltip';
  }

  #close() {
    this.typePopoverController.close();
  }
}
