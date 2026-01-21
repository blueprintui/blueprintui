export const metadata = {
  name: 'toast',
  elements: ['bp-toast']
};


/** @summary Shows temporary notification messages that auto-dismiss. */
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


/** @summary Demonstrates programmatic control using command API. */
export function commands() {
  return /* html */`
    <div bp-layout="inline gap:xs center" style="height: 250px">
      <bp-button command="show-popover" commandfor="toast-command">open toast</bp-button>
      <bp-button command="toggle-popover" commandfor="toast-command">toggle toast</bp-button>
      <bp-button command="hide-popover" commandfor="toast-command">close toast</bp-button>
      <bp-toast popover closable id="toast-command">toast message</bp-toast>
    </div>
    <script type="module">
      import '@blueprintui/components/include/toast.js';
    </script>
  `;
}


/** @summary Shows toast with various status colors. */
export function status() {
  return /* html */`
    <div bp-layout="inline center gap:sm m-t:lg">
      <bp-button popovertarget="default" action="secondary">default</bp-button>
      <bp-button popovertarget="accent" action="secondary">accent</bp-button>
      <bp-button popovertarget="success" action="secondary">success</bp-button>
      <bp-button popovertarget="warning" action="secondary">warning</bp-button>
      <bp-button popovertarget="danger" action="secondary">danger</bp-button>
    </div>
    <bp-toast id="default" position="top" closable>toast</bp-toast>
    <bp-toast id="accent" position="top" status="accent" closable>info</bp-toast>
    <bp-toast id="success" position="top" status="success" closable>success</bp-toast>
    <bp-toast id="warning" position="top" status="warning" closable>warning</bp-toast>
    <bp-toast id="danger" position="top" status="danger" closable>danger</bp-toast>
    <script type="module">
      import '@blueprintui/components/include/toast.js';
    </script>
  `;
}


/** @summary Demonstrates toast positioning options. */
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


/** @summary Shows visual appearance variations of toast notifications. */
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