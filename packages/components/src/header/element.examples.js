export const metadata = {
  name: 'header',
  elements: ['bp-header']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/header.js';
    </script>

    <bp-header>
      <bp-button>header</bp-button>
      <bp-button bp-layout="inline:end">item</bp-button>
      <bp-button>item</bp-button>
      <bp-button><a href="#">link</a></bp-button>
    </bp-header>
  `;
}

export function buttons() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/header.js';
    </script>

    <bp-header>
      <bp-button>header</bp-button>
      <bp-button bp-layout="inline:end">item</bp-button>
      <bp-button>item</bp-button>
      <bp-button>item</bp-button>
    </bp-header>
  `;
}

export function link() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/header.js';
    </script>

    <bp-header>
      <bp-button><a href="#">link</a></bp-button>
      <bp-button bp-layout="inline:end"><a href="#">item</a></bp-button>
      <bp-button><a href="#">link</a></bp-button>
      <bp-button><a href="#">link</a></bp-button>
    </bp-header>
  `;
}

export function item() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/header.js';
    </script>

    <bp-header>
      <bp-header-item>header</bp-header-item>
      <bp-header-item bp-layout="inline:end">item</bp-header-item>
      <bp-header-item>item</bp-header-item>
      <bp-header-item><a href="#">link</a></bp-header-item>
    </bp-header>
  `;
}