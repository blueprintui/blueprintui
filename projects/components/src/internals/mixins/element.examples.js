export const metadata = {
  name: 'popover',
  elements: ['bp-popover']
};

/** @summary Shows different popover type variations. */
export function types() {
  return /* html */`
  <div bp-layout="inline gap:sm center" style="height: calc(100vh - 48px)">
    <bp-button interestfor="tooltip">tooltip</bp-button>
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

/** @summary The [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) allows you to control the popover element declaratively without JavaScript. */
export function popoverApi() {
  return /* html */`
    <bp-button popovertarget="toggletip-popover">toggletip</bp-button>
    <bp-toggletip id="toggletip-popover">toggletip</bp-toggletip>
    <script type="module">
      import '@blueprintui/components/include/toggletip.js';
      import '@blueprintui/components/include/button.js';
    </script>
  `;
}

/** @summary The [Invoker Command API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) is similar to the Popover API but with a more generalized approach for any HTML Element. */
export function invokerCommandsApi() {
  return /* html */`
    <bp-button commandfor="toggletip-popover" command="toggle-popover">toggletip</bp-button>
    <bp-toggletip id="toggletip-popover">toggletip</bp-toggletip>
    <script type="module">
      import '@blueprintui/components/include/toggletip.js';
      import '@blueprintui/components/include/button.js';
    </script>
  `;
}

/** @summary The [Interest Invokers API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using_interest_invokers) enables elements like popovers to be triggered when a user "shows interest" or hide when a user loses interest. Interest can be trigger by different user input such as hover, focus or long press events. */
export function interestInvokersApi() {
  return /* html */`
    <bp-button interestfor="tooltip-interest">tooltip</bp-button>
    <bp-tooltip id="tooltip-interest">tooltip</bp-tooltip>
    <script type="module">
      import '@blueprintui/components/include/tooltip.js';
      import '@blueprintui/components/include/button.js';
    </script>
  `;
}