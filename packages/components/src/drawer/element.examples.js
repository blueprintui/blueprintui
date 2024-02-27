export const metadata = {
  name: 'drawer',
  elements: ['bp-drawer']
};

export function example() {
  return /* html */`
<bp-button popovertarget="drawer-example" action="secondary">open drawer</bp-button>
<bp-drawer id="drawer-example" closable>
  <p bp-text="content">This is a drawer</p>
</bp-drawer>

<script type="module">
  import '@blueprintui/components/include/drawer.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

export function left() {
  return /* html */`
<bp-button popovertarget="left-drawer" action="secondary">left</bp-button>

<bp-drawer id="left-drawer" position="left" closable>
  <p bp-text="content">This is a drawer</p>
</bp-drawer>

<script type="module">
  import '@blueprintui/components/include/drawer.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

export function right() {
  return /* html */`
<bp-button popovertarget="right-drawer" action="secondary">right</bp-button>

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
