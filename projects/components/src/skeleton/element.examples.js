export const metadata = {
  name: 'skeleton',
  elements: ['bp-skeleton']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <bp-skeleton></bp-skeleton>
  `;
}

export function effect() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div bp-layout="block gap:md">
      <div>
        <p style="margin-bottom: var(--bp-space-sm)">No effect (default):</p>
        <bp-skeleton></bp-skeleton>
      </div>

      <div>
        <p style="margin-bottom: var(--bp-space-sm)">Pulse effect:</p>
        <bp-skeleton effect="pulse"></bp-skeleton>
      </div>

      <div>
        <p style="margin-bottom: var(--bp-space-sm)">Sheen effect:</p>
        <bp-skeleton effect="sheen"></bp-skeleton>
      </div>
    </div>
  `;
}

export function shape() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div bp-layout="inline gap:md align:start">
      <div>
        <p style="margin-bottom: var(--bp-space-sm)">Rectangle (default):</p>
        <bp-skeleton style="--width: 200px; --height: 100px"></bp-skeleton>
      </div>

      <div>
        <p style="margin-bottom: var(--bp-space-sm)">Circle:</p>
        <bp-skeleton shape="circle" style="--width: 100px; --height: 100px"></bp-skeleton>
      </div>
    </div>
  `;
}

export function customSize() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-skeleton style="--width: 100px; --height: 16px"></bp-skeleton>
      <bp-skeleton style="--width: 200px; --height: 20px"></bp-skeleton>
      <bp-skeleton style="--width: 150px; --height: 24px"></bp-skeleton>
    </div>
  `;
}

export function avatar() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-skeleton shape="circle" effect="pulse" style="--width: var(--bp-size-700); --height: var(--bp-size-700)"></bp-skeleton>
      <bp-skeleton shape="circle" effect="pulse" style="--width: var(--bp-size-800); --height: var(--bp-size-800)"></bp-skeleton>
      <bp-skeleton shape="circle" effect="pulse" style="--width: var(--bp-size-900); --height: var(--bp-size-900)"></bp-skeleton>
    </div>
  `;
}

export function textLines() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div style="display: flex; flex-direction: column; gap: var(--bp-space-sm);">
      <bp-skeleton effect="sheen" style="--width: 100%; --height: 1rem"></bp-skeleton>
      <bp-skeleton effect="sheen" style="--width: 80%; --height: 1rem"></bp-skeleton>
      <bp-skeleton effect="sheen" style="--width: 90%; --height: 1rem"></bp-skeleton>
      <bp-skeleton effect="sheen" style="--width: 75%; --height: 1rem"></bp-skeleton>
    </div>
  `;
}

export function cardLayout() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div style="display: flex; gap: var(--bp-space-md); padding: var(--bp-space-md); max-width: 400px;">
      <bp-skeleton shape="circle" effect="pulse" style="--width: 60px; --height: 60px"></bp-skeleton>
      <div style="flex: 1; display: flex; flex-direction: column; gap: var(--bp-space-sm);">
        <bp-skeleton effect="sheen" style="--width: 40%; --height: 1.2rem"></bp-skeleton>
        <bp-skeleton effect="sheen" style="--width: 100%; --height: 1rem"></bp-skeleton>
        <bp-skeleton effect="sheen" style="--width: 75%; --height: 1rem"></bp-skeleton>
      </div>
    </div>
  `;
}

export function imageLayout() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div bp-layout="block gap:md" style="max-width: 300px;">
      <bp-skeleton effect="sheen" style="--width: 100%; --height: 200px"></bp-skeleton>
      <bp-skeleton effect="sheen" style="--width: 60%; --height: 1.5rem"></bp-skeleton>
      <bp-skeleton effect="sheen" style="--width: 100%; --height: 1rem"></bp-skeleton>
      <bp-skeleton effect="sheen" style="--width: 85%; --height: 1rem"></bp-skeleton>
    </div>
  `;
}

export function customColors() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-skeleton
        effect="pulse"
        style="--width: 100%; --height: 40px; --background: var(--bp-status-accent-background-200)">
      </bp-skeleton>
      <bp-skeleton
        effect="sheen"
        style="--width: 100%; --height: 40px; --background: var(--bp-status-info-background-200)">
      </bp-skeleton>
      <bp-skeleton
        effect="pulse"
        style="--width: 100%; --height: 40px; --background: var(--bp-status-success-background-200)">
      </bp-skeleton>
    </div>
  `;
}
