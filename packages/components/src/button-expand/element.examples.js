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
      <bp-button-expand expanded></bp-button-expand>
    </div>
  `;
}

export function buttonExpandHorizontal() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-expand.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-expand action="horizontal"></bp-button-expand>
      <bp-button-expand action="horizontal" expanded></bp-button-expand>
    </div>
  `;
}
