import { html, LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  interactionResponsive,
  associateInputAndLabel,
  associateInputToDatalist,
  associateAriaDescribedBy,
  listenForAttributeListChange,
  attachInternals
} from '@blueprintui/components/internals';
import { BpFieldMessage } from '../field-message/element.js';
import { syncValidationMessages, updateFieldStatusState } from '../utils/utils.js';
import type { ControlLayout } from '../utils/interfaces.js';
import styles from './element.css' with { type: 'css' };

/**
 *
 * ```typescript
 * import '@blueprintui/components/include/forms.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>field</label>
 *   <input type="text" />
 * </bp-field>
 * ```
 *
 * @element bp-field
 * @since 1.0.0
 * @slot
 * @cssprop --background
 */
@interactionResponsive<BpField>()
export class BpField extends LitElement {
  @property({ type: String, reflect: true }) accessor layout: ControlLayout = 'vertical';

  @property({ type: String, reflect: true, attribute: 'control-width' }) accessor controlWidth: 'shrink';

  static styles = [baseStyles, styles];

  get inputControl() {
    return this.querySelector<HTMLInputElement>('*:not(label):not(bp-field-message)');
  }

  get #label() {
    return this.querySelector('label');
  }

  get #messages() {
    return this.querySelectorAll<BpFieldMessage>('bp-field-message');
  }

  get #datalist() {
    return this.querySelector<HTMLDataListElement>('datalist');
  }

  get #isInline() {
    return (
      this.inputControl.getAttribute('bp-field') === 'inline' ||
      this.inputControl.tagName === 'BP-CHECKBOX' ||
      this.inputControl.tagName === 'BP-SWITCH'
    );
  }

  protected get prefixTemplate(): TemplateResult | null {
    return null;
  }

  protected get suffixTemplate(): TemplateResult | null {
    return null;
  }

  /** @private */
  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        ${this.#label ? html`<slot name="label"></slot>` : nothing}
        <div class="input-container">
          ${this.prefixTemplate}
          <slot class="input-slot"></slot>
          ${this.suffixTemplate}
        </div>
        ${this.#messages?.length ? html`<slot name="message"></slot>` : nothing}
        ${this.#datalist ? html`<slot name="datalist"></slot>` : nothing}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this.setAttribute('bp-field', '');
  }

  async firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    await this.updateComplete;
    this.inputControl.setAttribute('input', '');
    this.#label ? (this.#label.slot = 'label') : null;
    this.#datalist ? (this.#datalist.slot = 'datalist') : null;
    this.#updateSlotState();
    updateFieldStatusState(this, Array.from(this.#messages));
    syncValidationMessages(this, Array.from(this.#messages));
    associateInputAndLabel(this.inputControl, this.#label);
    associateInputToDatalist(this.inputControl, this.#datalist);
    associateAriaDescribedBy(this.inputControl, Array.from(this.#messages));

    this.shadowRoot.addEventListener('slotchange', (e: any) => {
      this.#updateSlotState();

      if (e.target.name === 'label') {
        associateInputAndLabel(this.inputControl, this.#label);
      } else if (e.target.name === 'datalist') {
        associateInputToDatalist(this.inputControl, this.#datalist);
      } else if (e.target.name === 'message') {
        associateAriaDescribedBy(this.inputControl, Array.from(this.#messages));
        updateFieldStatusState(this, Array.from(this.#messages));
      }
    });

    listenForAttributeListChange(this, ['hidden', 'status'], ({ target }) => {
      if ((target as HTMLElement).tagName === 'bp-field-message') {
        updateFieldStatusState(this, Array.from(this.#messages));
      }
    });
  }

  #updateSlotState() {
    this.#messages?.length ? this._internals.states.add('message') : this._internals.states.delete('message');
    this.#label ? this._internals.states.add('label') : this._internals.states.delete('label');
    this.#isInline ? this._internals.states.add('inline-control') : this._internals.states.delete('inline-control');
  }
}
