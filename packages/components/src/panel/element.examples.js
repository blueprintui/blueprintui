export const metadata = {
  name: 'panel',
  elements: ['bp-panel']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/panel.js';
    </script>

    <bp-panel>
      <p slot="header" bp-text="content">aside-end</p>
      <p bp-text="content">aside-end content</p>
      <p slot="footer" bp-text="content">aside-end footer</p>
    </bp-panel>
    `;
}
