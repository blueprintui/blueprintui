export const metadata = {
  name: 'skeleton',
  elements: ['bp-skeleton']
};

/** @summary Basic skeleton loader with default rectangular shape and shimmer effect */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <bp-skeleton></bp-skeleton>
  `;
}

/** @summary Demonstrates animation effects including shimmer (default), pulse, and sheen for different loading patterns */
export function effect() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-skeleton></bp-skeleton>
      <bp-skeleton effect="pulse"></bp-skeleton>
      <bp-skeleton effect="sheen"></bp-skeleton>
    </div>
  `;
}

/** @summary Shows rectangular and circular shapes for different content types like images or avatars */
export function shape() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-skeleton style="--width: 200px; --height: 100px"></bp-skeleton>
      <bp-skeleton shape="circle" style="--width: 100px; --height: 100px"></bp-skeleton>
    </div>
  `;
}

/** @summary Custom dimensions using CSS variables to match specific content widths and heights */
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

/** @summary Avatar placeholders with circular shape and pulse effect in multiple sizes using design tokens */
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

/** @summary Text paragraph placeholder with varied line widths to simulate natural text flow */
export function textLines() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/skeleton.js';
    </script>

    <div style="display: flex; flex-direction: column; gap: var(--bp-space-sm);">
      <bp-skeleton effect="sheen" style="--width: 100%"></bp-skeleton>
      <bp-skeleton effect="sheen" style="--width: 80%"></bp-skeleton>
      <bp-skeleton effect="sheen" style="--width: 90%"></bp-skeleton>
      <bp-skeleton effect="sheen" style="--width: 75%"></bp-skeleton>
    </div>
  `;
}

/** @summary Card layout pattern combining circular avatar with text lines for user profile or list item placeholders */
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

/** @summary Image card pattern with large image placeholder and text lines for media gallery or blog post previews */
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

/** @summary Custom background colors using design token variables to match brand themes or specific UI contexts */
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
        effect="pulse"
        style="--width: 100%; --height: 40px; --background: var(--bp-status-success-background-200)">
      </bp-skeleton>
    </div>
  `;
}
