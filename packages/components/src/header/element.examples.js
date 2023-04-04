export const metadata = {
  name: 'header',
  elements: ['bp-header']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/header.js';
    </script>

    <bp-header>
      <bp-header-item>header</bp-header-item>
      <bp-header-item bp-layout="inline:end">item</bp-header-item>
      <bp-header-item>item</bp-header-item>
      <bp-header-item><a href="#">link</a></bp-header-item>
    </bp-header>
  `;
}