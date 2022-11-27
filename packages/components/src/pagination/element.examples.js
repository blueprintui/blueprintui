export const metadata = {
  name: 'pagination',
  elements: ['bp-pagination']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/pagination.js';
    </script>

    <bp-pagination aria-label="pagination">
      <bp-button-icon slot="prev"></bp-button-icon>
      <bp-button-icon slot="next"></bp-button-icon>
    </bp-pagination>
  `;
};

export function basicPaginationNumber() {
  return /* html */`
    <bp-pagination aria-label="pagination">
      <bp-button-icon slot="prev"></bp-button-icon>
      <span aria-label="current page">1 / 3</span>
      <bp-button-icon slot="next"></bp-button-icon>
    </bp-pagination>
  `;
};

export function firstAndLast() {
  return /* html */`
    <bp-pagination aria-label="pagination">
      <bp-button-icon slot="first"></bp-button-icon>
      <bp-button-icon slot="prev"></bp-button-icon>
      <span aria-label="current page">1 / 3</span>
      <bp-button-icon slot="next"></bp-button-icon>
      <bp-button-icon slot="last"></bp-button-icon>
    </bp-pagination>
  `;
};

export function editablePaginationNumber() {
  return /* html */`
    <bp-pagination aria-label="pagination">
      <bp-button-icon slot="first"></bp-button-icon>
      <bp-button-icon slot="prev"></bp-button-icon>
      <bp-field novalidate>
        <bp-input type="number" value="1" size="2" min="1" max="99" aria-label="current page"></bp-input>
        <bp-field-message>/ 3</bp-field-message>
      </bp-field>
      <bp-button-icon slot="next"></bp-button-icon>
      <bp-button-icon slot="last"></bp-button-icon>
    </bp-pagination>
  `;
};
