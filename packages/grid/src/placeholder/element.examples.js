export const metadata = {
  name: 'placeholder',
  elements: ['bp-grid-placeholder', 'bp-grid']
};

export function placeholder() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/placeholder.js';
    </script>
    <bp-grid aria-label="placeholder datagrid demo" height="390">
      <bp-grid-column>Column 1</bp-grid-column>
      <bp-grid-column>Column 2</bp-grid-column>
      <bp-grid-column>Column 3</bp-grid-column>
      <bp-grid-column>Column 4</bp-grid-column>
      <bp-grid-placeholder></bp-grid-placeholder>
    </bp-grid>
  `;
}
