import { LitElement, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { assignedElements, baseStyles, elementVisible, interactionResponsive } from '@blueprintui/components/internals';
import { BpFieldset } from '../fieldset/element.js';
import { BpField } from '../field/element.js';
import type { FormLayout } from '../utils/interfaces.js';
import styles from './element.css' assert { type: 'css' };

/**
 * Form
 *
 * ```typescript
 * import '@blueprintui/components/include/forms.js';
 * ```
 *
 * ```html
 * <bp-form-group layout="horizontal">
 *   <bp-input>
 *     <label>Test</label>
 *     <input type="text" />
 *   </bp-input>
 *
 *   <bp-input>
 *     <label>Test</label>
 *     <input type="text" />
 *   </bp-input>
 * </bp-form-group>
 * ```
 *
 * @element bp-form-group
 * @slot - For projecting input fields
 * @cssprop --label-width
 */
@interactionResponsive<BpFormGroup>()
export class BpFormGroup extends LitElement {
  /** @type {horizontal | horizontal-inline | vertical | vertical-inline | compact} */
  @property({ type: String, reflect: true }) layout: FormLayout = 'vertical';

  get #fields() {
    return assignedElements<BpField>(this).filter(i => i.hasAttribute('bp-field'));
  }

  get #groups() {
    return assignedElements<BpFieldset>(this).filter(i => i.hasAttribute('bp-fieldset'));
  }

  #observers: (MutationObserver | ResizeObserver)[] = [];

  get #fieldsAndFieldsets() {
    return [...this.#groups, ...this.#fields];
  }

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }

  #internals = this.attachInternals();
  #initialLayout: FormLayout;

  async firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this.#internals.role = 'group';
    this.#setControlLabelWidths();
    this.#observers.push(elementVisible(this, () => this.#setControlLabelWidths()));

    const weights = {
      vertical: 0,
      'vertical-inline': 1,
      horizontal: 2,
      'horizontal-inline': 3,
      compact: 4
    };

    await this.updateComplete;
    this.#initialLayout = this.layout;
    this.addEventListener('resize-layout', e => {
      const width = (e as CustomEvent<{ width: number }>).detail.width;
      // responsive mutations
      if (width < 300) {
        this.layout = 'vertical'; // eslint-disable-line
      } else if (width < 400 && weights[this.layout] > weights['vertical']) {
        this.layout = 'vertical-inline'; // eslint-disable-line
      } else if (width < 500 && weights[this.layout] > weights['vertical-inline']) {
        this.layout = 'horizontal'; // eslint-disable-line
      } else if (width < 600 && weights[this.layout] > weights['horizontal']) {
        this.layout = 'horizontal-inline'; // eslint-disable-line
      } else if (width < 700 && weights[this.layout] > weights['compact']) {
        this.layout = 'compact'; // eslint-disable-line
      } else {
        this.layout = this.#initialLayout; // eslint-disable-line
      }
    });
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this.#fieldsAndFieldsets.forEach(c => (c.layout = this.layout));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observers.forEach(o => o.disconnect());
  }

  async #setControlLabelWidths() {
    if (this.layout === 'horizontal' || this.layout === 'horizontal-inline' || this.layout === 'compact') {
      await Promise.all(Array.from(this.#fieldsAndFieldsets).map(e => e.updateComplete));
      const width = `${Math.max(
        ...Array.from(this.querySelectorAll('label')).map(c => c.getBoundingClientRect().width + 12)
      )}px`;
      this.style.setProperty('--group-label-width', width);
    }
  }
}
