export const metadata = {
  name: 'button-copy',
  elements: ['bp-button-copy']
};

/**
 * @summary Basic copy button with aria-label and value to copy to clipboard
 */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
    </script>
    <bp-button-copy aria-label="copy to clipboard" value="hello world"></bp-button-copy>
  `;
}

/**
 * @summary Different action variants (default, secondary, flat, inline) for visual hierarchy
 */
export function action() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
    </script>

    <section bp-layout="inline gap:md block:center">
      <bp-button-copy value="default" aria-label="copy default"></bp-button-copy>
      <bp-button-copy action="secondary" value="secondary" aria-label="copy secondary"></bp-button-copy>
      <bp-button-copy action="flat" value="flat" aria-label="copy flat"></bp-button-copy>
      <bp-button-copy action="inline" value="inline" aria-label="copy inline"></bp-button-copy>
    </section>
  `;
}

/**
 * @summary Status colors for semantic context (neutral, accent, success, warning, danger)
 */
export function status() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-button-copy value="neutral" aria-label="copy"></bp-button-copy>
      <bp-button-copy status="accent" value="accent" aria-label="copy accent"></bp-button-copy>
      <bp-button-copy status="success" value="success" aria-label="copy success"></bp-button-copy>
      <bp-button-copy status="warning" value="warning" aria-label="copy warning"></bp-button-copy>
      <bp-button-copy status="danger" value="danger" aria-label="copy danger"></bp-button-copy>
    </div>
  `;
}

/**
 * @summary Custom icon slots for replacing default copy/success icons with branded alternatives
 */
export function customIcons() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
      import '@blueprintui/icons/shapes/add.js';
    </script>

    <bp-button-copy value="custom icons">
      <bp-icon shape="add"></bp-icon>
    </bp-button-copy>
  `;
}

/**
 * @summary Disabled state behavior across all action variants
 */
export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
    </script>

    <div bp-layout="inline gap:md block:center">
      <bp-button-copy disabled value="disabled" aria-label="copy disabled"></bp-button-copy>
      <bp-button-copy disabled action="secondary" value="disabled secondary" aria-label="copy disabled secondary"></bp-button-copy>
      <bp-button-copy disabled action="flat" value="disabled flat" aria-label="copy disabled flat"></bp-button-copy>
      <bp-button-copy disabled action="inline" value="disabled inline" aria-label="copy disabled inline"></bp-button-copy>
    </div>
  `;
}

/**
 * @summary Programmatic copy triggering using command pattern with external button
 */
export function command() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-button-copy id="copy-btn" value="copy-from-command"></bp-button-copy>
      <bp-button command="copy" commandfor="copy-btn">Command Copy</bp-button>
    </div>

    <script type="module">
      document.getElementById('copy-btn')
        .addEventListener('copy', e => console.log(e.detail));
    </script>
  `;
}
