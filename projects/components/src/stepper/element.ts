import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { keynav } from '@blueprintui/typewriter';
import { typeNavigation, baseStyles, attachInternals, BpTypeElement } from '@blueprintui/components/internals';
import type { BpStepperItem } from './item/element.js';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/stepper.js';
 * ```
 *
 * ```html
 * <bp-stepper aria-label="stepper">
 *   <bp-stepper-item selected><a href="#">Step 1</a></bp-stepper-item>
 *   <bp-stepper-item>Step 2</bp-stepper-item>
 *   <bp-stepper-item>Step 3</bp-stepper-item>
 * </bp-stepper>
 * ```
 *
 * @summary Stepper components guide users through a multi-step process, breaking it down into manageable parts. This increases understanding, reduces cognitive load, and enhances the overall user experience.
 * @element bp-stepper
 * @since 1.0.0
 * @slot - stepper items
 * @cssprop --font-size
 * @cssprop --font-weight
 * @cssprop --color
 * @cssprop --gap
 */
@typeNavigation<BpStepper>()
@keynav<BpStepper>(host => ({ grid: [host.items], loop: true }))
export class BpStepper extends LitElement implements Pick<BpTypeElement, keyof Omit<BpStepper, 'items'>> {
  @property({ type: String, reflect: true }) accessor layout: 'horizontal' | 'vertical' = 'horizontal';

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  get items() {
    return Array.from(this.shadowRoot.querySelector('slot').assignedElements()) as BpStepperItem[];
  }

  render() {
    return html`
      <div part="internal">
        <slot @slotchange=${this.#updateItems}></slot>
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'list';
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this.#updateItems();
  }

  #updateItems() {
    this.items.forEach((item, i) => {
      item._layout = this.layout;
      item._index = i + 1;
    });
  }
}
