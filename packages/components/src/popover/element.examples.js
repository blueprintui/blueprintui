export const metadata = {
  name: 'popover',
  elements: ['bp-popover']
};

export function example() {
  return /* html */`
  <bp-button>Open Popover</bp-button>
  <bp-popover hidden arrow>
    <p bp-text="content">hello there</p>
  </bp-popover>

  <script type="module">
    import '@blueprintui/components/include/popover.js';
    import '@blueprintui/components/include/button.js';

    const popover = document.querySelector('bp-popover');
    const button = document.querySelector('bp-button');

    popover.anchor = button;
    popover.addEventListener('close', () => popover.hidden = true);
    button.addEventListener('click', () => popover.hidden = false);
  </script>
`;
}

export function nested() {
  return /* html */`
  <bp-field>
    <label>search</label>
    <bp-search value="text"></bp-search>
  </bp-field><br />
  <bp-field>
    <label>select</label>
    <bp-select>
      <bp-option value="1" checked>option 1</bp-option>
      <bp-option value="2">option 2</bp-option>
      <bp-option value="3">option 3</bp-option>
    </bp-select>
  </bp-field>
  <bp-dialog closable>
    <bp-field>
      <label>search</label>
      <bp-search value="text"></bp-search>
    </bp-field><br />
    <bp-button id="btn">button</bp-button>
    <bp-dropdown bp-theme="layer" anchor="btn" style="--width: 250px; --min-width: fit-conent;">
      <bp-field>
        <label>search</label>
        <bp-search value="text" id="search"></bp-search>
      </bp-field><br />
      <bp-field>
        <label>select</label>
        <bp-select>
          <bp-option value="1" checked>option 1</bp-option>
          <bp-option value="2">option 2</bp-option>
          <bp-option value="3">option 3</bp-option>
        </bp-select>
      </bp-field>
      <bp-tooltip bp-theme="modern-dark" anchor="search" position="right">tooltip</bp-tooltip>
    </bp-dropdown>
  </bp-dialog>
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
      <bp-popover anchor="card" position="center">center</bp-popover>
      <bp-popover anchor="card" arrow position="top-start">top-start</bp-popover>
      <bp-popover anchor="card" arrow position="top">top</bp-popover>
      <bp-popover anchor="card" arrow position="top-end">top-end</bp-popover>
      <bp-popover anchor="card" arrow position="right-start">right-start</bp-popover>
      <bp-popover anchor="card" arrow position="right">right</bp-popover>
      <bp-popover anchor="card" arrow position="right-end">right-end</bp-popover>
      <bp-popover anchor="card" arrow position="bottom-start">bottom-start</bp-popover>
      <bp-popover anchor="card" arrow position="bottom">bottom</bp-popover>
      <bp-popover anchor="card" arrow position="bottom-end">bottom-end</bp-popover>
      <bp-popover anchor="card" arrow position="left-start">left-start</bp-popover>
      <bp-popover anchor="card" arrow position="left">left</bp-popover>
      <bp-popover anchor="card" arrow position="left-end">left-end</bp-popover>

      <bp-popover position="center">center</bp-popover>
      <bp-popover position="top-start">top-start</bp-popover>  
      <bp-popover position="top">top</bp-popover>
      <bp-popover position="top-end">top-end</bp-popover>
      <bp-popover position="right-start">right-start</bp-popover>
      <bp-popover position="right">right</bp-popover>
      <bp-popover position="right-end">right-end</bp-popover>
      <bp-popover position="bottom-start">bottom-start</bp-popover>
      <bp-popover position="bottom">bottom</bp-popover>
      <bp-popover position="bottom-end">bottom-end</bp-popover>
      <bp-popover position="left-start">left-start</bp-popover>
      <bp-popover position="left">left</bp-popover>
      <bp-popover position="left-end">left-end</bp-popover>
      <bp-card id="card" style="width: 500px; height: 350px"></bp-card>
    </div>
    <script type="module">
      import '@blueprintui/components/include/popover.js';
      Array.from(document.querySelectorAll('bp-popover')).forEach(i => i.modal = false);
    </script>
  `;
}

export function types() {
  return /* html */`
  <div bp-layout="inline gap:sm inline:center" style="height:200vh; padding-top: 50vh">
    <bp-button id="tooltip-btn">tooltip</bp-button>
    <bp-button id="dropdown-btn">dropdown</bp-button>
    <bp-button id="dialog-btn">dialog</bp-button>
    <bp-button id="drawer-btn">drawer</bp-button>
  </div>
  <bp-tooltip anchor="tooltip-btn" hidden>tooltip</bp-tooltip>
  <bp-dropdown anchor="dropdown-btn" closable hidden>dropdown</bp-dropdown>
  <bp-dialog anchor="dialog-btn" modal closable hidden>dialog</bp-dialog>
  <bp-drawer anchor="drawer-btn" closable hidden>drawer</bp-drawer>

  <script type="module">
    import '@blueprintui/components/include/button.js';
    import '@blueprintui/components/include/tooltip.js';
    import '@blueprintui/components/include/dropdown.js';
    import '@blueprintui/components/include/dialog.js';
    import '@blueprintui/components/include/drawer.js';

    const tooltip = document.querySelector('bp-tooltip');
    const tooltipBtn = document.querySelector('#tooltip-btn');
    const dropdown = document.querySelector('bp-dropdown');
    const dropdownBtn = document.querySelector('#dropdown-btn');
    const dialog = document.querySelector('bp-dialog');
    const dialogBtn = document.querySelector('#dialog-btn');
    const drawer = document.querySelector('bp-drawer');
    const drawerBtn = document.querySelector('#drawer-btn');

    tooltipBtn.addEventListener('mouseleave', () => tooltip.hidden = true);
    tooltipBtn.addEventListener('mouseenter', () => tooltip.hidden = false);
    
    dropdown.addEventListener('close', () => dropdown.hidden = true);
    dropdownBtn.addEventListener('click', () => dropdown.hidden = false);

    dialog.addEventListener('close', () => dialog.hidden = true);
    dialogBtn.addEventListener('click', () => dialog.hidden = false);

    drawer.addEventListener('close', () => drawer.hidden = true);
    drawerBtn.addEventListener('click', () => drawer.hidden = false);
  </script>
  `;
}