export const metadata = {
  name: 'tooltip',
  elements: ['bp-tooltip']
};

export function example() {
  return /* html */`
  <div bp-layout="block center" style="height: 250px">
    <bp-button-icon popovertarget="tooltip-example" id="tooltip-btn" action="flat" shape="info" aria-label="open tooltip"></bp-button-icon>
    <bp-tooltip id="tooltip-example" anchor="tooltip-btn" position="top">hello there</bp-tooltip>
  </div>
  <script type="module">
    import '@blueprintui/components/include/tooltip.js';
    import '@blueprintui/components/include/button-icon.js';
    import '@blueprintui/icons/shapes/info.js';
  </script>
`;
}

export function multiTrigger() {
  return /* html */`
  <div bp-layout="inline gap:md center" style="height: 250px">
    <bp-button popovertarget="tooltip-example">trigger 1</bp-button>
    <bp-button popovertarget="tooltip-example" id="tooltip-btn">trigger 2</bp-button>
    <bp-button popovertarget="tooltip-example">trigger 3</bp-button>
    <bp-tooltip id="tooltip-example" anchor="tooltip-btn" position="top">hello there</bp-tooltip>
  </div>
  <script type="module">
    import '@blueprintui/components/include/tooltip.js';
    import '@blueprintui/components/include/button.js';
    import '@blueprintui/icons/shapes/info.js';
  </script>
`;
}

export function position() {
  return /* html */`
    <div bp-layout="grid gap:md cols:6 block:stretch center" style="padding-top: 100px; max-height: 95vh; min-height: 340px;">
      <bp-button-icon popovertarget="tooltip-1" id="tooltip-action-1" action="flat" shape="info" aria-label="open tooltip"></bp-button-icon>
      <bp-tooltip id="tooltip-1" anchor="tooltip-action-1" position="right">tooltip right</bp-tooltip>
      <bp-button-icon popovertarget="tooltip-2" id="tooltip-action-2" action="flat" shape="info" aria-label="open tooltip"></bp-button-icon>
      <bp-tooltip id="tooltip-2" anchor="tooltip-action-2" position="left">tooltip left</bp-tooltip>
      <bp-button-icon popovertarget="tooltip-3" id="tooltip-action-3" action="flat" shape="info" aria-label="open tooltip"></bp-button-icon>
      <bp-tooltip id="tooltip-3" anchor="tooltip-action-3" position="bottom">tooltip bottom</bp-tooltip>
      <bp-button-icon popovertarget="tooltip-4" id="tooltip-action-4" action="flat" shape="info" aria-label="open tooltip"></bp-button-icon>
      <bp-tooltip id="tooltip-4" anchor="tooltip-action-4" position="top">tooltip top</bp-tooltip>
    </div>
    <script type="module">
      import '@blueprintui/components/include/tooltip.js';
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/info.js';
    </script>
  `;
}

export function alignment() {
  return /* html */`
    <style>
      html, body {
        height: 100%;
      }
    </style>
    <bp-tooltip open anchor="card" position="top-start">top-start</bp-tooltip>
    <bp-tooltip open anchor="card" position="top">top</bp-tooltip>
    <bp-tooltip open anchor="card" position="top-end">top-end</bp-tooltip>
    <bp-tooltip open anchor="card" position="right-start">right-start</bp-tooltip>
    <bp-tooltip open anchor="card" position="right">right</bp-tooltip>
    <bp-tooltip open anchor="card" position="right-end">right-end</bp-tooltip>
    <bp-tooltip open anchor="card" position="bottom-start">bottom-start</bp-tooltip>
    <bp-tooltip open anchor="card" position="bottom">bottom</bp-tooltip>
    <bp-tooltip open anchor="card" position="bottom-end">bottom-end</bp-tooltip>
    <bp-tooltip open anchor="card" position="left-start">left-start</bp-tooltip>
    <bp-tooltip open anchor="card" position="left">left</bp-tooltip>
    <bp-tooltip open anchor="card" position="left-end">left-end</bp-tooltip>
    <div style="min-height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
      <bp-card id="card" style="width: 500px; height: 350px"></bp-card>
    </div>
    <script type="module">
      import '@blueprintui/components/include/tooltip.js';
    </script>
  `;
}