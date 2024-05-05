export const metadata = {
  name: 'toast',
  elements: ['bp-toast']
};

export function example() {
  return /* html */`
    <div bp-layout="block center" style="height: 250px">
      <bp-button popovertarget="toast-example">open toast</bp-button>
      <bp-toast popover closable id="toast-example">toast message</bp-toast>
    </div>
    <script type="module">
      import '@blueprintui/components/include/toast.js';
    </script>
  `;
}

export function status() {
  return /* html */`
    <div bp-layout="block center gap:md">
      <bp-toast static open position="center" closable>toast</bp-toast>
      <bp-toast static open position="top" status="accent" closable>info</bp-toast>
      <bp-toast static open position="right" status="success" closable>success</bp-toast>
      <bp-toast static open position="bottom" status="warning" closable>warning</bp-toast>
      <bp-toast static open position="left" status="danger" closable>danger</bp-toast>
    </div>
    <script type="module">
      import '@blueprintui/components/include/toast.js';
    </script>
  `;
}

export function position() {
  return /* html */`
    <div id="status-anchor" style="height: 100px; width: 300px; margin: 48px auto 100px auto"></div>
    <bp-toast open position="center" closable>toast</bp-toast>
    <bp-toast open position="top" closable>toast</bp-toast>
    <bp-toast open position="right" closable>toast</bp-toast>
    <bp-toast open position="bottom" closable>toast</bp-toast>
    <bp-toast open position="left"closable>toast</bp-toast>
    <script type="module">
      import '@blueprintui/components/include/toast.js';
    </script>
  `;
}

export function visual() {
  return /* html */`
    <div bp-layout="block center gap:md">
      <bp-toast open position="center" closable>toast</bp-toast>
      <bp-toast open position="top" status="accent" closable>info</bp-toast>
      <bp-toast open position="right" status="success" closable>success</bp-toast>
      <bp-toast open position="bottom" status="warning" closable>warning</bp-toast>
      <bp-toast open position="left" status="danger" closable>danger</bp-toast>
    </div>
    <script type="module">
      import '@blueprintui/components/include/toast.js';
    </script>
  `;
}