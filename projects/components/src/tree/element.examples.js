export const metadata = {
  name: 'tree',
  elements: ['bp-tree']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/tree.js';
    </script>

    <bp-tree interaction="auto">
      <bp-tree-item>Item 1</bp-tree-item>
      <bp-tree-item>Item 2</bp-tree-item>
      <bp-tree-item expanded>
        Item 3
        <bp-tree-item>Item 3-1</bp-tree-item>
        <bp-tree-item>Item 3-2</bp-tree-item>
        <bp-tree-item expanded>
          Item 3-3
          <bp-tree-item>Item 3-3-1</bp-tree-item>
          <bp-tree-item>Item 3-3-2</bp-tree-item>
          <bp-tree-item>Item 3-3-3</bp-tree-item>
        </bp-tree-item>
        <bp-tree-item>Item 3-4</bp-tree-item>
        <bp-tree-item>Item 3-5</bp-tree-item>
      </bp-tree-item>
    </bp-tree>
    `;
}

export function commands() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/tree.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <div bp-layout="inline gap:xs m-b:md">
      <bp-button command="--toggle" commandfor="tree-node-3">toggle</bp-button>
      <bp-button command="--open" commandfor="tree-node-3">open</bp-button>
      <bp-button command="--close" commandfor="tree-node-3">close</bp-button>
    </div>

    <bp-tree interaction="auto">
      <bp-tree-item>Item 1</bp-tree-item>
      <bp-tree-item>Item 2</bp-tree-item>
      <bp-tree-item id="tree-node-3">
        Item 3
        <bp-tree-item>Item 3-1</bp-tree-item>
        <bp-tree-item>Item 3-2</bp-tree-item>
        <bp-tree-item>Item 3-3</bp-tree-item>
      </bp-tree-item>
    </bp-tree>
    `;
}

export function multiSelectable() {
  return /* html */`
  <script type="module">
    import '@blueprintui/components/include/tree.js';
  </script>

  <bp-tree selectable="multi" interaction="auto">
    <bp-tree-item>Item 1</bp-tree-item>
    <bp-tree-item selected>Item 2</bp-tree-item>
    <bp-tree-item expanded>
      Item 3
      <bp-tree-item>Item 3-1</bp-tree-item>
      <bp-tree-item>Item 3-2</bp-tree-item>
      <bp-tree-item expanded>
        Item 3-3
        <bp-tree-item>Item 3-3-1</bp-tree-item>
        <bp-tree-item>Item 3-3-2</bp-tree-item>
        <bp-tree-item>Item 3-3-3</bp-tree-item>
      </bp-tree-item>
      <bp-tree-item>Item 3-4</bp-tree-item>
      <bp-tree-item>Item 3-5</bp-tree-item>
    </bp-tree-item>
  </bp-tree>
  `;
}

export function selectable() {
  return /* html */`
  <script type="module">
    import '@blueprintui/components/include/tree.js';
  </script>

  <bp-tree selectable="single" interaction="auto">
    <bp-tree-item selected>Item 1</bp-tree-item>
    <bp-tree-item>Item 2</bp-tree-item>
    <bp-tree-item expanded>
      Item 3
      <bp-tree-item>Item 3-1</bp-tree-item>
      <bp-tree-item>Item 3-2</bp-tree-item>
      <bp-tree-item expanded>
        Item 3-3
        <bp-tree-item>Item 3-3-1</bp-tree-item>
        <bp-tree-item>Item 3-3-2</bp-tree-item>
        <bp-tree-item>Item 3-3-3</bp-tree-item>
      </bp-tree-item>
      <bp-tree-item>Item 3-4</bp-tree-item>
      <bp-tree-item>Item 3-5</bp-tree-item>
    </bp-tree-item>
  </bp-tree>
  `;
}

export function icons() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/tree.js';
      import '@blueprintui/icons/shapes/file-settings.js';
      import '@blueprintui/icons/shapes/file-share-2.js';
      import '@blueprintui/icons/shapes/folder.js';
      import '@blueprintui/icons/shapes/file.js';
    </script>

    <bp-tree interaction="auto">
      <bp-tree-item>
        <bp-icon shape="folder" size="sm"></bp-icon> server
        <bp-tree-item><bp-icon shape="file" size="sm"></bp-icon> file.js</bp-tree-item>
      </bp-tree-item>
      <bp-tree-item expanded>
        <bp-icon shape="folder" size="sm"></bp-icon> client
        <bp-tree-item><bp-icon shape="file" size="sm"></bp-icon> file.js</bp-tree-item>
        <bp-tree-item><bp-icon shape="file-share-2" size="sm"></bp-icon> share.txt</bp-tree-item>
        <bp-tree-item><bp-icon shape="file-settings" size="sm"></bp-icon> config.json</bp-tree-item>
      </bp-tree-item>
    </bp-tree>
    `;
}

export function links() {
  return /* html */`
  <script type="module">
    import '@blueprintui/components/include/tree.js';
  </script>

  <bp-tree>
    <bp-tree-item>Item 1</bp-tree-item>
    <bp-tree-item>Item 2</bp-tree-item>
    <bp-tree-item expanded>
      <a href="https://coryrylan.com">Item 3</a>
      <bp-tree-item><a href="#">Item 3-1</a></bp-tree-item>
      <bp-tree-item>Item 3-2</bp-tree-item>
      <bp-tree-item expanded>
        Item 3-3
        <bp-tree-item>Item 3-3-1</bp-tree-item>
        <bp-tree-item>Item 3-3-2</bp-tree-item>
        <bp-tree-item>Item 3-3-3</bp-tree-item>
      </bp-tree-item>
      <bp-tree-item>Item 3-4</bp-tree-item>
      <bp-tree-item>Item 3-5</bp-tree-item>
    </bp-tree-item>
  </bp-tree>
  `;
}

export function stateless() {
  return /* html */`
    <bp-tree>
      <bp-tree-item>Item 1</bp-tree-item>
      <bp-tree-item>Item 2</bp-tree-item>
      <bp-tree-item id="tree-item-group">
        Item 3
        <bp-tree-item>Item 3-1</bp-tree-item>
        <bp-tree-item>Item 3-2</bp-tree-item>
        <bp-tree-item>Item 3-3</bp-tree-item>
      </bp-tree-item>
    </bp-tree>
    <script type="module">
      import '@blueprintui/components/include/tree.js';
      const group = document.querySelector('#tree-item-group');
      group.addEventListener('open', () => group.expanded = true);
      group.addEventListener('close', () => group.expanded = false);
    </script>
    `;
}
