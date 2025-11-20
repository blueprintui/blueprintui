export const metadata = {
  name: 'drawer',
  elements: ['bp-drawer']
};

/** @summary Provides a slide-in panel from screen edges for navigation or additional content. */
export function example() {
  return /* html */`
<bp-button popovertarget="drawer" action="secondary">open drawer</bp-button>
<bp-drawer id="drawer" closable>
  <p bp-text="content">This is a drawer</p>
</bp-drawer>

<script type="module">
  import '@blueprintui/components/include/drawer.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

/** @summary Demonstrates programmatic control using command API. */
export function commands() {
  return /* html */`
<bp-button command="show-popover" commandfor="drawer-commands-example">open drawer</bp-button>
<bp-button command="toggle-popover" commandfor="drawer-commands-example">toggle drawer</bp-button>
<bp-drawer id="drawer-commands-example" closable>
  <bp-button command="hide-popover" commandfor="drawer-commands-example">close drawer</bp-button>
</bp-drawer>

<script type="module">
  import '@blueprintui/components/include/drawer.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

/** @summary Shows drawer sliding in from the left side. */
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

/** @summary Shows drawer sliding in from the right side. */
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

/** @summary Displays drawer in permanently open state for demonstration. */
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
