import { html, LitElement } from 'lit';
import { ariaRegion, baseStyles, createId } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Accordion Content
 *
 * @element bp-accordion-content
 * @slot - slot for content
 * @cssprop --color
 * @cssprop --font-size
 * @cssprop --font-weight
 * @cssprop --background
 */
@ariaRegion<BpAccordionContent>()
export class BpAccordionContent extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`<div part="internal" layer><slot></slot></div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.slot = 'accordion-content';
    this.id ||= createId();
  }
}
