export const metadata = {
  name: 'button-icon-group',
  elements: ['bp-button-icon-group', 'bp-button-icon']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon-group.js';
      import '@blueprintui/icons/shapes/number-list.js';
      import '@blueprintui/icons/shapes/highlighter.js';
      import '@blueprintui/icons/shapes/attachment.js';
      import '@blueprintui/icons/shapes/font-size.js';
      import '@blueprintui/icons/shapes/italic.js';
    </script>

    <bp-button-icon-group>
      <bp-button-icon shape="font-size" aria-label="font size"></bp-button-icon>
      <bp-button-icon shape="italic" aria-label="italic"></bp-button-icon>
      <bp-button-icon shape="number-list" aria-label="number list"></bp-button-icon>
      <bp-button-icon shape="highlighter" aria-label="highlighter"></bp-button-icon>
      <bp-button-icon shape="attachment" aria-label="attachment"></bp-button-icon>
    </bp-button-icon-group>
  `;
}

export function selected() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon-group.js';
      import '@blueprintui/icons/shapes/number-list.js';
      import '@blueprintui/icons/shapes/highlighter.js';
      import '@blueprintui/icons/shapes/attachment.js';
      import '@blueprintui/icons/shapes/font-size.js';
      import '@blueprintui/icons/shapes/italic.js';
    </script>

    <bp-button-icon-group>
      <bp-button-icon selected shape="font-size" aria-label="font size"></bp-button-icon>
      <bp-button-icon shape="italic" aria-label="italic"></bp-button-icon>
      <bp-button-icon shape="number-list" aria-label="number list"></bp-button-icon>
      <bp-button-icon shape="highlighter" aria-label="highlighter"></bp-button-icon>
      <bp-button-icon shape="attachment" aria-label="attachment"></bp-button-icon>
    </bp-button-icon-group>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon-group.js';
      import '@blueprintui/icons/shapes/number-list.js';
      import '@blueprintui/icons/shapes/highlighter.js';
      import '@blueprintui/icons/shapes/attachment.js';
      import '@blueprintui/icons/shapes/font-size.js';
      import '@blueprintui/icons/shapes/italic.js';
    </script>

    <bp-button-icon-group>
      <bp-button-icon disabled shape="font-size" aria-label="font size"></bp-button-icon>
      <bp-button-icon shape="italic" aria-label="italic"></bp-button-icon>
      <bp-button-icon shape="number-list" aria-label="number list"></bp-button-icon>
      <bp-button-icon shape="highlighter" aria-label="highlighter"></bp-button-icon>
      <bp-button-icon shape="attachment" aria-label="attachment"></bp-button-icon>
    </bp-button-icon-group>
  `;
}
