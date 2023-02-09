export const metadata = {
  name: 'button-group',
  elements: ['bp-button-group', 'bp-button']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
    </script>

    <bp-button-group>
      <bp-button>one</bp-button>
      <bp-button>two</bp-button>
      <bp-button>three</bp-button>
    </bp-button-group>
  `;
}

export function selected() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
    </script>

    <bp-button-group>
      <bp-button>button one</bp-button>
      <bp-button selected>button two</bp-button>
      <bp-button>button three</bp-button>
    </bp-button-group>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-group.js';
    </script>

    <bp-button-group>
      <bp-button>button one</bp-button>
      <bp-button>button two</bp-button>
      <bp-button disabled>button three</bp-button>
    </bp-button-group>
  `;
}
