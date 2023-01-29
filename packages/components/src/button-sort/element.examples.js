export const metadata = {
  name: 'button-sort',
  elements: ['bp-button-sort']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-sort.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-sort aria-label="sort"></bp-button-sort>
      <bp-button-sort sort="ascending" aria-label="sort"></bp-button-sort>
      <bp-button-sort sort="descending" aria-label="sort"></bp-button-sort>
    </div>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-sort.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-sort disabled aria-label="sort"></bp-button-sort>
      <bp-button-sort disabled sort="ascending" aria-label="sort"></bp-button-sort>
      <bp-button-sort disabled sort="descending" aria-label="sort"></bp-button-sort>
    </div>
  `;
}