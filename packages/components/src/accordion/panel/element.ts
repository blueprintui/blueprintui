import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  typeGroup,
  baseStyles,
  stateExpanded,
  assignedElements,
  BpTypeElement,
  interactionExpand
} from '@blueprintui/components/internals';
import { BpAccordionHeader } from '../header/element.js';
import { BpAccordionContent } from '../content/element.js';
import styles from './element.css' with { type: 'css' };

/**
 * Accordion Panel
 *
 * @element bp-accordion-panel
 * @since 1.0.0
 * @command --toggle
 * @command --close
 * @command --open
 * @slot - slot for header and content
 * @slot bp-accordion-header
 * @slot bp-accordion-content
 */
@typeGroup<BpAccordionPanel>()
@stateExpanded<BpAccordionPanel>()
@interactionExpand<BpAccordionPanel>()
export class BpAccordionPanel extends LitElement implements Pick<BpTypeElement, keyof BpAccordionPanel> {
  /** determine if element is expanded */
  @property({ type: Boolean }) accessor expanded = false;

  get #header() {
    return assignedElements<BpAccordionHeader>(this, { name: 'accordion-header' })[0];
  }

  get #content() {
    return assignedElements<BpAccordionContent>(this, { name: 'accordion-content' })[0];
  }

  static styles = [baseStyles, styles];

  render() {
    return html`<div part="internal">
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
