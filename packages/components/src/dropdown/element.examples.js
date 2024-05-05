export const metadata = {
  name: 'dropdown',
  elements: ['bp-dropdown']
};

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

export function checkboxGroup() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="dropdown-checkbox-group-anchor" popovertarget="dropdown-checkbox-group">open dropdown</bp-button>
      <bp-dropdown id="dropdown-checkbox-group" anchor="dropdown-checkbox-group-anchor" closable>
        <bp-fieldset layout="vertical">
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

export function radioGroup() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="dropdown-radio-group-anchor" popovertarget="dropdown-radio-group" action="outline">open dropdown</bp-button>
      <bp-dropdown id="dropdown-radio-group" anchor="dropdown-radio-group-anchor" closable>
        <bp-fieldset layout="vertical">
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

export function nestedPositioning() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/menu.js';
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/components/include/dropdown.js';
    </script>
    <div style="height: 80vh; display: flex; align-items: center; justify-content: center;">
      <bp-button id="anchor" popovertarget="dropdown-menu-1">anchor</bp-button>
      <bp-dropdown anchor="anchor" id="dropdown-menu-1">
        <bp-menu>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item id="dropdown-menu-item-1" popovertarget="dropdown-menu-2">menu item ></bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
        </bp-menu>
      </bp-dropdown>
      <bp-dropdown id="dropdown-menu-2" anchor="dropdown-menu-item-1" position="right-start">
        <bp-menu>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item id="dropdown-menu-item-2" popovertarget="dropdown-menu-3">menu item ></bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
        </bp-menu>
      </bp-dropdown>
      <bp-dropdown id="dropdown-menu-3" anchor="dropdown-menu-item-2" position="right-end">
        <bp-menu>
          <bp-menu-item id="dropdown-menu-item-3">menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
        </bp-menu>
      </bp-dropdown>
    </div>
  `;
}
