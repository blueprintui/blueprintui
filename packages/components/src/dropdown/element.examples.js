export const metadata = {
  name: 'dropdown',
  elements: ['bp-dropdown']
};

export function example() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-dropdown hidden anchor="dropdown" trigger="dropdown">This is some static content in a dropdown.</bp-dropdown>
      <bp-button id="dropdown" action="outline">Open Dropdown</bp-button>
    </div>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/button.js';

      const dropdown = document.querySelector('bp-dropdown[anchor="dropdown"]');
      dropdown.addEventListener('close', () => dropdown.hidden = true);
      dropdown.addEventListener('open', () => dropdown.hidden = false);
    </script>
  `;
}

export function checkboxGroup() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="checkbox-dropdown" action="outline">Open Dropdown</bp-button>
      <bp-dropdown hidden closable anchor="checkbox-dropdown" trigger="checkbox-dropdown">
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

      const dropdown = document.querySelector('bp-dropdown[anchor="checkbox-dropdown"]');
      dropdown.addEventListener('close', () => dropdown.hidden = true);
      dropdown.addEventListener('open', () => dropdown.hidden = false);
    </script>
  `;
}

export function radioGroup() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="radio-dropdown" action="outline">Open Dropdown</bp-button>
      <bp-dropdown hidden closable anchor="radio-dropdown" trigger="radio-dropdown">
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

      const dropdown = document.querySelector('bp-dropdown[anchor="radio-dropdown"]');
      dropdown.addEventListener('close', () => dropdown.hidden = true);
      dropdown.addEventListener('open', () => dropdown.hidden = false);
    </script>
  `;
}

export function menu() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="menu-dropdown" action="outline">Open Dropdown</bp-button>
      <bp-dropdown hidden anchor="menu-dropdown" trigger="menu-dropdown">
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

      const dropdown = document.querySelector('bp-dropdown[anchor="menu-dropdown"]');
      dropdown.addEventListener('close', () => dropdown.hidden = true);
      dropdown.addEventListener('open', () => dropdown.hidden = false);
    </script>
  `;
}
