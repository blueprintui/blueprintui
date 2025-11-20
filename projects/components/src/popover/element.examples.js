export const metadata = {
  name: 'popover',
  elements: ['bp-popover']
};


/** @summary Shows contextual content in a floating overlay. */
export function example() {
  return /* html */`
  <div style="min-height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
    <bp-button id="popover-btn" popovertarget="popover">Open Popover</bp-button>
    <bp-popover id="popover" position="top">hello there</bp-popover>
  </div>
  <script type="module">
    import '@blueprintui/components/include/popover.js';
    import '@blueprintui/components/include/button.js';
  </script>
  <style>
    body {
      display: flex;
      place-content: center;
      place-items: center;
    }
  </style>
`;
}


/** @summary Demonstrates programmatic control using command API. */
export function commands() {
  return /* html */`
  <div bp-layout="inline gap:xs center" style="height: 200px">
    <bp-button command="toggle-popover" commandfor="popover-commands">Toggle Popover</bp-button>
    <bp-button command="show-popover" commandfor="popover-commands">Open Popover</bp-button>
    <bp-button command="hide-popover" commandfor="popover-commands">Close Popover</bp-button>
    <bp-popover id="popover-commands" position="top">hello there</bp-popover>
  </div>
  <script type="module">
    import '@blueprintui/components/include/popover.js';
    import '@blueprintui/components/include/button.js';
  </script>
`;
}


/** @summary Shows nested popovers with multiple layers. */
export function nested() {
  return /* html */`
  <div bp-layout="grid cols:6 gap:md">
    <div bp-layout="block gap:md">
      <bp-field>
        <label>search</label>
        <bp-search value="text"></bp-search>
      </bp-field>
      <bp-field>
        <label>select</label>
        <bp-select>
          <bp-option value="1" checked>option 1</bp-option>
          <bp-option value="2">option 2</bp-option>
          <bp-option value="3">option 3</bp-option>
        </bp-select>
      </bp-field>
    </div>
    <bp-card>
      <div bp-layout="block gap:md">
        <bp-field>
          <label>search</label>
          <bp-search value="text"></bp-search>
        </bp-field>
        <bp-field>
          <label>select</label>
          <bp-select>
            <bp-option value="1" checked>option 1</bp-option>
            <bp-option value="2">option 2</bp-option>
            <bp-option value="3">option 3</bp-option>
          </bp-select>
        </bp-field>
      </div>
    </bp-card>
  </div>

  <bp-button popovertarget="dialog-popover">dialog</bp-button>
  <bp-dialog id="dialog-popover" modal closable>
    <bp-button popovertarget="dropdown-popover">dropdown</bp-button>
    <bp-dropdown id="dropdown-popover" position="top" style="--width: 250px; --min-width: fit-conent;">
      <bp-field>
        <label>search</label>
        <bp-search value="text" id="search">
          <bp-button-icon slot="suffix" id="tooltip-btn" popovertarget="tooltip-popover" action="inline"></bp-button-icon>
        </bp-search>
      </bp-field>
      <bp-tooltip id="tooltip-popover" position="right">tooltip</bp-tooltip>
      <br />

      <bp-field>
        <label>select</label>
        <bp-select>
          <bp-option value="1" checked>option 1</bp-option>
          <bp-option value="2">option 2</bp-option>
          <bp-option value="3">option 3</bp-option>
        </bp-select>
      </bp-field>
    </bp-dropdown>
  </bp-dialog>
`;
}


/** @summary Demonstrates various popover alignment options. */
export function alignment() {
  return /* html */`
    <div style="min-height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
      <bp-popover popover="manual" anchor="card" position="center">center</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="top-start">top-start</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="top">top</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="top-end">top-end</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="right-start">right-start</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="right">right</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="right-end">right-end</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="bottom-start">bottom-start</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="bottom">bottom</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="bottom-end">bottom-end</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="left-start">left-start</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="left">left</bp-popover>
      <bp-popover popover="manual" anchor="card" arrow position="left-end">left-end</bp-popover>
      <bp-card id="card" style="width: 500px; height: 350px"></bp-card>
    </div>
    <script type="module">
      import '@blueprintui/components/include/popover.js';
      Array.from(document.querySelectorAll('bp-popover')).forEach(i => {
        i.showPopover();
      });
    </script>
  `;
}


/** @summary Shows different popover type variations. */
export function types() {
  return /* html */`
  <div bp-layout="inline gap:sm center" style="height: calc(100vh - 48px)">
    <bp-button popovertarget="tooltip">tooltip</bp-button>
    <bp-button popovertarget="toggletip">toggletip</bp-button>
    <bp-button popovertarget="toast">toast</bp-button>
    <bp-button popovertarget="dropdown">dropdown</bp-button>
    <bp-button popovertarget="dialog">dialog</bp-button>
    <bp-button popovertarget="drawer">drawer</bp-button>
  </div>
  <bp-tooltip id="tooltip">tooltip</bp-tooltip>
  <bp-toggletip id="toggletip">toggletip</bp-toggletip>
  <bp-toast id="toast" position="bottom" closable>toast</bp-toast>
  <bp-dropdown id="dropdown" closable>dropdown</bp-dropdown>
  <bp-dialog id="dialog" modal closable>dialog</bp-dialog>
  <bp-drawer id="drawer" closable>drawer</bp-drawer>

  <script type="module">
    import '@blueprintui/components/include/button.js';
    import '@blueprintui/components/include/toggletip.js';
    import '@blueprintui/components/include/tooltip.js';
    import '@blueprintui/components/include/toast.js';
    import '@blueprintui/components/include/dropdown.js';
    import '@blueprintui/components/include/dialog.js';
    import '@blueprintui/components/include/drawer.js';
  </script>
  `;
}
