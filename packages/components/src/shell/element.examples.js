export const metadata = {
  name: 'shell',
  elements: ['bp-shell']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/shell.js';
      import '@blueprintui/components/include/header.js';
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/components/include/alert.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>

    <bp-shell interaction="auto">
      <bp-nav expanded>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon> item 1
        </bp-nav-item>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon> item 2
        </bp-nav-item>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon> item 3
        </bp-nav-item>
      </bp-nav>
      <bp-header>
        <bp-header-item>header</bp-header-item>
        <bp-header-item id="drawer-button" bp-shell="drawer-button" aria-label="menu" bp-layout="inline:end"><bp-icon size="lg"></bp-icon></bp-header-item>
      </bp-header>
      <section bp-layout="block gap:md" style="height: 2000px">
        <h1 bp-text="heading">Shell</h1>
        <bp-alert-group status="success">
          <bp-alert>hello there</bp-alert>
        </bp-alert-group>
      </section>
    </bp-shell>
    `;
}

export function collapsedNav() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/shell.js';
      import '@blueprintui/components/include/header.js';
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/components/include/alert.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>

    <bp-shell>
      <bp-header>
        <bp-header-item>header</bp-header-item>
        <bp-header-item id="drawer-button" bp-shell="drawer-button" aria-label="menu" bp-layout="inline:end"><bp-icon size="lg"></bp-icon></bp-header-item>
      </bp-header>
      <bp-nav expandable>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon> item 1
        </bp-nav-item>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon> item 2
        </bp-nav-item>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon> item 3
        </bp-nav-item>
      </bp-nav>
      <section bp-layout="block gap:md" style="height: 2000px">
        <h1 bp-text="heading">Shell</h1>
        <bp-alert-group status="success">
          <bp-alert>hello there</bp-alert>
        </bp-alert-group>
      </section>
    </bp-shell>
    `;
}

export function noHeader() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/shell.js';
      import '@blueprintui/components/include/alert.js';
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>

    <bp-shell>
      <bp-nav expanded>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon> item 1
        </bp-nav-item>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon> item 2
        </bp-nav-item>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon> item 3
        </bp-nav-item>
      </bp-nav>
      <section bp-layout="block gap:md">
        <h1 bp-text="heading">Shell</h1>
        <bp-alert-group status="success">
          <bp-alert>hello there</bp-alert>
        </bp-alert-group>
      </section>
    </bp-shell>
    `;
}
