export const metadata = {
  name: 'button-copy',
  elements: ['bp-button-copy']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
    </script>
    <bp-button-copy value="Hello World"></bp-button-copy>
  `;
}

export function all() {
  return /* html */`
  <div bp-layout="block gap:md">
  ${example()}${action()}${status()}${customLabels()}${customIcons()}${disabled()}${programmatic()}
  </div>
  `;
}

export function action() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
    </script>

    <section bp-layout="inline gap:md block:center">
      <bp-button-copy value="default" copy-label="Copy default"></bp-button-copy>
      <bp-button-copy action="secondary" value="secondary" copy-label="Copy secondary"></bp-button-copy>
      <bp-button-copy action="flat" value="flat" copy-label="Copy flat"></bp-button-copy>
      <bp-button-copy action="inline" value="inline" copy-label="Copy inline"></bp-button-copy>
    </section>
  `;
}

export function status() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-button-copy value="neutral" copy-label="Copy"></bp-button-copy>
      <bp-button-copy status="accent" value="accent" copy-label="Copy accent"></bp-button-copy>
      <bp-button-copy status="success" value="success" copy-label="Copy success"></bp-button-copy>
      <bp-button-copy status="warning" value="warning" copy-label="Copy warning"></bp-button-copy>
      <bp-button-copy status="danger" value="danger" copy-label="Copy danger"></bp-button-copy>
    </div>
  `;
}

export function customLabels() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
    </script>

    <bp-button-copy
      value="npm install @blueprintui/components"
      copy-label="Copy command"
      success-label="Command copied!"
      error-label="Failed to copy command">
    </bp-button-copy>
  `;
}

export function customIcons() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
      import '@blueprintui/icons/shapes/clipboard.js';
      import '@blueprintui/icons/shapes/check-circle.js';
      import '@blueprintui/icons/shapes/error.js';
    </script>

    <bp-button-copy value="Custom icons" copy-label="Copy">
      <bp-icon slot="copy-icon" shape="clipboard"></bp-icon>
      <bp-icon slot="success-icon" shape="check-circle"></bp-icon>
      <bp-icon slot="error-icon" shape="error"></bp-icon>
    </bp-button-copy>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
    </script>
    <div bp-layout="inline gap:md block:center">
      <bp-button-copy disabled value="disabled" copy-label="Copy"></bp-button-copy>
      <bp-button-copy disabled action="secondary" value="disabled secondary" copy-label="Copy"></bp-button-copy>
      <bp-button-copy disabled action="flat" value="disabled flat" copy-label="Copy"></bp-button-copy>
      <bp-button-copy disabled action="inline" value="disabled inline" copy-label="Copy"></bp-button-copy>
    </div>
  `;
}

export function programmatic() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-copy.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-button-copy id="copy-btn" value="Programmatic copy"></bp-button-copy>
      <bp-button id="trigger-btn">Trigger Copy</bp-button>
      <div id="status-message"></div>
    </div>

    <script type="module">
      const copyBtn = document.getElementById('copy-btn');
      const triggerBtn = document.getElementById('trigger-btn');
      const statusMessage = document.getElementById('status-message');

      copyBtn.addEventListener('copy-success', (e) => {
        statusMessage.textContent = 'Copied: ' + e.detail.value;
      });

      copyBtn.addEventListener('copy-error', (e) => {
        statusMessage.textContent = 'Error: ' + e.detail.error.message;
      });

      triggerBtn.addEventListener('click', () => {
        copyBtn.copy();
      });
    </script>
  `;
}
