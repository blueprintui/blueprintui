export const metadata = {
  name: 'drawer',
  elements: ['bp-drawer']
};

export function example() {
  return /* html */`
<bp-button popovertarget="drawer-example">open dropdown</bp-button>
<bp-drawer id="drawer-example" closable>
  <p bp-text="content">This is a drawer</p>
</bp-drawer>

<script type="module">
  import '@blueprintui/components/include/drawer.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

export function interactive() {
  return /* html */`
<div bp-layout="inline gap:xs">
  <bp-button popovertarget="left-drawer" action="secondary">left</bp-button>
  <bp-button popovertarget="right-drawer" action="secondary">right</bp-button>
</div>

<bp-drawer id="left-drawer" position="left" closable>
  <p bp-text="content">This is a drawer</p>
</bp-drawer>

<bp-drawer id="right-drawer" position="right" closable>
  <p bp-text="content">This is a drawer</p>
</bp-drawer>

<script type="module">
  import '@blueprintui/components/include/drawer.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

export function open() {
  return /* html */`=
<bp-drawer open closable>
  <p bp-text="content">This is a drawer</p>
</bp-drawer>

<script type="module">
  import '@blueprintui/components/include/drawer.js';
</script>
  `;
}
