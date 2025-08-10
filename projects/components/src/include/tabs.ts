import { defineElement } from '@blueprintui/components/internals';
import { BpTabs, BpTab, BpTabPanel, BpTabList } from '@blueprintui/components/tabs';

defineElement('bp-tab-panel', BpTabPanel);
defineElement('bp-tab-list', BpTabList);
defineElement('bp-tabs', BpTabs);
defineElement('bp-tab', BpTab);

declare global {
  interface HTMLElementTagNameMap {
    'bp-tab-panel': BpTabPanel;
    'bp-tab-list': BpTabList;
    'bp-tabs': BpTabs;
    'bp-tab': BpTab;
  }
}
