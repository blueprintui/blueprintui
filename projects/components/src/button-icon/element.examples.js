export const metadata = {
  name: 'button-icon',
  elements: ['bp-button-icon']
};

/**
 * @summary Provides compact icon-only buttons for actions.
 */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/menu.js';
    </script>
    <bp-button-icon shape="menu" aria-label="action"></bp-button-icon>
  `;
}

/**
 * @summary Displays all icon button variations in a single view.
 */
export function all() {
  return /* html */`
  <div bp-layout="block gap:md">
  ${example()}${action()}${status()}${secondary()}${flat()}${inline()}${disabled()}${pressed()}${selected()}
  </div>
  `;
}

/**
 * @summary Shows different icon button action styles.
 */
export function action() {
  return /* html */`
    <section bp-layout="inline gap:md block:center">
      <bp-button-icon shape="menu" aria-label="default"></bp-button-icon>
      <bp-button-icon action="secondary" shape="menu" aria-label="secondary"></bp-button-icon>
      <bp-button-icon action="flat" shape="menu" aria-label="flat"></bp-button-icon>
      <bp-button-icon action="inline" shape="menu" aria-label="inline"></bp-button-icon>
    </section>
  `;
}

/**
 * @summary Demonstrates icon buttons with different status colors.
 */
export function status() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/filter.js';
      import '@blueprintui/icons/shapes/close.js';
      import '@blueprintui/icons/shapes/menu.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-button-icon aria-label="action"></bp-button-icon>
      <bp-button-icon status="accent" aria-label="action"></bp-button-icon>
      <bp-button-icon status="success" aria-label="action"></bp-button-icon>
      <bp-button-icon status="warning" aria-label="action"></bp-button-icon>
      <bp-button-icon status="danger" aria-label="action"></bp-button-icon>
    </div>
  `;
}

/**
 * @summary Shows secondary icon button style.
 */
export function secondary() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/filter.js';
      import '@blueprintui/icons/shapes/close.js';
      import '@blueprintui/icons/shapes/menu.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-button-icon action="secondary" shape="menu" aria-label="open menu"></bp-button-icon>
      <bp-button-icon action="secondary" shape="filter" aria-label="filter column"></bp-button-icon>
      <bp-button-icon action="secondary" shape="close" aria-label="close message"></bp-button-icon>
      <bp-button-icon action="secondary" aria-label="action"></bp-button-icon>
    </div>
  `;
}

/**
 * @summary Demonstrates flat icon button style.
 */
export function flat() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/filter.js';
      import '@blueprintui/icons/shapes/close.js';
      import '@blueprintui/icons/shapes/menu.js';
    </script>

    <div bp-layout="inline gap:md block:center">
      <bp-button-icon action="flat" shape="menu" aria-label="open menu"></bp-button-icon>
      <bp-button-icon action="flat" shape="filter" aria-label="filter column"></bp-button-icon>
      <bp-button-icon action="flat" shape="close" aria-label="close message"></bp-button-icon>
      <bp-button-icon action="flat" aria-label="action"></bp-button-icon>
    </div>
  `;
}

/**
 * @summary Shows inline icon button style.
 */
export function inline() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/filter.js';
      import '@blueprintui/icons/shapes/close.js';
      import '@blueprintui/icons/shapes/menu.js';
    </script>

    <div bp-layout="inline gap:md block:center">
      <bp-button-icon action="inline" shape="menu" aria-label="open menu"></bp-button-icon>
      <bp-button-icon action="inline" shape="filter" aria-label="filter column"></bp-button-icon>
      <bp-button-icon action="inline" shape="close" aria-label="close message"></bp-button-icon>
      <bp-button-icon action="inline" aria-label="action"></bp-button-icon>
    </div>
  `;
}

/**
 * @summary Shows icon buttons in disabled state.
 */
export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
    </script>
    <div bp-layout="inline gap:md block:center">
      <bp-button-icon disabled aria-label="action"></bp-button-icon>
      <bp-button-icon disabled action="secondary" aria-label="action"></bp-button-icon>
      <bp-button-icon disabled action="flat" aria-label="action"></bp-button-icon>
      <bp-button-icon disabled action="inline" aria-label="action"></bp-button-icon>
    </div>
  `;
}

/**
 * @summary Demonstrates icon buttons in pressed state.
 */
export function pressed() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
    </script>
    <div bp-layout="inline gap:md block:center">
      <bp-button-icon pressed aria-label="pressed"></bp-button-icon>
      <bp-button-icon pressed action="secondary" aria-label="secondary pressed"></bp-button-icon>
      <bp-button-icon pressed action="flat" aria-label="flat pressed"></bp-button-icon>
      <bp-button-icon pressed action="inline" aria-label="inline pressed"></bp-button-icon>
    </div>
  `;
}

/**
 * @summary Shows icon buttons in selected state.
 */
export function selected() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-icon.js';
    </script>
    <div bp-layout="inline gap:md block:center">
      <bp-button-icon selected aria-label="selected"></bp-button-icon>
      <bp-button-icon selected action="secondary" aria-label="secondary selected"></bp-button-icon>
      <bp-button-icon selected action="flat" aria-label="flat selected"></bp-button-icon>
      <bp-button-icon selected action="inline" aria-label="inline selected"></bp-button-icon>
    </div>
  `;
}
