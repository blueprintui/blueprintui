import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```javascript
 * import '@blueprintui/components/include/accordion.js';
 * ```
 *
 * ```html
 * <bp-accordion>
 *   <bp-accordion-panel expanded>
 *     <bp-accordion-header>Item 1</bp-accordion-header>
 *     <bp-accordion-content>Content 1</bp-accordion-content>
 *   </bp-accordion-panel>
 *   <bp-accordion-panel>
 *     <bp-accordion-header>Item 2</bp-accordion-header>
 *     <bp-accordion-content>Content 2</bp-accordion-content>
 *   </bp-accordion-panel>
 *   <bp-accordion-panel disabled>
 *     <bp-accordion-header>Item 3</bp-accordion-header>
 *     <bp-accordion-content>Content 3</bp-accordion-content>
 *   </bp-accordion-panel>
 * </bp-accordion>
 * ```
 *
 * @summary The accordion component is used to display a large amount of content in a small space. The accordion should be used to group related content together.
 * @element bp-accordion
 * @since 1.0.0
 * @slot - bp-accordion-panel
 * @cssprop --border-color
 * @cssprop --border-width
 * @cssprop --border-radius
 * @cssprop --background
 */
export class BpAccordion extends LitElement implements Pick<BpTypeElement, keyof BpAccordion> {
  /** Determines the visual layer style, with 'container' providing backgrounds and borders, while 'flat' removes them for nested contexts */
  @property({ type: String, reflect: true }) accessor layer: 'flat' | 'container' = 'container';

  static styles = [baseStyles, styles];

  render() {
    return html` <div part="internal">
      <slot name="accordion-panel"></slot>
    </div>`;
  }
}
