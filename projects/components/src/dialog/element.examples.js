export const metadata = {
  name: 'dialog',
  elements: ['bp-dialog']
};

/** @summary Displays modal or non-modal overlay windows for focused interactions. */
export function example() {
  return /* html */`
<bp-button popovertarget="dialog">open dialog</bp-button>
<bp-dialog id="dialog" modal closable>
  <h2 slot="header" bp-text="section">dialog</h2>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
<script type="module">
  import '@blueprintui/components/include/dialog.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

/** @summary Demonstrates programmatic control using command API. */
export function commands() {
  return /* html */`
<bp-button command="show-popover" commandfor="dialog-example">open dialog</bp-button>
<bp-button command="toggle-popover" commandfor="dialog-example">toggle dialog</bp-button>
<bp-dialog id="dialog-example" modal closable>
  <h2 slot="header" bp-text="section">dialog</h2>
  <bp-button command="hide-popover" commandfor="dialog-example">close dialog</bp-button>
</bp-dialog>
<script type="module">
  import '@blueprintui/components/include/dialog.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

/** @summary Shows non-modal dialog that allows interaction with page content. */
export function nonModal() {
  return /* html */`
<bp-button popovertarget="dialog-modal">open dialog</bp-button>
<bp-dialog id="dialog-modal" closable>
  <h2 slot="header" bp-text="section">dialog</h2>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
<script type="module">
  import '@blueprintui/components/include/dialog.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

/** @summary Shows dialog in small size. */
export function small() {
  return /* html */`
<bp-button popovertarget="dialog-small">open dialog</bp-button>
<bp-dialog id="dialog-small" size="sm" modal closable>
  <h2 slot="header" bp-text="section">small dialog</h2>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
<script type="module">
  import '@blueprintui/components/include/dialog.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

/** @summary Shows dialog in large size. */
export function large() {
  return /* html */`
<bp-button popovertarget="dialog-large">open dialog</bp-button>
<bp-dialog id="dialog-large" size="lg" modal closable>
  <h2 slot="header" bp-text="section">large dialog</h2>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
<script type="module">
  import '@blueprintui/components/include/dialog.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}

/** @summary Displays dialog in permanently open state for demonstration. */
export function open() {
  return /* html */`
<bp-dialog open closable>
  <h2 slot="header" bp-text="section">dialog</h2>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
<script type="module">
  import '@blueprintui/components/include/dialog.js';
</script>
  `;
}

/** @summary Demonstrates dialog with custom footer actions. */
export function footer() {
  return /* html */`
<bp-button popovertarget="dialog-footer-example">open dialog</bp-button>
<bp-dialog id="dialog-footer-example" modal closable>
  <h2 slot="header" bp-text="section">dialog</h2>
  <p bp-text="content">dialog Content</p>
  <bp-button slot="footer" action="flat" popovertarget="dialog-footer-example">close</bp-button>
</bp-dialog>
<script type="module">
  import '@blueprintui/components/include/dialog.js';
  import '@blueprintui/components/include/button.js';
</script>
  `;
}
