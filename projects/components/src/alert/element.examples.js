export const metadata = {
  name: 'alert',
  elements: ['bp-alert', 'bp-alert-group']
};

/**
 * @summary Communicates important messages, warnings, or status updates to users.
 */
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

/**
 * @summary Demonstrates alert with command-based toggle functionality.
 */
export function commands() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/alert.js';
    </script>

    <section bp-layout="block gap:sm">
      <bp-alert-group>
        <bp-alert closable id="alert-example">stateful with command trigger</bp-alert>
        <bp-alert closable>stateless no command trigger</bp-alert>
      </bp-alert-group>
      <bp-button command="--toggle" commandfor="alert-example" action="secondary">toggle</bp-button>
    </section>
    `;
}

/**
 * @summary Shows grouped alerts with various status types and closable functionality.
 */
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

/**
 * @summary Displays full-width banner alerts with links and closable functionality.
 */
export function alertGroupBanner() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/alert.js';
    </script>

    <section bp-layout="block gap:sm">
      <bp-alert-group type="banner">
        <bp-alert closable>alert neutral <a href="#" bp-text="link">read more</a></bp-alert>
      </bp-alert-group>
      <bp-alert-group type="banner" status="accent">
        <bp-alert closable>alert accent <a href="#" bp-text="link">read more</a></bp-alert>
      </bp-alert-group>
      <bp-alert-group type="banner" status="success">
        <bp-alert closable>alert success <a href="#" bp-text="link">read more</a></bp-alert>
      </bp-alert-group>
      <bp-alert-group type="banner" status="warning">
        <bp-alert closable>alert warning <a href="#" bp-text="link">read more</a></bp-alert>
      </bp-alert-group>
      <bp-alert-group type="banner" status="danger">
        <bp-alert closable>alert danger <a href="#" bp-text="link">read more</a></bp-alert>
      </bp-alert-group>
    </section>
    `;
}