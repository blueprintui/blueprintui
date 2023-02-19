import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { keynav } from '@blueprintui/typewriter';
import { associateAriaDescribedBy, associateFieldNames, associateInputAndLabel, baseStyles, createId, interactionResponsive } from '@blueprintui/components/internals';
import { BpFieldMessage } from '../field-message/element.js';
import { FormLayout } from '../utils/interfaces.js';
import styles from './element.css' assert { type: 'css' };

/**
 * Control Group
 *
 * ```typescript
 * import '@blueprintui/components/include/forms.js';
 * ```
 *
 * ```html
 * <bp-fieldset>
 *   <label>...</label>
 *
 *   <label></label>
 *   <input ... />
 *
 *   <label></label>
 *   <input ... />
 * </bp-fieldset>
 * ```
 *
 * @element bp-fieldset
 * @property layoutChange
 * @slot
 */
@interactionResponsive<BpFieldset>()
@keynav<BpFieldset>(host => ({ loop: true, direction: 'all', grid: host.associatedItems.map(i => [i]) }))
export class BpFieldset extends LitElement {
  @property({ type: Boolean, reflect: true }) responsive = true;

  @property({ type: String, reflect: true }) layout: FormLayout = 'vertical';

  get #inputs() {
    return Array.from(this.querySelectorAll<HTMLInputElement>('[bp-field], input, bp-radio, bp-checkbox, bp-switch'));
  }

  get #labels() {
    return Array.from(this.querySelectorAll<HTMLLabelElement>('label'));
  }

  get #messages() {
    return this.querySelectorAll<BpFieldMessage>('bp-field-message');
  }

  protected get associatedItems() {
    return this.#isAssociatedGroup ? this.#inputs : [];
  }

  get #isAssociatedGroup() {
    const inputs = this.#inputs;
    const isAssociated = !!inputs.filter(i => i !== inputs[0] && i.name?.length).find(i => i.name === inputs[0].name);
    const isRadio = inputs.every(i => i.tagName === 'BP-RADIO' || i.type === 'radio');
    return isAssociated || isRadio;
  }

  get #isInlineGroup() {
    return !!this.#inputs.find(i => i.getAttribute('bp-field') === 'inline' || i.tagName === 'BP-SWITCH' || i.tagName === 'BP-CHECKBOX'  || i.tagName === 'BP-RADIO');
  }

  static styles = [baseStyles, styles];

  /** @private */
  _internals = this.attachInternals();

  render() {
    return html`
      <div part="internal" class="${this.#messages?.length ? '' : 'no-message'} ${this.#isInlineGroup ? 'inline-group' : ''}">
        <slot name="label"></slot>
        <div class="input-slot-group">
          ${this.#inputs.map((_i, i) => html`<slot name="input-${i}"></slot>`)}
          <slot></slot>
        </div>
        <slot name="message" @slotchange=${() => associateAriaDescribedBy(this, Array.from(this.#messages))}></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('bp-fieldset', '');
    this._internals.role = 'group';
    this.addEventListener('bp-keychange', (e: any) => e.detail.activeItem.click());
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);

    this.#labels[0].slot = 'label';

    if (!this.#labels[0].id) {
      this.#labels[0].id = createId();
      this.setAttribute('aria-labelledby', this.#labels[0].id);
    }

    if (this.#isAssociatedGroup) {
      this._internals.role = 'radiogroup';
      associateFieldNames(Array.from(this.#inputs));
    }

    const labels = [...this.#labels];
    const inputs = [...this.#inputs];
    labels.shift();
    labels.forEach((l, i) => {
      associateInputAndLabel(inputs[i], l);
      l.slot = `input-${i}`;
      inputs[i].slot = `input-${i}`;
    });
  }
}
