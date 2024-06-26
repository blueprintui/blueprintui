import { PropertyValues, html } from 'lit';
import { state } from 'lit/decorators/state.js';
import { baseStyles, interactionStyles, BaseButton, createId, BpTypeButton } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * Accordion Header
 *
 * @element bp-accordion-header
 * @since 1.0.0
 * @slot - slot for header content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --font-size
 * @cssprop --padding
 */
export class BpAccordionHeader extends BaseButton implements Pick<BpTypeButton, keyof BpAccordionHeader> {
  /** @private */
  @state() accessor expanded = false;

  static styles = [baseStyles, interactionStyles, styles];

  render() {
    return html`<div interaction part="internal">
      <bp-button-expand .checked=${this.expanded} readonly action="vertical"></bp-button-expand>
      <slot></slot>
    </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.id ||= createId();
    this.slot = 'accordion-header';
    this._internals.ariaExpanded = 'false';
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this._internals.ariaExpanded = `${this.expanded}`;
  }
}
