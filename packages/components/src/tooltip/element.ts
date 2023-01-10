import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles, i18n, I18nService, Position, typePopover, TypePopoverController, typePositioned } from '@blueprintui/components/internals';
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
  triggerType: 'hint',
}))
@typePositioned<BpTooltip>(host => ({
  anchor: host.anchor,
  position: host.position,
  popover: host.shadowRoot.querySelector<HTMLElement>('dialog'),
  arrow: host.shadowRoot.querySelector<HTMLElement>('[part=arrow]')
}))
export class BpTooltip extends LitElement {
  @property({ type: Boolean, reflect: true }) closable = false;

  @property({ type: String, reflect: true }) position: Position = 'top';
  
  @property({ type: String }) anchor: HTMLElement | string;

  @property({ type: String }) trigger: HTMLElement | string;

  @property({ type: Object }) i18n = I18nService.keys.actions;

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  declare private typePopoverController: TypePopoverController<this>;

  render() {
    return html`
      <div part="internal">
        <dialog hidden>
          ${this.closable ? html`<bp-button-icon @click=${() => this.typePopoverController.close()} aria-label=${this.i18n.close} shape="close" type="button"></bp-button-icon>` : ''}
          <div class="content">
            <slot></slot>
          </div>
          <div part="arrow"></div>
        </dialog>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'tooltip';
  }
}
