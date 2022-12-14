import { LitElement, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, childrenUpdateComplete, elementVisible, interactionResponsive } from '@blueprintui/components/internals';
import { BpFieldset } from '../fieldset/element.js';
import { BpField } from '../field/element.js';
import styles from './element.css' assert { type: 'css' };
import { FormLayout } from '../utils/interfaces';

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
    return this.querySelectorAll<BpField>('[bp-field]');
  }

  get #groups() {
    return this.querySelectorAll<BpFieldset>('[bp-fieldset]');
  }

  #observers: (MutationObserver | ResizeObserver)[] = [];

  get #fieldsAndFieldsets() {
    return [...Array.from(this.#groups), ...Array.from(this.#fields)];
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
      'vertical': 0,
      'vertical-inline': 1,
      'horizontal': 2,
      'horizontal-inline': 3,
      'compact': 4
    };

    await this.updateComplete;
    this.#initialLayout = this.layout;
    this.addEventListener('bpResizeChange', e => {
      const width = (e as any).detail.width;
      if (width < 300) {
        this.layout = 'vertical';
      } else if (width < 400 && (weights[this.layout] > weights['vertical'])) {
        this.layout = 'vertical-inline';
      } else if (width < 500 && (weights[this.layout] > weights['vertical-inline'])) {
        this.layout = 'horizontal';
      } else if (width < 600 && (weights[this.layout] > weights['horizontal'])) {
        this.layout = 'horizontal-inline';
      } else if (width < 700 && (weights[this.layout] > weights['compact'])) {
        this.layout = 'compact';
      } else {
        this.layout = this.#initialLayout;
      }
    });
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this.#fieldsAndFieldsets.forEach(c => c.layout = this.layout);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observers.forEach(o => o.disconnect());
  }

  async #setControlLabelWidths() {
    if (this.layout === 'horizontal' || this.layout === 'horizontal-inline' || this.layout === 'compact') {
      await childrenUpdateComplete(this.#fieldsAndFieldsets);
      const width = `${Math.max(...Array.from(this.querySelectorAll('label')).map(c => c.getBoundingClientRect().width + 12))}px`;
      this.style.setProperty('--group-label-width', width);
    }
  }
}
