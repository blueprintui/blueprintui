import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  interactionResponsive,
  baseStyles,
  i18n,
  I18nService,
  listenForAttributeChange,
  typePopover,
  TypePopoverController,
  stateDirection
} from '@blueprintui/components/internals';
import type { BpGrid } from '@blueprintui/grid/index.js';
import styles from './element.css' assert { type: 'css' };

/**
 * Grid Detail
 *
 * ```typescript
 * import '@blueprintui/grid-pro/include/detail.js';
 * ```
 *
 * @element bp-grid-detail
 * @event close
 * @csspart pointer
 * @csspart close
 * @cssprop --full-width-breakpoint
 * @cssprop --background
 */
@typePopover<BpGridDetail>((host: BpGridDetail) => ({
  focusTrap: true,
  trigger: host.trigger
}))
@i18n<BpGridDetail>({ key: 'actions' })
@stateDirection()
@interactionResponsive()
export class BpGridDetail extends LitElement {
  @property({ type: Object }) i18n = I18nService.keys.actions;

  @property({ type: String, reflect: true }) position: 'inline-start' | 'inline-end' = 'inline-end';

  @property({ type: String }) trigger: HTMLElement | string;

  @property({ type: Boolean }) closable: boolean;

  protected declare typePopoverController: TypePopoverController<this>;

  get #grid() {
    return this.parentElement as BpGrid;
  }

  #observer: MutationObserver;
  declare _internals: ElementInternals;

  get #trigger(): HTMLElement {
    return typeof this.trigger === 'string'
      ? ((this.getRootNode() as HTMLElement).querySelector<HTMLElement>(`#${this.trigger}`) as HTMLElement)
      : this.trigger;
  }

  get #triggerRow() {
    return this.#trigger?.closest('bp-grid-row');
  }

  get #fullWidthBreakpoint() {
    return parseInt(getComputedStyle(this).getPropertyValue('--full-width-breakpoint'));
  }

  static styles = [baseStyles, styles];

  render() {
    return html`
      <dialog part="internal" role="presentation">
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.#close}
              aria-label=${this.i18n.close}
              shape="close"
              type="button"></bp-button-icon>`
          : ''}
        <slot></slot>
      </dialog>
      ${this.trigger ? html`<div part="pointer" role="presentation"></div>` : ''}
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.slot = 'detail';
    this.#initializeResizeChange();
    this._internals.role = 'dialog';
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this.#alignPanel();
    this.#observer = listenForAttributeChange(this, 'hidden', () => this.#alignPanel());
  }

  async updated(props: PropertyValues) {
    super.updated(props);
    await this.updateComplete;

    if (props.has('trigger') && props.get('trigger') !== this.#trigger && !this.hidden) {
      this.#setTriggerPointer(props.get('trigger') as HTMLElement);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observer.disconnect();
  }

  #close() {
    this.typePopoverController.close();
  }

  #setTriggerPointer(previousAnchor?: HTMLElement) {
    if (previousAnchor?.closest) {
      previousAnchor?.closest('bp-grid-row')?.removeAttribute('_detail-row');
    }

    const top = this.#trigger?.getBoundingClientRect()?.top - this.getBoundingClientRect().top;
    this.style.setProperty('--pointer-top', `${top - 2}px`);
  }

  #initializeResizeChange() {
    this.addEventListener('resize-layout', (e: any) => {
      if (e.detail.width < this.#fullWidthBreakpoint) {
        this.setAttribute('full-width', '');
      } else if (e.detail.width > this.#fullWidthBreakpoint + parseInt(this.style.insetInlineStart)) {
        this.removeAttribute('full-width');
        this.#alignPanel();
      }
    });
  }

  async #alignPanel() {
    this.#grid.scrollLock = !this.hidden;
    await this.updateComplete;

    if (!this.hidden) {
      const rowheader = Array.from(this.#triggerRow ? this.#triggerRow.querySelectorAll<any>('bp-grid-cell') : []).find(
        c => c.role === 'rowheader'
      );
      if (rowheader) {
        const gridRect = this.#grid?.getBoundingClientRect();
        const cellRect = rowheader.getBoundingClientRect();
        this.style.width = 'auto';

        if (this.position === 'inline-start' || this.#grid?.getAttribute('dir') === 'rtl') {
          this.style.insetInlineStart = `${Math.floor(gridRect.right - cellRect.left)}px`;
        } else {
          this.style.insetInlineStart = `${Math.floor(cellRect.right - gridRect.left)}px`;
        }
      }
    }
  }
}
