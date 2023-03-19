/// <reference types="vite/client" />

/*
 * @experimental
 *
 * types.d.ts
 * Generated with https://github.com/blueprintui/custom-element-types
 */
import { DOMAttributes } from 'react';
import { BpAccordionContent } from '@blueprintui/components/accordion/content/element.js';
import { BpAccordion } from '@blueprintui/components/accordion/element.js';
import { BpAccordionHeader } from '@blueprintui/components/accordion/header/element.js';
import { BpAccordionPanel } from '@blueprintui/components/accordion/panel/element.js';
import { BpAlert } from '@blueprintui/components/alert/element.js';
import { BpAlertGroup } from '@blueprintui/components/alert/group/element.js';
import { BpBadge } from '@blueprintui/components/badge/element.js';
import { BpBreadcrumb } from '@blueprintui/components/breadcrumb/element.js';
import { BpButtonExpand } from '@blueprintui/components/button-expand/element.js';
import { BpButtonGroup } from '@blueprintui/components/button-group/element.js';
import { BpButtonHandle } from '@blueprintui/components/button-handle/element.js';
import { BpButtonIconGroup } from '@blueprintui/components/button-icon-group/element.js';
import { BpButtonIcon } from '@blueprintui/components/button-icon/element.js';
import { BpButtonResize } from '@blueprintui/components/button-resize/element.js';
import { BpButtonSort } from '@blueprintui/components/button-sort/element.js';
import { BpButton } from '@blueprintui/components/button/element.js';
import { BpCard } from '@blueprintui/components/card/element.js';
import { BpCheckbox } from '@blueprintui/components/checkbox/element.js';
import { BpColor } from '@blueprintui/components/color/element.js';
import { BpDate } from '@blueprintui/components/date/element.js';
import { BpDialog } from '@blueprintui/components/dialog/element.js';
import { BpDivider } from '@blueprintui/components/divider/element.js';
import { BpDrawer } from '@blueprintui/components/drawer/element.js';
import { BpDropdown } from '@blueprintui/components/dropdown/element.js';
import { BpFile } from '@blueprintui/components/file/element.js';
import { BpFieldMessage } from '@blueprintui/components/forms/field-message/element.js';
import { BpField } from '@blueprintui/components/forms/field/element.js';
import { BpFieldset } from '@blueprintui/components/forms/fieldset/element.js';
import { BpFormGroup } from '@blueprintui/components/forms/form-group/element.js';
import { BpHeader } from '@blueprintui/components/header/element.js';
import { BpHeaderItem } from '@blueprintui/components/header/item/element.js';
import { BpInput } from '@blueprintui/components/input/element.js';
import { BpMenu } from '@blueprintui/components/menu/element.js';
import { BpMenuItem } from '@blueprintui/components/menu/item/element.js';
import { BpMonth } from '@blueprintui/components/month/element.js';
import { BpNav } from '@blueprintui/components/nav/element.js';
import { BpNavGroup } from '@blueprintui/components/nav/group/element.js';
import { BpNavItem } from '@blueprintui/components/nav/item/element.js';
import { BpPagination } from '@blueprintui/components/pagination/element.js';
import { BpPassword } from '@blueprintui/components/password/element.js';
import { BpPopover } from '@blueprintui/components/popover/element.js';
import { BpProgressBar } from '@blueprintui/components/progress-bar/element.js';
import { BpProgressCircle } from '@blueprintui/components/progress-circle/element.js';
import { BpRadio } from '@blueprintui/components/radio/element.js';
import { BpRange } from '@blueprintui/components/range/element.js';
import { BpSearch } from '@blueprintui/components/search/element.js';
import { BpSelect } from '@blueprintui/components/select/element.js';
import { BpShell } from '@blueprintui/components/shell/element.js';
import { BpSwitch } from '@blueprintui/components/switch/element.js';
import { BpTabs } from '@blueprintui/components/tabs/element.js';
import { BpTabList } from '@blueprintui/components/tabs/list/element.js';
import { BpTabPanel } from '@blueprintui/components/tabs/panel/element.js';
import { BpTab } from '@blueprintui/components/tabs/tab/element.js';
import { BpTag } from '@blueprintui/components/tag/element.js';
import { BpTextarea } from '@blueprintui/components/textarea/element.js';
import { BpTime } from '@blueprintui/components/time/element.js';
import { BpToast } from '@blueprintui/components/toast/element.js';
import { BpTooltip } from '@blueprintui/components/tooltip/element.js';

