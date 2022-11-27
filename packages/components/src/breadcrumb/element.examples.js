export const metadata = {
  name: 'breadcrumb',
  elements: ['bp-breadcrumb']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/breadcrumb.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/angle.js';
    </script>
    <bp-breadcrumb aria-label="breadcrumb">
      <a bp-text="link" href="#">Home</a>
      <a bp-text="link" href="#">Parent page</a>
      <p bp-text="content" aria-current="page">Current page</p>
    </bp-breadcrumb>
    `;
}

export function separator() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/breadcrumb.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/angle.js';
    </script>
    <bp-breadcrumb aria-label="breadcrumb">
      <bp-icon slot="separator" shape="angle" direction="right" size="16"></bp-icon>
      <a bp-text="link" href="#">Home</a>
      <a bp-text="link" href="#">Parent page</a>
      <p bp-text="content" aria-current="page">Current page</p>
    </bp-breadcrumb>
    `;
}
