import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ariaGroup, baseStyles } from '@blueprintui/components/internals';
import { BpAccordionHeader } from '../header/element.js';
import { BpAccordionContent } from '../content/element.js';
import styles from './element.css' assert { type: 'css' };

/**
 * Accordion Panel
 *
 * @element bp-accordion-panel
 * @slot
 * @slot bp-accordion-header
 * @slot bp-accordion-content
 * @event expandedChange - notify when the user has clicked the panel header
 */
@ariaGroup<BpAccordionPanel>()
export class BpAccordionPanel extends LitElement {
  @property({ type: Boolean }) expanded = false;

  get #header() {
    return this.querySelector<BpAccordionHeader>('bp-accordion-header');
  }

  get #content() {
    return this.querySelector<BpAccordionContent>('bp-accordion-content');
  }

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`<div class="private-host">
      <slot name="accordion-header"></slot>
      <div class="accordion-content" ?hidden=${!this.expanded}>
        <slot name="accordion-content"></slot>
      </div>
    </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.slot = 'accordion-panel';
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);

    if (this.#content && this.#header) {
      this.#content.setAttribute('aria-labelledby', this.#header.id);
      this.#header.setAttribute('aria-controls', this.#content.id);
      this.#header.expanded = this.expanded;
    }
  }
}
