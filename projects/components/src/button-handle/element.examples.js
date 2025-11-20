export const metadata = {
  name: 'button-handle',
  elements: ['bp-button-handle']
};

/**
 * @summary Provides a draggable handle for reordering or moving items.
 */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-handle.js';
    </script>

    <bp-button-handle aria-label="move item"></bp-button-handle>
  `;
}

/**
 * @summary Shows handle button in disabled state.
 */
export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-handle.js';
    </script>

    <bp-button-handle disabled aria-label="move item"></bp-button-handle>
  `;
}