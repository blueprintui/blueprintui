export const metadata = {
  name: 'button-handle',
  elements: ['bp-button-handle']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-handle.js';
    </script>

    <bp-button-handle aria-label="move item"></bp-button-handle>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-handle.js';
    </script>

    <bp-button-handle disabled aria-label="move item"></bp-button-handle>
  `;
}