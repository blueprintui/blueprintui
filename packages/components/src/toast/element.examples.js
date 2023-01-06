export const metadata = {
  name: 'toast',
  elements: ['bp-toast']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/toast.js';
    </script>

    <bp-toast anchor="example-anchor">toast message</bp-toast>
    <div id="example-anchor" style="height: 100px; width: 300px; margin: 48px auto"></div>
  `;
}

export function status() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/toast.js';
    </script>

    <bp-toast anchor="status-anchor" position="center" closable>toast</bp-toast>
    <bp-toast anchor="status-anchor" position="top" status="accent" closable>info</bp-toast>
    <bp-toast anchor="status-anchor" position="right" status="success" closable>success</bp-toast>
    <bp-toast anchor="status-anchor" position="bottom" status="warning" closable>warning</bp-toast>
    <bp-toast anchor="status-anchor" position="left" status="danger" closable>danger</bp-toast>
    <div id="status-anchor" style="height: 100px; width: 300px; margin: 48px auto 100px auto"></div>
  `;
}

export function interactive() {
  return /* html */`
    <bp-toast hidden closable>toast message</bp-toast>
    <bp-button>open</bp-button>
    <script type="module">
      import '@blueprintui/components/include/toast.js';
      import '@blueprintui/components/include/button.js';
      const toast = document.querySelector('bp-toast');
      const button = document.querySelector('bp-button');
      toast.addEventListener('close', () => toast.hidden = true);
      button.addEventListener('click', () => toast.hidden = false);
    </script>
  `;
}