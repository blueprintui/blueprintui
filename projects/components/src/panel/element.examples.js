export const metadata = {
  name: 'panel',
  elements: ['bp-panel']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/panel.js';
    </script>

    <bp-panel style="height: 400px">
      <p slot="header" bp-text="content">header</p>
      <p bp-text="content">content</p>
      <p slot="footer" bp-text="content">footer</p>
    </bp-panel>
    `;
}

export function closable() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/panel.js';

      document.querySelector('#closable-panel-example').addEventListener('close', e => {
        console.log('close');
      });
    </script>

    <bp-panel closable id="closable-panel-example" style="height: 400px">
      <p slot="header" bp-text="content">header</p>
      <p bp-text="content">content</p>
      <p slot="footer" bp-text="content">footer</p>
    </bp-panel>
    `;
}

export function commands() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/panel.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <bp-panel closable id="commands-panel-example" style="height: 400px">
      <p slot="header" bp-text="content">header</p>
      <p bp-text="content">content</p>
      <p slot="footer" bp-text="content">footer</p>
      <bp-button slot="footer" command="--close" commandfor="commands-panel-example" action="flat">close</bp-button>
    </bp-panel>
    <bp-button command="--toggle" commandfor="commands-panel-example" action="secondary">toggle</bp-button>
    `;
}

export function size() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/panel.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-panel size="sm" style="height: 400px">
        <p slot="header" bp-text="content">small</p>
        <p bp-text="content">content</p>
        <p slot="footer" bp-text="content">footer</p>
      </bp-panel>

      <bp-panel size="md" style="height: 400px">
        <p slot="header" bp-text="content">medium</p>
        <p bp-text="content">content</p>
        <p slot="footer" bp-text="content">footer</p>
      </bp-panel>

      <bp-panel size="lg" style="height: 400px">
        <p slot="header" bp-text="content">large</p>
        <p bp-text="content">content</p>
        <p slot="footer" bp-text="content">footer</p>
      </bp-panel>
    </div>
    `;
}

export function scroll() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/panel.js';
    </script>

    <bp-panel style="height: 400px;">
      <p slot="header" bp-text="content">header</p>
      <p bp-text="content" style="height: 1000px;">content</p>
      <p slot="footer" bp-text="content">footer</p>
    </bp-panel>
    `;
}