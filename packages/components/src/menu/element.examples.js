export const metadata = {
  name: 'menu',
  elements: ['bp-menu']
};

export function example() {
  return /* html */`
    <bp-menu>
      <bp-menu-item>menu item</bp-menu-item>
      <bp-menu-item selected>item selected</bp-menu-item>
      <bp-menu-item disabled>item disabled</bp-menu-item>
      <bp-menu-item>menu item</bp-menu-item>
    </bp-menu>
  `;
}

export function links() {
  return /* html */`
    <bp-menu>
      <bp-menu-item><a href="#">menu item</a></bp-menu-item>
      <bp-menu-item selected><a href="#">menu item</a></bp-menu-item>
      <bp-menu-item disabled><a href="#">menu item</a></bp-menu-item>
      <bp-menu-item><a href="#">menu item</a></bp-menu-item>
    </bp-menu>
  `;
}

export function dropdown() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="menu-dropdown">Open Dropdown</bp-button>
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
      import '@blueprintui/icons/shapes/logout.js';

      const dropdown = document.querySelector('bp-dropdown[anchor="menu-dropdown"]');
      dropdown.addEventListener('close', () => dropdown.hidden = true);
      dropdown.addEventListener('open', () => dropdown.hidden = false);
    </script>
  `;
}

export function positioning() {
  return /* html */`
    <div style="height: 80vh; display: flex; align-items: center; justify-content: center;">
      <bp-button id="anchor">anchor</bp-button>
      <bp-dropdown anchor="anchor" id="dropdown-menu-1">
        <bp-menu>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item id="dropdown-menu-item-1">menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
        </bp-menu>
      </bp-dropdown>
      <bp-dropdown id="dropdown-menu-2" anchor="dropdown-menu-item-1" position="right-start">
        <bp-menu>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item id="dropdown-menu-item-2">menu item</bp-menu-item>
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
