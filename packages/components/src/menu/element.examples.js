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
    <bp-button>Open Dropdown</bp-button>
    <bp-dropdown hidden>
      <bp-menu>
        <bp-menu-item>menu item</bp-menu-item>
        <bp-menu-item>menu item</bp-menu-item>
        <bp-menu-item>menu item</bp-menu-item>
        <bp-menu-item>menu item</bp-menu-item>
      </bp-menu>
    </bp-dropdown>

    <script type="module">
      import '@blueprintui/components/include/menu.js';
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/components/include/dropdown.js';

      const dropdown = document.querySelector('bp-dropdown');
      const button = document.querySelector('bp-button');

      dropdown.anchor = button;
      dropdown.addEventListener('close', () => dropdown.hidden = true);
      button.addEventListener('click', () => dropdown.hidden = false);
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
