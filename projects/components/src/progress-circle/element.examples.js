export const metadata = {
  name: 'progress-circle',
  elements: ['bp-progress-circle']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/progress-circle.js';
    </script>

    <div bp-layout="inline gap:xs">
      <bp-progress-circle value="75"></bp-progress-circle>
      <bp-progress-circle value="75" status="accent"></bp-progress-circle>
      <bp-progress-circle value="75" status="success"></bp-progress-circle>
      <bp-progress-circle value="75" status="warning"></bp-progress-circle>
      <bp-progress-circle value="75" status="danger"></bp-progress-circle>
    </div>
  `;
}

export function progressCircleLoading() {
  return /* html */`
    <div bp-layout="inline gap:xs">
      <bp-progress-circle></bp-progress-circle>
      <bp-progress-circle status="accent"></bp-progress-circle>
      <bp-progress-circle status="success"></bp-progress-circle>
      <bp-progress-circle status="warning"></bp-progress-circle>
      <bp-progress-circle status="danger"></bp-progress-circle>
    </div>
  `;
}