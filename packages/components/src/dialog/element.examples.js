export const metadata = {
  name: 'dialog',
  elements: ['bp-dialog']
};

export function example() {
  return /* html */`
<bp-dialog closable>
  <h2 slot="header" bp-text="section">dialog</h2>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
  `;
}

export function modal() {
  return /* html */`
<bp-dialog modal closable>
  <h2 slot="header" bp-text="section">dialog</h2>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
  `;
}

export function interactive() {
  return /* html */`
    <bp-button id="btn">open dialog</bp-button>
    <bp-dialog hidden modal closable trigger="btn">
      <h2 slot="header" bp-text="section">dialog header</h2>
      <p bp-text="content">dialog content</p>
      <div slot="footer" bp-layout="inline gap:xs inline:end">
        <bp-button action="outline">Cancel</bp-button>
        <bp-button>Save</bp-button>
      </div>
    </bp-dialog>

    <script type="module">
      import '@blueprintui/components/include/dialog.js';
      import '@blueprintui/components/include/button.js';

      const dialog = document.querySelector('bp-dialog');
      dialog.addEventListener('close', () => dialog.hidden = true);
      dialog.addEventListener('open', () => dialog.hidden = false);
    </script>
  `;
}

export function smallStateless() {
  return /* html */`
<bp-dialog size="sm" closable>
  <h2 slot="header" bp-text="section">small dialog</h2>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
  `;
}

export function largeStateless() {
  return /* html */`
<bp-dialog size="lg" closable>
  <h2 slot="header" bp-text="section">large dialog</h2>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
  `;
}

export function small() {
  return /* html */`
<bp-button id="btn-small-dialog">open small dialog</bp-button>
  <bp-dialog hidden modal closable trigger="btn-small-dialog" size="sm">
    <h2 slot="header" bp-text="section">Size Small</h2>
    <p bp-text="content">dialog content</p>
    <div slot="footer" bp-layout="inline gap:xs inline:end">
      <bp-button action="outline">Cancel</bp-button>
      <bp-button>Save</bp-button>
    </div>
  </bp-dialog>

  <script type="module">
    import '@blueprintui/components/include/dialog.js';
    import '@blueprintui/components/include/button.js';

    const dialog = document.querySelector('bp-dialog[size=sm]');
    dialog.addEventListener('close', () => dialog.hidden = true);
    dialog.addEventListener('open', () => dialog.hidden = false);
  </script>
  `;
}

export function large() {
  return /* html */`
<bp-button id="btn-large-dialog">open large dialog</bp-button>
<bp-dialog hidden modal closable trigger="btn-large-dialog" size="lg">
  <h2 slot="header" bp-text="section">Size Large</h2>
  <p bp-text="content">dialog content</p>
  <div slot="footer" bp-layout="inline gap:xs inline:end">
    <bp-button action="outline">Cancel</bp-button>
    <bp-button>Save</bp-button>
  </div>
</bp-dialog>

<script type="module">
  import '@blueprintui/components/include/dialog.js';
  import '@blueprintui/components/include/button.js';

  const dialog = document.querySelector('bp-dialog[size=lg]');
  dialog.addEventListener('close', () => dialog.hidden = true);
  dialog.addEventListener('open', () => dialog.hidden = false);
</script>
  `;
}

export function structuralDom() {
  return /* html */`
<bp-button id="structural-dom-btn">open dialog</bp-button>
<script type="module">
  const button = document.querySelector('bp-button');
  button.addEventListener('click', () => {
    const dialog = document.createElement('bp-dialog');
    dialog.anchor = 'structural-dom-btn';
    dialog.closable = true;
    dialog.modal = true;
    dialog.innerHTML = '<bp-dialog-header><h2 bp-text="section">dialog</h2></bp-dialog-header>';
    dialog.addEventListener('close', () => dialog.remove(), { once: true });
    document.body.appendChild(dialog);
  });
</script>
  `;
}
