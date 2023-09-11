export const metadata = {
  name: 'button-group',
  elements: ['bp-button-group', 'bp-button']
};

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
