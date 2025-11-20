export const metadata = {
  name: 'button-group',
  elements: ['bp-button-group', 'bp-button']
};

/**
 * @summary Groups related buttons together for organized action sets.
 */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <bp-button-group>
      <bp-button>one</bp-button>
      <bp-button selected>two</bp-button>
      <bp-button>three</bp-button>
    </bp-button-group>
  `;
}

/**
 * @summary Displays all button group variations.
 */
export function all() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/icons/shapes/number-list.js';
      import '@blueprintui/icons/shapes/highlighter.js';
      import '@blueprintui/icons/shapes/attachment.js';
      import '@blueprintui/icons/shapes/font-size.js';
      import '@blueprintui/icons/shapes/italic.js';
    </script>

    <section bp-layout="block gap:md">
      ${example()}
    
      ${secondary()}

      ${flat()}

      ${icon()}

      ${iconSecondary()}

      ${iconFlat()}

      ${selected()}

      ${pressed()}

      ${disabled()}
    </section>
  `;
}

/**
 * @summary Shows button group with secondary style.
 */
export function secondary() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <bp-button-group action="secondary">
      <bp-button>one</bp-button>
      <bp-button selected>two</bp-button>
      <bp-button>three</bp-button>
    </bp-button-group>
  `;
}

/**
 * @summary Demonstrates button group with icon buttons.
 */
export function icon() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <bp-button-group>
      <bp-button-icon shape="font-size" aria-label="font size"></bp-button-icon>
      <bp-button-icon selected shape="italic" aria-label="italic"></bp-button-icon>
      <bp-button-icon shape="number-list" aria-label="number list"></bp-button-icon>
      <bp-button-icon shape="highlighter" aria-label="highlighter"></bp-button-icon>
      <bp-button-icon shape="attachment" aria-label="attachment"></bp-button-icon>
    </bp-button-group>
  `;
}

/**
 * @summary Shows secondary style button group with icons.
 */
export function iconSecondary() {
  return /* html */`
    <bp-button-group action="secondary">
      <bp-button-icon shape="font-size" aria-label="font size"></bp-button-icon>
      <bp-button-icon selected shape="italic" aria-label="italic"></bp-button-icon>
      <bp-button-icon shape="number-list" aria-label="number list"></bp-button-icon>
      <bp-button-icon shape="highlighter" aria-label="highlighter"></bp-button-icon>
      <bp-button-icon shape="attachment" aria-label="attachment"></bp-button-icon>
    </bp-button-group>
  `;
}

/**
 * @summary Demonstrates flat style button group with icons.
 */
export function iconFlat() {
  return /* html */`
    <bp-button-group action="flat">
      <bp-button-icon shape="font-size" aria-label="font size"></bp-button-icon>
      <bp-button-icon selected shape="italic" aria-label="italic"></bp-button-icon>
      <bp-button-icon shape="number-list" aria-label="number list"></bp-button-icon>
      <bp-button-icon shape="highlighter" aria-label="highlighter"></bp-button-icon>
      <bp-button-icon shape="attachment" aria-label="attachment"></bp-button-icon>
    </bp-button-group>
  `;
}

/**
 * @summary Shows button group with flat style.
 */
export function flat() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <bp-button-group action="flat">
      <bp-button>one</bp-button>
      <bp-button selected>two</bp-button>
      <bp-button>three</bp-button>
    </bp-button-group>
  `;
}

/**
 * @summary Demonstrates button selection within group.
 */
export function selected() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <bp-button-group>
      <bp-button>button one</bp-button>
      <bp-button selected>button two</bp-button>
      <bp-button>button three</bp-button>
    </bp-button-group>
  `;
}

/**
 * @summary Shows button in pressed state within group.
 */
export function pressed() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <bp-button-group>
      <bp-button>button one</bp-button>
      <bp-button pressed>button two</bp-button>
      <bp-button>button three</bp-button>
    </bp-button-group>
  `;
}

/**
 * @summary Demonstrates disabled button within group.
 */
export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <bp-button-group>
      <bp-button>button one</bp-button>
      <bp-button>button two</bp-button>
      <bp-button disabled>button three</bp-button>
    </bp-button-group>
  `;
}
