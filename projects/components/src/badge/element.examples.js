export const metadata = {
  name: 'badge',
  elements: ['bp-badge']
};

/**
 * @summary Displays numerical or text indicators to show counts, status, or labels.
 */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/badge.js';
    </script>

    <div bp-layout="inline gap:xs">
      <bp-badge></bp-badge>
      <bp-badge status="accent"></bp-badge>
      <bp-badge status="success"></bp-badge>
      <bp-badge status="warning"></bp-badge>
      <bp-badge status="danger"></bp-badge>
    </div>
    `;
}

/**
 * @summary Shows badges displaying numeric values with various status types.
 */
export function number() {
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

/**
 * @summary Demonstrates badges with longer text content like version numbers.
 */
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