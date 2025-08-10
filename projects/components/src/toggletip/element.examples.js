export const metadata = {
  name: 'toggletip',
  elements: ['bp-toggletip']
};

export function example() {
  return /* html */`
  <div bp-layout="block center" style="height: 350px">
    <bp-button-icon popovertarget="toggletip-example" id="toggletip-btn" action="flat" shape="info" aria-label="open toggletip"></bp-button-icon>
    <bp-toggletip id="toggletip-example" anchor="toggletip-btn" position="top">
      <p bp-text="content">Wow this is a toggletip message!</p>
      <bp-button slot="footer" action="inline">Dismiss</bp-button>
      <bp-button slot="footer" action="inline">Learn More</bp-button>
    </bp-toggletip>
  </div>
  <script type="module">
    import '@blueprintui/components/include/toggletip.js';
    import '@blueprintui/components/include/button-icon.js';
    import '@blueprintui/icons/shapes/info.js';
  </script>
`;
}

export function commands() {
  return /* html */`
  <div bp-layout="inline gap:xs center" style="height: 350px">
    <bp-button command="toggle-popover" commandfor="toggletip-example">toggle toggletip</bp-button>
    <bp-button command="show-popover" commandfor="toggletip-example">open toggletip</bp-button>
    <bp-button command="hide-popover" commandfor="toggletip-example">close toggletip</bp-button>
  </div>
  <bp-toggletip id="toggletip-example" position="top">
    <p bp-text="content">Wow this is a toggletip message!</p>
    <bp-button slot="footer" action="inline">Dismiss</bp-button>
    <bp-button slot="footer" action="inline">Learn More</bp-button>
  </bp-toggletip>
  <script type="module">
    import '@blueprintui/components/include/toggletip.js';
    import '@blueprintui/components/include/button-icon.js';
    import '@blueprintui/icons/shapes/info.js';
  </script>
`;
}

export function position() {
  return /* html */`
    <bp-toggletip open id="toggletip-1" anchor="toggletip-action-1" position="right">toggletip right</bp-toggletip>
    <bp-toggletip open id="toggletip-2" anchor="toggletip-action-2" position="bottom">toggletip bottom</bp-toggletip>
    <bp-toggletip open id="toggletip-3" anchor="toggletip-action-3" position="left">toggletip left</bp-toggletip>
    <bp-toggletip open id="toggletip-4" anchor="toggletip-action-4" position="top">toggletip top</bp-toggletip>
    <div bp-layout="grid gap:md cols:6 block:stretch center" style="padding-top: 100px; max-height: 95vh; min-height: 340px;">
      <bp-button-icon popovertarget="toggletip-1" id="toggletip-action-1" action="flat" shape="info" aria-label="open toggletip"></bp-button-icon>
      <bp-button-icon popovertarget="toggletip-3" id="toggletip-action-3" action="flat" shape="info" aria-label="open toggletip"></bp-button-icon>
      <bp-button-icon popovertarget="toggletip-2" id="toggletip-action-2" action="flat" shape="info" aria-label="open toggletip"></bp-button-icon>
      <bp-button-icon popovertarget="toggletip-4" id="toggletip-action-4" action="flat" shape="info" aria-label="open toggletip"></bp-button-icon>
    </div>
    <script type="module">
      import '@blueprintui/components/include/toggletip.js';
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/info.js';
    </script>
  `;
}

export function invokerCommands() {
  return /* html */`
  <div bp-layout="inline gap:md">
    <bp-button commandfor="toggletip" command="toggle-popover">toggle-popover</bp-button>
  </div>
  <bp-toggletip id="toggletip" position="bottom">
    toggletip
    <button commandfor="toggletip" command="hide-popover" action="flat">hide-popover</button>
  </bp-toggletip>
  <script type="module">
    import '@blueprintui/components/include/toggletip.js';
    import '@blueprintui/components/include/button.js';
  </script>
  `;
}
