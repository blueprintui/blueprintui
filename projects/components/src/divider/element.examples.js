export const metadata = {
  name: 'divider',
  elements: ['bp-divider']
};

/** @summary Visually separates content sections with a horizontal or vertical line. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/divider.js';
    </script>

    <div bp-layout="block gap:sm">
      <p bp-text="content">some text content</p>
      <bp-divider></bp-divider>
      <p bp-text="content">some text content</p>
    </div>
  `;
}

/** @summary Demonstrates vertical divider orientation between inline elements. */
export function vertical() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/divider.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <div bp-layout="inline gap:md align:vertical-center p-x:md">
      <bp-button size="sm" action="secondary">button</bp-button>
      <bp-divider orientation="vertical"></bp-divider>
      <bp-button size="sm" action="secondary">button</bp-button>
      <bp-divider orientation="vertical"></bp-divider>
      <bp-button size="sm" action="secondary">button</bp-button>
      <bp-divider orientation="vertical"></bp-divider>
    </div>
  `;
}
