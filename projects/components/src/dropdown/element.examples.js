export const metadata = {
  name: 'dropdown',
  elements: ['bp-dropdown']
};

/** @summary Displays a positioned overlay with content anchored to a trigger element. */
export function example() {
  return /* html */`
    <div bp-layout="block center" style="height: 200px">
      <bp-button id="dropdown-anchor" popovertarget="dropdown-example">open dropdown</bp-button>
      <bp-dropdown id="dropdown-example" anchor="dropdown-anchor">This is some static content in a dropdown.</bp-dropdown>
    </div>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/button.js';
    </script>
  `;
}

/** @summary Demonstrates programmatic control using command API. */
export function commands() {
  return /* html */`
    <div bp-layout="inline gap:xs center" style="height: 200px">
      <bp-button command="show-popover" commandfor="dropdown-command">open dropdown</bp-button>
      <bp-button command="toggle-popover" commandfor="dropdown-command">toggle dropdown</bp-button>
      <bp-dropdown id="dropdown-command">
        <bp-button command="hide-popover" commandfor="dropdown-command">close dropdown</bp-button>
      </bp-dropdown>
    </div>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/button.js';
    </script>
  `;
}

/** @summary Shows dropdown containing checkbox group for multi-select options. */
export function checkboxGroup() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="dropdown-checkbox-group-anchor" popovertarget="dropdown-checkbox-group">open dropdown</bp-button>
      <bp-dropdown id="dropdown-checkbox-group" anchor="dropdown-checkbox-group-anchor" closable>
        <bp-fieldset layout="vertical" style="min-width: 120px">
          <label>label</label>

          <label>checkbox 1</label>
          <bp-checkbox value="1" checked></bp-checkbox>

          <label>checkbox 2</label>
          <bp-checkbox value="2"></bp-checkbox>

          <label>checkbox 3</label>
          <bp-checkbox value="3"></bp-checkbox>
        </bp-fieldset>
      </bp-dropdown>
    </div>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/checkbox.js';
      import '@blueprintui/components/include/button.js';
    </script>
  `;
}

/** @summary Shows dropdown containing radio group for single-select options. */
export function radioGroup() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="dropdown-radio-group-anchor" popovertarget="dropdown-radio-group" action="outline">open dropdown</bp-button>
      <bp-dropdown id="dropdown-radio-group" anchor="dropdown-radio-group-anchor" closable>
        <bp-fieldset layout="vertical" style="min-width: 120px">
          <label>label</label>

          <label>radio 1</label>
          <bp-radio value="1" checked></bp-radio>

          <label>radio 2</label>
          <bp-radio value="2"></bp-radio>

          <label>radio 3</label>
          <bp-radio value="3"></bp-radio>
        </bp-fieldset>
      </bp-dropdown>
    </div>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/radio.js';
      import '@blueprintui/components/include/button.js';
    </script>
  `;
}

/** @summary Demonstrates dropdown with menu items for action selection. */
export function menu() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="dropdown-menu-anchor" popovertarget="dropdown-menu" action="outline">open dropdown</bp-button>
      <bp-dropdown id="dropdown-menu" anchor="dropdown-menu-anchor">
        <bp-menu>
          <bp-menu-item>Account</bp-menu-item>
          <bp-menu-item>Reports</bp-menu-item>
          <bp-menu-item>Profile Settings</bp-menu-item>
          <bp-divider></bp-divider>
          <bp-menu-item>Logout <bp-icon shape="logout" style="margin-left: auto"></bp-icon></bp-menu-item>
        </bp-menu>
      </bp-dropdown>
    </div>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/menu.js';
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/components/include/divider.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/caret.js';
      import '@blueprintui/icons/shapes/logout.js';
    </script>
  `;
}

/** @summary Shows complex nested dropdown positioning with multiple levels of menus. */
export function nestedPositioning() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/menu.js';
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/components/include/dropdown.js';
    </script>
    <div style="min-height: 20vh; display: flex; align-items: center; justify-content: center;">
      <bp-button popovertarget="dropdown-menu-1">anchor</bp-button>
      <bp-dropdown id="dropdown-menu-1">
        <bp-menu>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item popovertarget="dropdown-menu-2">menu item ></bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
        </bp-menu>
      </bp-dropdown>
      <bp-dropdown id="dropdown-menu-2" position="right-start">
        <bp-menu>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item popovertarget="dropdown-menu-3">menu item ></bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
        </bp-menu>
      </bp-dropdown>
      <bp-dropdown id="dropdown-menu-3" position="right-end">
        <bp-menu>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
        </bp-menu>
      </bp-dropdown>
    </div>
  `;
}
