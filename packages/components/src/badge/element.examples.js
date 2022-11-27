export const metadata = {
  name: 'badge',
  elements: ['bp-badge']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/badge.js';
    </script>

    <div bp-layout="inline gap:xs">
      <bp-badge>10</bp-badge>
      <bp-badge status="accent">10</bp-badge>
      <bp-badge status="success">10</bp-badge>
      <bp-badge status="warning">10</bp-badge>
      <bp-badge status="danger">10</bp-badge>
    </div>
    `;
}

export function longForm() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/badge.js';
    </script>

    <div bp-layout="inline gap:xs">
      <bp-badge>0.0.0</bp-badge>
      <bp-badge status="accent">0.0.0</bp-badge>
      <bp-badge status="success">0.0.0</bp-badge>
      <bp-badge status="warning">0.0.0</bp-badge>
      <bp-badge status="danger">0.0.0</bp-badge>
    </div>
    `;
}