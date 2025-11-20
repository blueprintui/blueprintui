export const metadata = {
  name: 'button-sort',
  elements: ['bp-button-sort']
};

/**
 * @summary Enables sorting of data in ascending, descending, or default order.
 */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-sort.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-button-sort aria-label="sort"></bp-button-sort>
      <bp-button-sort value="ascending" aria-label="sort"></bp-button-sort>
      <bp-button-sort value="descending" aria-label="sort"></bp-button-sort>
    </div>
  `;
}

/**
 * @summary Shows sort button integration with form data.
 */
export function form() {
  return /* html */`
    <form id="sort-button-form" bp-layout="block gap:md">
      <bp-button-sort name="sort" aria-label="sort"></bp-button-sort>
      <span bp-layout="block:center">none</span>
      <bp-button type="submit" action="secondary">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-sort.js';
      const button = document.querySelector('#sort-button-form bp-button-sort');
      const form = document.querySelector('form');
      button.addEventListener('change', (e) => document.querySelector('#sort-button-form span').innerHTML = e.target.value);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit', Object.fromEntries(new FormData(form)).sort);
      });
    </script>
  `;
}

/**
 * @summary Shows sort button in disabled state.
 */
export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-sort.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-sort disabled aria-label="sort"></bp-button-sort>
      <bp-button-sort disabled value="ascending" aria-label="sort"></bp-button-sort>
      <bp-button-sort disabled value="descending" aria-label="sort"></bp-button-sort>
    </div>
  `;
}

/**
 * @summary Shows sort button in readonly state.
 */
export function readonly() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-sort.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-sort readonly aria-label="sort"></bp-button-sort>
      <bp-button-sort readonly value="ascending" aria-label="sort"></bp-button-sort>
      <bp-button-sort readonly value="descending" aria-label="sort"></bp-button-sort>
    </div>
  `;
}
