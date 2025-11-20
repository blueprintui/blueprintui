export const metadata = {
  name: 'panel',
  elements: ['bp-panel']
};


/** @summary Groups related content in a bordered container section. */
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


/** @summary Demonstrates panel with closable functionality. */
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


/** @summary Shows programmatic control using command API. */
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


/** @summary Demonstrates various panel size options. */
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


/** @summary Shows panel with scrollable overflow content. */
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