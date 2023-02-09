export const metadata = {
  name: 'button-expand',
  elements: ['bp-button-expand']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-expand.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-expand></bp-button-expand>
      <bp-button-expand checked></bp-button-expand>
    </div>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-expand.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-expand disabled></bp-button-expand>
      <bp-button-expand></bp-button-expand>
    </div>
  `;
}

export function readonly() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-expand.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-expand readonly></bp-button-expand>
      <bp-button-expand></bp-button-expand>
    </div>
  `;
}

export function horizontal() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-expand.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-expand action="horizontal"></bp-button-expand>
      <bp-button-expand action="horizontal" checked></bp-button-expand>
    </div>
  `;
}

export function form() {
  return /* html */`
    <form id="expand-button-form" bp-layout="block gap:md">
      <bp-button-expand name="expand" aria-label="expand"></bp-button-expand>
      <span bp-layout="block:center">false</span>
      <bp-button type="submit" action="outline">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-expand.js';
      const button = document.querySelector('#expand-button-form bp-button-expand');
      const form = document.querySelector('form');
      button.addEventListener('change', (e) => document.querySelector('#expand-button-form span').innerHTML = e.target.checked);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit', Object.fromEntries(new FormData(form)));
      });
    </script>
  `;
}