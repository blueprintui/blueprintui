import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, I18nService } from '@blueprintui/components/internals';
import { BpField } from '@blueprintui/components/forms';
import styles from './element.css' assert { type: 'css' };
import { BpButtonIcon } from '../button-icon';

/**
 * Pagination
 *
 * ```typescript
 * import '@blueprintui/components/include/pagination.js';
 * ```
 *
 * ```html
 * <bp-pagination>
 *   <bp-pagination-button action="first" disabled></bp-pagination-button>
 *   <bp-pagination-button action="prev" disabled></bp-pagination-button>
 *   <span aria-label="current page">1 / 3</span>
 *   <bp-pagination-button action="next"></bp-pagination-button>
 *   <bp-pagination-button action="last"></bp-pagination-button>
 * </bp-pagination>
 * ```
 *
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
  @property({ type: Object }) i18n = I18nService.keys.actions;

  get #field() {
    return this.querySelector<BpField>('bp-field');
  }

  static styles = [baseStyles, styles];

  render() {
    return html` <div part="internal">
      <slot name="page-size"></slot>
      <slot name="first"></slot>
      <slot name="prev"></slot>
      <slot></slot>
      <slot name="next"></slot>
      <slot name="last"></slot>
    </div>`;
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
    }

    if (last) {
      last.ariaLabel = this.i18n.last;
      last.shape = 'step-forward-2';
      last.direction = 'up';
    }

    if (prev) {
      prev.ariaLabel = this.i18n.previous;
      prev.shape = 'angle';
      prev.direction = 'left';
    }

    if (next) {
      next.ariaLabel = this.i18n.next;
      next.shape = 'angle';
      next.direction = 'right';
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
