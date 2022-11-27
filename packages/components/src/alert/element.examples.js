export const metadata = {
  name: 'alert',
  elements: ['bp-alert', 'bp-alert-group']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/alert.js';
    </script>

    <section bp-layout="block gap:sm">
      <bp-alert>alert</bp-alert>
      <bp-alert status="accent">alert accent</bp-alert>
      <bp-alert status="success">alert success</bp-alert>
      <bp-alert status="warning">alert warning</bp-alert>
      <bp-alert status="danger">alert danger</bp-alert>
    </section>
    `;
}

export function alertGroup() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/alert.js';
    </script>

    <section bp-layout="block gap:sm">
      <bp-alert-group>
        <bp-alert closable>alert neutral</bp-alert>
      </bp-alert-group>
      <bp-alert-group status="accent">
        <bp-alert closable>alert accent</bp-alert>
      </bp-alert-group>
      <bp-alert-group status="success">
        <bp-alert closable>alert success</bp-alert>
      </bp-alert-group>
      <bp-alert-group status="warning">
        <bp-alert closable>alert warning</bp-alert>
      </bp-alert-group>
      <bp-alert-group status="danger">
        <bp-alert closable>alert danger</bp-alert>
      </bp-alert-group>

      <bp-alert-group>
        <bp-alert closable>alert</bp-alert>
        <bp-alert closable>alert</bp-alert>
      </bp-alert-group>
    </section>
    `;
}