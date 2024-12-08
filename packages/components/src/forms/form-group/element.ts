import { LitElement, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { assignedElements, baseStyles, elementVisible, interactionResponsive } from '@blueprintui/components/internals';
import { BpFieldset } from '../fieldset/element.js';
import { BpField } from '../field/element.js';
import type { FormLayout } from '../utils/interfaces.js';
import styles from './element.css' with { type: 'css' };

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
 * @since 1.0.0
 * @slot - For projecting input fields
 * @cssprop --label-width
 */
@interactionResponsive<BpFormGroup>()
export class BpFormGroup extends LitElement {
  /** @type {horizontal | horizontal-inline | vertical | vertical-inline | compact} */
  @property({ type: String, reflect: true }) accessor layout: FormLayout = 'vertical';

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

  async firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this.#internals.role = 'group';
    this.#setControlLabelWidths();
    this.#observers.push(elementVisible(this, () => this.#setControlLabelWidths()));
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
