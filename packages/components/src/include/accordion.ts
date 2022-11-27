import '@blueprintui/components/include/button-expand.js';
import { BpAccordion, BpAccordionPanel, BpAccordionContent, BpAccordionHeader } from '@blueprintui/components/accordion';
import { defineElement } from '@blueprintui/components/internals';

defineElement('bp-accordion', BpAccordion);
defineElement('bp-accordion-panel', BpAccordionPanel);
defineElement('bp-accordion-content', BpAccordionContent);
defineElement('bp-accordion-header', BpAccordionHeader);

declare global {
  interface HTMLElementTagNameMap {
    'bp-accordion': BpAccordion;
    'bp-accordion-panel': BpAccordionPanel;
    'bp-accordion-content': BpAccordionContent;
    'bp-accordion-header': BpAccordionHeader;
  }
}