type CustomEvents<K extends string> = { [key in K] : (event: CustomEvent) => void };
type CustomElement<T, K extends string = ''> = Partial<T & DOMAttributes<T> & { children: any } & CustomEvents<`on${K}`>>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['bp-accordion-content']: CustomElement<BpAccordionContent>;
      ['bp-accordion']: CustomElement<BpAccordion>;
      ['bp-accordion-header']: CustomElement<BpAccordionHeader>;
      ['bp-accordion-panel']: CustomElement<BpAccordionPanel>;
      ['bp-alert']: CustomElement<BpAlert,''>;
      ['bp-alert-group']: CustomElement<BpAlertGroup>;
      ['bp-badge']: CustomElement<BpBadge>;
      ['bp-breadcrumb']: CustomElement<BpBreadcrumb>;
      ['bp-button-expand']: CustomElement<BpButtonExpand,'input' | 'change'>;
      ['bp-button-group']: CustomElement<BpButtonGroup>;
      ['bp-button-handle']: CustomElement<BpButtonHandle>;
      ['bp-button-icon-group']: CustomElement<BpButtonIconGroup>;
      ['bp-button-icon']: CustomElement<BpButtonIcon>;
      ['bp-button-resize']: CustomElement<BpButtonResize>;
      ['bp-button-sort']: CustomElement<BpButtonSort,'input' | 'change'>;
      ['bp-button']: CustomElement<BpButton>;
      ['bp-card']: CustomElement<BpCard>;
      ['bp-checkbox']: CustomElement<BpCheckbox,'change'>;
      ['bp-color']: CustomElement<BpColor,'input' | 'change'>;
      ['bp-date']: CustomElement<BpDate,'input' | 'change'>;
      ['bp-dialog']: CustomElement<BpDialog>;
      ['bp-divider']: CustomElement<BpDivider>;
      ['bp-drawer']: CustomElement<BpDrawer>;
      ['bp-dropdown']: CustomElement<BpDropdown>;
      ['bp-file']: CustomElement<BpFile,'input' | 'change'>;
      ['bp-field-message']: CustomElement<BpFieldMessage>;
      ['bp-field']: CustomElement<BpField>;
      ['bp-fieldset']: CustomElement<BpFieldset>;
      ['bp-form-group']: CustomElement<BpFormGroup>;
      ['bp-header']: CustomElement<BpHeader>;
      ['bp-header-item']: CustomElement<BpHeaderItem>;
      ['bp-input']: CustomElement<BpInput,'input' | 'change'>;
      ['bp-menu']: CustomElement<BpMenu>;
      ['bp-menu-item']: CustomElement<BpMenuItem>;
      ['bp-month']: CustomElement<BpMonth,'input' | 'change'>;
      ['bp-nav']: CustomElement<BpNav,'change'>;
      ['bp-nav-group']: CustomElement<BpNavGroup>;
      ['bp-nav-item']: CustomElement<BpNavItem>;
      ['bp-pagination']: CustomElement<BpPagination>;
      ['bp-password']: CustomElement<BpPassword,'input' | 'change'>;
      ['bp-popover']: CustomElement<BpPopover>;
      ['bp-progress-bar']: CustomElement<BpProgressBar>;
      ['bp-progress-circle']: CustomElement<BpProgressCircle>;
      ['bp-radio']: CustomElement<BpRadio,'change'>;
      ['bp-range']: CustomElement<BpRange,'input' | 'change'>;
      ['bp-search']: CustomElement<BpSearch,'input' | 'change'>;
      ['bp-select']: CustomElement<BpSelect,'input' | 'change'>;
      ['bp-shell']: CustomElement<BpShell>;
      ['bp-switch']: CustomElement<BpSwitch,'input' | 'change'>;
      ['bp-tabs']: CustomElement<BpTabs>;
      ['bp-tab-list']: CustomElement<BpTabList>;
      ['bp-tab-panel']: CustomElement<BpTabPanel>;
      ['bp-tab']: CustomElement<BpTab>;
      ['bp-tag']: CustomElement<BpTag>;
      ['bp-textarea']: CustomElement<BpTextarea,'input' | 'change'>;
      ['bp-time']: CustomElement<BpTime,'input' | 'change'>;
      ['bp-toast']: CustomElement<BpToast>;
      ['bp-tooltip']: CustomElement<BpTooltip>
    }
  }
}