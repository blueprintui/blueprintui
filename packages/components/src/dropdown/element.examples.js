export const metadata = {
  name: 'dropdown',
  elements: ['bp-dropdown']
};

export function example() {
  return /* html */`
    <bp-dropdown hidden closable>hello there</bp-dropdown>
    <bp-button>Open Dropdown</bp-button>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/button.js';

      const dropdown = document.querySelector('bp-dropdown');
      const button = document.querySelector('bp-button');
      dropdown.anchor = button;
      dropdown.addEventListener('close', () => dropdown.hidden = true);
      button.addEventListener('click', () => dropdown.hidden = false);
    </script>
  `;
}
