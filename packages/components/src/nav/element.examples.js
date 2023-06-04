export const metadata = {
  name: 'nav',
  elements: ['bp-nav']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>
    <bp-nav expanded style="--height: 350px">
      <bp-nav-item>
        <bp-icon shape="home"></bp-icon>
        <a href="#">item 1</a>
      </bp-nav-item>
      <bp-nav-item selected>
        <bp-icon shape="home"></bp-icon>
        <a href="#">item 2</a>
      </bp-nav-item>
      <bp-nav-item>
        <bp-icon shape="home"></bp-icon>
        item 3
      </bp-nav-item>
    </bp-nav>
  `;
}

export function badge() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/components/include/badge.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>
    <bp-nav expanded style="--height: 350px">
      <bp-nav-item>
        <bp-icon shape="home"></bp-icon>
        <a href="#">item 1</a> <bp-badge status="accent">pro</bp-badge>
      </bp-nav-item>
      <bp-nav-item selected>
        <bp-icon shape="home"></bp-icon>
        <a href="#">item 2</a>
      </bp-nav-item>
      <bp-nav-item>
        <bp-icon shape="home"></bp-icon>
        item 3
      </bp-nav-item>
    </bp-nav>
  `;
}

export function collapsed() {
  return /* html */`
    <bp-nav expandable style="--height: 350px">
      <bp-nav-item>
        <bp-icon shape="home"></bp-icon>
        item 1
      </bp-nav-item>
      <bp-nav-item selected>
        <bp-icon shape="home"></bp-icon>
        item 2
      </bp-nav-item>
      <bp-nav-item>
        <bp-icon shape="home"></bp-icon>
        item 3
      </bp-nav-item>
    </bp-nav>
    <script type="module">
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/home.js';

      const nav = document.querySelector('bp-nav');
      const items = document.querySelectorAll('bp-nav-item');
      
      nav.addEventListener('open', () => nav.expanded = true);
      nav.addEventListener('close', () => nav.expanded = false);
      nav.addEventListener('click', e => {
        if (e.target.tagName === 'BP-NAV-ITEM') {
          items.forEach(item => item.selected = false);
          e.target.selected = !e.target.selected;
        }
      });
    </script>
  `;
}

export function icon() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>
    <bp-nav expanded style="--height: 350px">
      <bp-nav-item>
        <bp-icon shape="home"></bp-icon>
        item 1
      </bp-nav-item>
      <bp-nav-item selected>
        <bp-icon shape="home"></bp-icon>
        item 2
      </bp-nav-item>
      <bp-nav-item>
        <bp-icon shape="home"></bp-icon>
        item 3
      </bp-nav-item>
    </bp-nav>
  `;
}

export function groups() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>
    <bp-nav expanded style="--height: 350px">
      <bp-nav-item>
        <bp-icon shape="home"></bp-icon> item 1
      </bp-nav-item>
      <bp-nav-group expanded>
        <bp-nav-item><bp-icon shape="home"></bp-icon> group 1</bp-nav-item>
        <bp-nav-item>group item 1</bp-nav-item>
        <bp-nav-item selected>group item 2</bp-nav-item>
        <bp-nav-item>group item 3</bp-nav-item>
      </bp-nav-group>
      <bp-nav-group>
        <bp-nav-item><bp-icon shape="home"></bp-icon> group 1</bp-nav-item>
        <bp-nav-item><bp-icon shape="home"></bp-icon> group item 1</bp-nav-item>
        <bp-nav-item><bp-icon shape="home"></bp-icon> group item 2</bp-nav-item>
      </bp-nav-group>
    </bp-nav>
  `;
}

export function scroll() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/nav.js';
    </script>
    <div bp-layout="inline gap:md">
      <bp-nav expanded id="nav-one" style="--height: 300px">
        ${[...new Array(50)].map(() => `<bp-nav-item>item</bp-nav-item>`).join('\n')}
      </bp-nav>
      <bp-nav expanded id="nav-two" style="--height: 300px">
        ${[...new Array(50)].map(() => `<bp-nav-item>item</bp-nav-item>`).join('\n')}
      </bp-nav>
    </div>
    `;
}
