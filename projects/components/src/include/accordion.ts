import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonExpand } from '@blueprintui/components/button-expand';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import {
  BpAccordion,
  BpAccordionPanel,
  BpAccordionContent,
  BpAccordionHeader
} from '@blueprintui/components/accordion';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-expand', BpButtonExpand);
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
