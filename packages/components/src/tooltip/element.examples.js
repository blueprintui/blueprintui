export const metadata = {
  name: 'tooltip',
  elements: ['bp-tooltip']
};

export function example() {
  return /* html */`
  <div bp-layout="block" style="min-height:200px">
    <bp-button-icon bp-layout="center" id="tooltip-btn" shape="info-circle" aria-label="open tooltip"></bp-button-icon>
    <bp-tooltip anchor="tooltip-btn" trigger="tooltip-btn" position="top">hello there</bp-tooltip>
  </div>
  <script type="module">
    import '@blueprintui/components/include/tooltip.js';
    import '@blueprintui/components/include/button-icon.js';
    import '@blueprintui/icons/shapes/info-circle.js';
  </script>
`;
}

export function interactive() {
  return /* html */`
  <div bp-layout="block" style="min-height:200px">
    <bp-button-icon bp-layout="center" id="btn" shape="info-circle" aria-label="open tooltip"></bp-button-icon>
    <bp-tooltip hidden anchor="btn" trigger="btn" position="top" id="tooltip">hello there</bp-tooltip>
  </div>

  <script type="module">
    import '@blueprintui/components/include/tooltip.js';
    import '@blueprintui/components/include/button-icon.js';
    import '@blueprintui/icons/shapes/info-circle.js';

    const tooltip = document.querySelector('#tooltip');
    tooltip.addEventListener('open', () => tooltip.hidden = false);
    tooltip.addEventListener('close', () => tooltip.hidden = true);
  </script>
`;
}

export function position() {
  return /* html */`
    <div bp-layout="grid gap:md cols:6 block:stretch center" style="margin-top: 100px; min-height: 100vh">
      <div>
        <bp-button-icon id="tooltip-action-1" shape="info-circle" aria-label="open tooltip"></bp-button-icon>
        <bp-tooltip anchor="tooltip-action-1" position="right">tooltip right</bp-tooltip>
      </div>
      
      <div>
        <bp-button-icon id="tooltip-action-3" shape="info-circle" aria-label="open tooltip"></bp-button-icon>
        <bp-tooltip anchor="tooltip-action-3" position="left">tooltip left</bp-tooltip>
      </div>
      
      <div>
        <bp-button-icon id="tooltip-action-2" shape="info-circle" aria-label="open tooltip"></bp-button-icon>
        <bp-tooltip anchor="tooltip-action-2" position="bottom">tooltip bottom</bp-tooltip>
      </div>
      
      <div>
        <bp-button-icon id="tooltip-action-4" shape="info-circle" aria-label="open tooltip"></bp-button-icon>
        <bp-tooltip anchor="tooltip-action-4" position="top">tooltip top</bp-tooltip>
      </div>
    </div>
    <script type="module">
      import '@blueprintui/components/include/tooltip.js';
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/info-circle.js';
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
    <div style="min-height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
      <bp-tooltip anchor="card" position="top-start">top-start</bp-tooltip>
      <bp-tooltip anchor="card" position="top">top</bp-tooltip>
      <bp-tooltip anchor="card" position="top-end">top-end</bp-tooltip>
      <bp-tooltip anchor="card" position="right-start">right-start</bp-tooltip>
      <bp-tooltip anchor="card" position="right">right</bp-tooltip>
      <bp-tooltip anchor="card" position="right-end">right-end</bp-tooltip>
      <bp-tooltip anchor="card" position="bottom-start">bottom-start</bp-tooltip>
      <bp-tooltip anchor="card" position="bottom">bottom</bp-tooltip>
      <bp-tooltip anchor="card" position="bottom-end">bottom-end</bp-tooltip>
      <bp-tooltip anchor="card" position="left-start">left-start</bp-tooltip>
      <bp-tooltip anchor="card" position="left">left</bp-tooltip>
      <bp-tooltip anchor="card" position="left-end">left-end</bp-tooltip>
      <bp-card id="card" style="width: 500px; height: 350px"></bp-card>
    </div>
    <script type="module">
      import '@blueprintui/components/include/popover.js';
      Array.from(document.querySelectorAll('bp-tooltip')).forEach(i => i.modal = false);
    </script>
  `;
}