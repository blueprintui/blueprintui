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
    </style>

    <bp-page>
      <bp-header slot="header">
        <bp-header-item>header</bp-header-item>
        <bp-header-item bp-layout="inline:end">item</bp-header-item>
        <bp-header-item>item</bp-header-item>
        <bp-header-item><a href="#">link</a></bp-header-item>
      </bp-header>
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
      </bp-header>
      <bp-breadcrumb bp-layout="m:xs" slot="subheader" aria-label="breadcrumb">
        <a bp-text="link" href="#">Home</a>
        <a bp-text="link" href="#">Parent page</a>
        <p bp-text="content" aria-current="page">Current page</p>
      </bp-breadcrumb>
      <bp-nav slot="aside-start" expanded style="--width: 200px">
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
      <main>
        main content
      </main>
      <bp-panel slot="aside-end">
        <p slot="header" bp-text="content">aside-end</p>
        <p bp-text="content">aside-end content</p>
        <p slot="footer" bp-text="content">aside-end footer</p>
      </bp-panel>
      <bp-panel slot="subfooter">subfooter</bp-panel>
      <bp-panel slot="footer">footer</bp-panel>
    </bp-page>
    `;
}
