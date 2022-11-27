export const metadata = {
  name: 'button-icon',
  elements: ['bp-button-icon']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/filter.js';
      import '@blueprintui/icons/shapes/close.js';
      import '@blueprintui/icons/shapes/menu.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-button-icon aria-label="open options"></bp-button-icon>
      <bp-button-icon shape="menu" aria-label="open menu"></bp-button-icon>
      <bp-button-icon shape="filter" aria-label="filter column"></bp-button-icon>
      <bp-button-icon shape="close" aria-label="close message"></bp-button-icon>
    </div>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
    </script>
    <bp-button-icon disabled aria-label="open options"></bp-button-icon>
  `;
}

export function selected() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
    </script>
    <bp-button-icon selected aria-label="open options"></bp-button-icon>
  `;
}
