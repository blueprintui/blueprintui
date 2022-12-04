export const metadata = {
  name: 'dialog',
  elements: ['bp-dialog']
};

export function example() {
  return /* html */`
    <bp-button>open dialog</bp-button>
    <bp-dialog hidden modal closable>
      <bp-dialog-header>
        <h2 bp-text="section">Dialog Header</h2>
      </bp-dialog-header>

      <p bp-text="content">dialog content</p>

      <bp-dialog-footer bp-layout="inline gap:xs inline:end">
        <bp-button action="outline">Cancel</bp-button>
        <bp-button>Save</bp-button>
      </bp-dialog-footer>
    </bp-dialog>

    <script type="module">
      import '@blueprintui/components/include/dialog.js';
      import '@blueprintui/components/include/button.js';

      const dialog = document.querySelector('bp-dialog');
      const button = document.querySelector('bp-button');
      dialog.addEventListener('close', () => dialog.hidden = true);
      button.addEventListener('click', () => dialog.hidden = false);
    </script>
  `;
}

export function small() {
  return /* html */`
<bp-dialog size="sm" closable>
  <bp-dialog-header>
    <h2 bp-text="section">small dialog</h2>
  </bp-dialog-header>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
  `;
}

export function large() {
  return /* html */`
<bp-dialog size="lg" closable>
  <bp-dialog-header>
    <h2 bp-text="section">large dialog</h2>
  </bp-dialog-header>
  <p bp-text="content">dialog Content</p>
</bp-dialog>
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