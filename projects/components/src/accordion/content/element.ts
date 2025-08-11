import { html, LitElement } from 'lit';
import { typeRegion, baseStyles, createId, BpTypeElement } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * Accordion Content
 *
 * @element bp-accordion-content
 * @since 1.0.0
 * @slot - slot for content
 * @cssprop --color
 * @cssprop --font-size
 * @cssprop --font-weight
 * @cssprop --background
 */
@typeRegion<BpAccordionContent>()
export class BpAccordionContent extends LitElement implements Pick<BpTypeElement, keyof BpAccordionContent> {
  static styles = [baseStyles, styles];

  render() {
    return html`<div part="internal" layer><slot></slot></div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.slot = 'accordion-content';
    this.id ||= createId();
  }
}
