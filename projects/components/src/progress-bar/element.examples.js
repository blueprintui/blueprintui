export const metadata = {
  name: 'progress-bar',
  elements: ['bp-progress-bar']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/progress-bar.js';
    </script>

    <div bp-layout="block gap:xs">
      <bp-progress-bar value="75"></bp-progress-bar>
      <bp-progress-bar value="75" status="accent"></bp-progress-bar>
      <bp-progress-bar value="75" status="success"></bp-progress-bar>
      <bp-progress-bar value="75" status="warning"></bp-progress-bar>
      <bp-progress-bar value="75" status="danger"></bp-progress-bar>
    </div>
  `;
}

export function progressBarIndeterminate() {
  return /* html */`
    <div bp-layout="block gap:xs">
      <bp-progress-bar></bp-progress-bar>
      <bp-progress-bar status="accent"></bp-progress-bar>
      <bp-progress-bar status="success"></bp-progress-bar>
      <bp-progress-bar status="warning"></bp-progress-bar>
      <bp-progress-bar status="danger"></bp-progress-bar>
    </div>
  `;
}