import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles, I18nService } from '@blueprintui/components/internals';
import { BpField } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };
import { BpButtonIcon } from '../button-icon';

/**
 * ```typescript
 * import '@blueprintui/components/include/pagination.js';
 * ```
 *
 * ```html
 * <bp-pagination aria-label="pagination">
 *   <bp-button-icon slot="first"></bp-button-icon>
 *   <bp-button-icon slot="prev"></bp-button-icon>
 *   <span aria-label="current page">1 / 3</span>
 *   <bp-button-icon slot="next"></bp-button-icon>
 *   <bp-button-icon slot="last"></bp-button-icon>
 * </bp-pagination>
 * ```
 *
 * @summary The Pagination component is used to navigate through a large number of pages. It allows users to easily switch between pages by clicking on page numbers or navigating to the first, previous, next, or last page.
 * @element bp-pagination
 * @since 1.0.0
 * @slot
 * @slot first
 * @slot next
 * @slot prev
 * @slot last
 * @cssprop --gap
 */
export class BpPagination extends LitElement {
  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  get #field() {
    return this.querySelector<BpField>('bp-field');
  }

  static styles = [baseStyles, styles];

  /** @private */
  _internals: ElementInternals;

  render() {
    return html`<div part="internal">
      <slot name="page-size"></slot>
      <slot name="first"></slot>
      <slot name="prev"></slot>
      <slot></slot>
      <slot name="next"></slot>
      <slot name="last"></slot>
    </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this.#setupField();
    this.#setupButtons();
  }

  #setupButtons() {
    const first = this.querySelector<BpButtonIcon>('[slot=first]');
    const last = this.querySelector<BpButtonIcon>('[slot=last]');
    const prev = this.querySelector<BpButtonIcon>('[slot=prev]');
    const next = this.querySelector<BpButtonIcon>('[slot=next]');

    if (first) {
      first.ariaLabel = this.i18n.first;
      first.shape = 'step-forward-2';
      first.direction = 'down';
      first.action = 'flat';
    }

    if (last) {
      last.ariaLabel = this.i18n.last;
      last.shape = 'step-forward-2';
      last.direction = 'up';
      last.action = 'flat';
    }

    if (prev) {
      prev.ariaLabel = this.i18n.previous;
      prev.shape = 'angle';
      prev.direction = 'left';
      prev.action = 'flat';
    }

    if (next) {
      next.ariaLabel = this.i18n.next;
      next.shape = 'angle';
      next.direction = 'right';
      next.action = 'flat';
    }
  }

  #setupField() {
    const field = this.#field;
    if (field) {
      field.controlWidth = 'shrink';
      field.layout = 'compact';
    }
  }
}
