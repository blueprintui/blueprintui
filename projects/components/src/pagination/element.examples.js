export const metadata = {
  name: 'pagination',
  elements: ['bp-pagination']
};


/** @summary Allows users to navigate through multiple pages of content. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/pagination.js';
      import '@blueprintui/components/include/input.js';
      import '@blueprintui/components/include/select.js';
    </script>

    <bp-field control-width="shrink">
      <label>label</label>
      <bp-input></bp-input>
    </bp-field>

    ...

    <bp-field control-width="shrink">
      <label>label</label>
      <bp-select>
        <bp-option value="10">10</bp-option>
        <bp-option value="20">20</bp-option>
        <bp-option value="50">50</bp-option>
        <bp-option value="100">100</bp-option>
      </bp-select>
    </bp-field>

    ...

    <bp-pagination aria-label="pagination">
      <bp-select slot="page-size" control-width="shrink">
        <bp-option value="10">10</bp-option>
        <bp-option value="20">20</bp-option>
        <bp-option value="50">50</bp-option>
        <bp-option value="100">100</bp-option>
      </bp-select>
      <bp-button-icon slot="first"></bp-button-icon>
      <bp-button-icon slot="prev"></bp-button-icon>
      <bp-field novalidate layout="compact" control-width="shrink">
        <bp-input type="number" value="1" size="2" min="1" max="99" aria-label="current page"></bp-input>
        <bp-field-message>/ 100</bp-field-message>
      </bp-field>
      <bp-button-icon slot="next"></bp-button-icon>
      <bp-button-icon slot="last"></bp-button-icon>
    </bp-pagination>
  `;
};


/** @summary Demonstrates basic pagination controls. */
export function basic() {
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


/** @summary Shows pagination with page number display. */
export function basicPaginationNumber() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/pagination.js';
    </script>

    <bp-pagination aria-label="pagination">
      <bp-button-icon slot="prev" action="flat"></bp-button-icon>
      <span aria-label="current page">1 / 3</span>
      <bp-button-icon slot="next" action="flat"></bp-button-icon>
    </bp-pagination>
  `;
};


/** @summary Demonstrates pagination with first and last page buttons. */
export function firstAndLast() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/pagination.js';
    </script>

    <bp-pagination aria-label="pagination">
      <bp-button-icon slot="first"></bp-button-icon>
      <bp-button-icon slot="prev"></bp-button-icon>
      <span aria-label="current page">1 / 3</span>
      <bp-button-icon slot="next"></bp-button-icon>
      <bp-button-icon slot="last"></bp-button-icon>
    </bp-pagination>
  `;
};


/** @summary Shows pagination with direct page number input. */
export function input() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/pagination.js';
    </script>

    <bp-pagination-input name="pagination" value="1" max="500" size="10" size-options="[10, 50, 100]"></bp-pagination-input>
  `;
}


/** @summary Demonstrates interactive pagination input with real-time updates. */
export function inputInteractive() {
  return /* html */`
    <form id="pagination-form" bp-layout="block gap:md">
      <bp-pagination-input name="pagination" value="1" max="500" size="10" size-options="[10, 50, 100]"></bp-pagination-input>
      <bp-button type="submit" action="secondary">Submit <span>1</span></bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/components/include/pagination.js';
      const form = document.querySelector('#pagination-form');
      const pagination = document.querySelector('#pagination-form bp-pagination-input');
      pagination.addEventListener('change', (e) => document.querySelector('#pagination-form span').innerHTML = e.target.value);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit', Object.fromEntries(new FormData(form)));
      });
    </script>
  `;
}
