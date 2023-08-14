import { PropertyValues, html } from 'lit';
import { state } from 'lit/decorators/state.js';
import { baseStyles, interactionStyles, BaseButton, createId } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

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
export class BpAccordionHeader extends BaseButton {
  /** @private */
  @state() expanded = false;

  static get styles() {
    return [baseStyles, interactionStyles, styles];
  }

  render() {
    return html`<div interaction layer part="internal">
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
