export const metadata = {
  name: 'split-view',
  elements: ['bp-split-view']
};

export function example() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/split-view.js';
    </script>
    <bp-split-view style="height: 300px;">
      <div slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <p>Left Panel</p>
        <p>This is the prefix panel. You can resize by dragging the divider.</p>
      </div>
      <div slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
        <p>Right Panel</p>
        <p>This is the suffix panel.</p>
      </div>
    </bp-split-view>
  `;
}

export function vertical() {
  return /* html */ `
    <bp-split-view vertical style="height: 400px;">
      <div slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <p>Top Panel</p>
        <p>Vertical split view with top and bottom panels.</p>
      </div>
      <div slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
        <p>Bottom Panel</p>
        <p>Drag the horizontal divider to resize.</p>
      </div>
    </bp-split-view>
  `;
}

export function customPosition() {
  return /* html */ `
    <bp-split-view position="25" style="height: 300px;">
      <div slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <p>25% Width</p>
      </div>
      <div slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
        <p>75% Width</p>
      </div>
    </bp-split-view>
  `;
}

export function pixelPosition() {
  return /* html */ `
    <bp-split-view position="200" position-in-pixels style="height: 300px; width: 600px;">
      <div slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <p>200px Width</p>
      </div>
      <div slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
        <p>Remaining Width</p>
      </div>
    </bp-split-view>
  `;
}

export function withConstraints() {
  return /* html */ `
    <bp-split-view prefix-min="100" prefix-max="400" suffix-min="150" style="height: 300px;">
      <div slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <p>Constrained Panel</p>
        <p>Min: 100px, Max: 400px</p>
      </div>
      <div slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
        <p>Constrained Panel</p>
        <p>Min: 150px</p>
      </div>
    </bp-split-view>
  `;
}

export function snapPoints() {
  return /* html */ `
    <bp-split-view snap="25 50 75" snap-threshold="15" style="height: 300px;">
      <div slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <p>Snap to 25%, 50%, or 75%</p>
      </div>
      <div slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
        <p>Try dragging the divider near these positions</p>
      </div>
    </bp-split-view>
  `;
}

export function disabled() {
  return /* html */ `
    <bp-split-view disabled position="40" style="height: 300px;">
      <div slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <p>Fixed Panel</p>
      </div>
      <div slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
        <p>Cannot Resize (Disabled)</p>
      </div>
    </bp-split-view>
  `;
}

export function customDivider() {
  return /* html */ `
    <bp-split-view
      style="height: 300px; --divider-width: 2px; --divider-color: var(--bp-object-border-accent-100);">
      <div slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <p>Custom Divider Style</p>
      </div>
      <div slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
        <p>Thin accent-colored divider</p>
      </div>
    </bp-split-view>
  `;
}

export function nested() {
  return /* html */ `
    <bp-split-view position="25" style="height: 400px;">
      <aside slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <h3 style="margin: 0 0 var(--bp-size-400);">Sidebar</h3>
        <p>Navigation items</p>
      </aside>
      <bp-split-view slot="suffix" vertical position="30">
        <header slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
          <h3 style="margin: 0;">Header</h3>
        </header>
        <main slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
          <h3 style="margin: 0 0 var(--bp-size-400);">Content Area</h3>
          <p>Nested split view example with sidebar and header.</p>
        </main>
      </bp-split-view>
    </bp-split-view>
  `;
}

export function events() {
  return /* html */ `
    <script type="module">
      const splitView = document.querySelector('#event-demo');
      const output = document.querySelector('#event-output');

      splitView.addEventListener('input', (e) => {
        output.textContent = \`Position during drag: \${e.target.position.toFixed(1)}%\`;
      });

      splitView.addEventListener('change', (e) => {
        output.textContent = \`Final position: \${e.target.position.toFixed(1)}%\`;
      });
    </script>
    <bp-split-view id="event-demo" style="height: 300px;">
      <div slot="prefix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-100);">
        <p>Drag to see events</p>
      </div>
      <div slot="suffix" style="padding: var(--bp-size-600); background: var(--bp-layer-background-200);">
        <p id="event-output">Position: 50.0%</p>
      </div>
    </bp-split-view>
  `;
}
