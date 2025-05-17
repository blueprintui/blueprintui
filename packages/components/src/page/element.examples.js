export const metadata = {
  name: 'page',
  elements: ['bp-page']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/page.js';
      import '@blueprintui/components/include/panel.js';
      import '@blueprintui/components/include/header.js';
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/components/include/alert.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>
    <style>
      html,
      body {
        min-height: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }

      bp-page {
        div[slot] {
          padding: 1rem;
          height: 100%;
          width: 100%;
        }

        [slot='header'],
        [slot='footer'] {
          background: var(--bp-color-blue-200);
        }
        
        [slot='subheader'],
        [slot='subfooter'] {
          background: var(--bp-color-red-200);
        }

        [slot='aside-start'] {
          background: var(--bp-color-green-200);
        }

        [slot='aside-end'] {
          background: var(--bp-color-yellow-200);
        }
      }
    </style>

    <bp-page>
      <div slot="header">header</div>
      <div slot="subheader">subheader</div>
      <div slot="aside-start">aside-start</div>
      <main>
        main content
      </main>
      <div slot="aside-end">aside-end</div>
      <div slot="subfooter">subfooter</div>
      <div slot="footer">footer</div>
    </bp-page>
    `;
}

export function layout() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/page.js';
      import '@blueprintui/components/include/panel.js';
      import '@blueprintui/components/include/header.js';
      import '@blueprintui/components/include/nav.js';
      import '@blueprintui/components/include/alert.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>
    <style>
      html,
      body {
        min-height: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>

    <bp-page>
      <bp-alert-group slot="header" type="banner" status="accent">
        <bp-alert closable>alert accent <a href="#" bp-text="link">read more</a></bp-alert>
      </bp-alert-group>
      <bp-header slot="header">
        <bp-header-item>header</bp-header-item>
        <bp-header-item bp-layout="inline:end">item</bp-header-item>
        <bp-header-item>item</bp-header-item>
        <bp-header-item><a href="#">link</a></bp-header-item>
        <bp-header-item commandfor="menu-drawer" command="--toggle" aria-label="toggle menu"><bp-icon shape="menu"></bp-icon></bp-header-item>
      </bp-header>
      <bp-breadcrumb bp-layout="m:xs" slot="subheader" aria-label="breadcrumb">
        <a bp-text="link" href="#">Home</a>
        <a bp-text="link" href="#">Parent page</a>
        <p bp-text="content" aria-current="page">Current page</p>
      </bp-breadcrumb>
      <bp-panel slot="aside-start" style="--width: 200px">
        <p slot="header" bp-text="content">aside-start</p>
        <bp-menu>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
        </bp-menu>
        <p slot="footer" bp-text="content">aside-end footer</p>
      </bp-panel>
      <main>
        main content
      </main>
      <bp-panel slot="aside-end"  style="--width: 200px">
        <p slot="header" bp-text="content">aside-end</p>
        <p bp-text="content">aside-end content</p>
        <p slot="footer" bp-text="content">aside-end footer</p>
      </bp-panel>
      <bp-panel slot="subfooter">subfooter</bp-panel>
      <bp-panel slot="footer">footer</bp-panel>
    </bp-page>
    `;
}

export function interactive() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/page.js';
      import '@blueprintui/components/include/panel.js';
      import '@blueprintui/components/include/header.js';
      import '@blueprintui/components/include/menu.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>
    <style>
      html,
      body {
        min-height: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>

    <bp-page>
      <bp-header slot="header">
        <bp-header-item>header</bp-header-item>
        <bp-header-item bp-layout="inline:end">item</bp-header-item>
        <bp-header-item>item</bp-header-item>
        <bp-header-item><a href="#">link</a></bp-header-item>
        <bp-header-item commandfor="menu-panel" command="--toggle" aria-label="toggle menu"><bp-icon shape="menu"></bp-icon></bp-header-item>
      </bp-header>
      <bp-panel id="menu-panel" slot="aside-start" style="--width: 240px">
        <p slot="header" bp-text="content">aside-start</p>
        <bp-menu>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
          <bp-menu-item>menu item</bp-menu-item>
        </bp-menu>
        <p slot="footer" bp-text="content">aside-end footer</p>
      </bp-panel>
      <main>
        main content
      </main>
    </bp-page>
    `;
}

export function interactiveDocs() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/page.js';
      import '@blueprintui/components/include/panel.js';
      import '@blueprintui/components/include/header.js';
      import '@blueprintui/components/include/tree.js';
      import '@blueprintui/icons/shapes/home.js';
    </script>
    <style>
      html,
      body {
        min-height: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }

      bp-panel {
        --padding: var(--bp-size-500) var(--bp-size-500) var(--bp-size-500) 0;

        bp-tree-item a {
          text-decoration: none;
        }
      }
    </style>

    <bp-page>
      <bp-header slot="header">
        <bp-header-item>header</bp-header-item>
        <bp-header-item bp-layout="inline:end">item</bp-header-item>
        <bp-header-item>item</bp-header-item>
        <bp-header-item><a href="#">link</a></bp-header-item>
        <bp-header-item commandfor="menu-panel" command="--toggle" aria-label="toggle menu"><bp-icon shape="menu"></bp-icon></bp-header-item>
      </bp-header>
      <bp-panel id="menu-panel" slot="aside-start" style="--width: 240px">
        <bp-tree interaction="auto">
          <bp-tree-item expanded>
            Getting Started
            <bp-tree-item><a href="#">Changelog</a></bp-tree-item>
            <bp-tree-item><a href="#">Support</a></bp-tree-item>
            <bp-tree-item><a href="#">Github</a></bp-tree-item>
          </bp-tree-item>
          <bp-tree-item expanded>
            Integrations
            <bp-tree-item><a href="#">Angular</a></bp-tree-item>
            <bp-tree-item><a href="#">React</a></bp-tree-item>
            <bp-tree-item><a href="#">Vue</a></bp-tree-item>
            <bp-tree-item><a href="#">Demos</a></bp-tree-item>
          </bp-tree-item>
          <bp-tree-item expanded>
            Foundations
            <bp-tree-item><a href="#">Themes</a></bp-tree-item>
            <bp-tree-item><a href="#">Typography</a></bp-tree-item>
            <bp-tree-item><a href="#">Icons</a></bp-tree-item>
            <bp-tree-item><a href="#">Popovers</a></bp-tree-item>
            <bp-tree-item><a href="#">Internationalization</a></bp-tree-item>
            <bp-tree-item><a href="#">Drag and Drop</a></bp-tree-item>
            <bp-tree-item><a href="#">Keyboard Navigation</a></bp-tree-item>
          </bp-tree-item>
          <bp-tree-item expanded>
            Layout
            <bp-tree-item><a href="#">Getting Started</a></bp-tree-item>
            <bp-tree-item><a href="#">Block</a></bp-tree-item>
            <bp-tree-item><a href="#">Inline</a></bp-tree-item>
            <bp-tree-item><a href="#">Grid</a></bp-tree-item>
          </bp-tree-item>
        </bp-tree>
      </bp-panel>
      <main>
        main content
      </main>
    </bp-page>
    `;
}
