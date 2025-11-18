export const metadata = {
  name: 'split-view',
  elements: ['bp-split-view']
};

export function example() {
  return /* html */`
    <bp-split-view style="width: 100%; height: 300px;">
      <div slot="prefix" style="background: var(--bp-layer-background-100); padding: var(--bp-size-400); overflow: auto;">
        <h3 style="margin: 0 0 var(--bp-size-300);">Left Panel</h3>
        <p>This is the prefix panel content. You can resize this panel by dragging the divider.</p>
      </div>
      <div slot="suffix" style="background: var(--bp-layer-background-200); padding: var(--bp-size-400); overflow: auto;">
        <h3 style="margin: 0 0 var(--bp-size-300);">Right Panel</h3>
        <p>This is the suffix panel content. The layout is responsive and resizable.</p>
      </div>
    </bp-split-view>

    <script type="module">
      import '@blueprintui/components/include/split-view.js';
    </script>
  `;
}

export function vertical() {
  return /* html */`
    <bp-split-view vertical position="40" style="width: 100%; height: 300px;">
      <div slot="prefix" style="background: var(--bp-layer-background-100); padding: var(--bp-size-400); overflow: auto;">
        <h3 style="margin: 0 0 var(--bp-size-300);">Top Panel</h3>
        <p>This is the top panel in a vertical split view.</p>
      </div>
      <div slot="suffix" style="background: var(--bp-layer-background-200); padding: var(--bp-size-400); overflow: auto;">
        <h3 style="margin: 0 0 var(--bp-size-300);">Bottom Panel</h3>
        <p>This is the bottom panel. Drag the horizontal divider to resize.</p>
      </div>
    </bp-split-view>

    <script type="module">
      import '@blueprintui/components/include/split-view.js';
    </script>
  `;
}

export function disabled() {
  return /* html */`
    <bp-split-view disabled position="35" style="width: 100%; height: 200px;">
      <div slot="prefix" style="background: var(--bp-layer-background-100); padding: var(--bp-size-400);">
        <h3 style="margin: 0;">Fixed Left Panel</h3>
        <p>Resizing is disabled for this split view.</p>
      </div>
      <div slot="suffix" style="background: var(--bp-layer-background-200); padding: var(--bp-size-400);">
        <h3 style="margin: 0;">Fixed Right Panel</h3>
        <p>The divider cannot be moved.</p>
      </div>
    </bp-split-view>

    <script type="module">
      import '@blueprintui/components/include/split-view.js';
    </script>
  `;
}

export function withConstraints() {
  return /* html */`
    <bp-split-view prefix-min="100" prefix-max="400" suffix-min="150" style="width: 600px; height: 250px;">
      <div slot="prefix" style="background: var(--bp-layer-background-100); padding: var(--bp-size-400);">
        <h3 style="margin: 0 0 var(--bp-size-300);">Constrained Panel</h3>
        <p>Min: 100px, Max: 400px</p>
      </div>
      <div slot="suffix" style="background: var(--bp-layer-background-200); padding: var(--bp-size-400);">
        <h3 style="margin: 0 0 var(--bp-size-300);">Right Panel</h3>
        <p>Min: 150px</p>
      </div>
    </bp-split-view>

    <script type="module">
      import '@blueprintui/components/include/split-view.js';
    </script>
  `;
}

export function withSnap() {
  return /* html */`
    <bp-split-view snap="25 50 75" snap-threshold="15" style="width: 100%; height: 250px;">
      <div slot="prefix" style="background: var(--bp-layer-background-100); padding: var(--bp-size-400);">
        <h3 style="margin: 0 0 var(--bp-size-300);">Left Panel</h3>
        <p>This split view snaps to 25%, 50%, and 75% positions with a 15px threshold.</p>
      </div>
      <div slot="suffix" style="background: var(--bp-layer-background-200); padding: var(--bp-size-400);">
        <h3 style="margin: 0 0 var(--bp-size-300);">Right Panel</h3>
        <p>Try dragging the divider near the snap points!</p>
      </div>
    </bp-split-view>

    <script type="module">
      import '@blueprintui/components/include/split-view.js';
    </script>
  `;
}

export function inPixels() {
  return /* html */`
    <bp-split-view position="250" position-in-pixels style="width: 600px; height: 250px;">
      <div slot="prefix" style="background: var(--bp-layer-background-100); padding: var(--bp-size-400);">
        <h3 style="margin: 0 0 var(--bp-size-300);">250px Panel</h3>
        <p>This panel has a fixed width of 250 pixels.</p>
      </div>
      <div slot="suffix" style="background: var(--bp-layer-background-200); padding: var(--bp-size-400);">
        <h3 style="margin: 0 0 var(--bp-size-300);">Flexible Panel</h3>
        <p>This panel takes the remaining space.</p>
      </div>
    </bp-split-view>

    <script type="module">
      import '@blueprintui/components/include/split-view.js';
    </script>
  `;
}

export function nested() {
  return /* html */`
    <bp-split-view position="30" style="width: 100%; height: 400px;">
      <aside slot="prefix" style="background: var(--bp-layer-background-100); padding: var(--bp-size-400);">
        <h3 style="margin: 0;">Sidebar</h3>
        <p>Navigation or sidebar content</p>
      </aside>
      <bp-split-view slot="suffix" vertical position="35">
        <header slot="prefix" style="background: var(--bp-layer-background-200); padding: var(--bp-size-400);">
          <h3 style="margin: 0;">Header</h3>
        </header>
        <main slot="suffix" style="background: var(--bp-layer-background-300); padding: var(--bp-size-400);">
          <h3 style="margin: 0;">Main Content</h3>
          <p>This demonstrates nested split views for complex layouts.</p>
        </main>
      </bp-split-view>
    </bp-split-view>

    <script type="module">
      import '@blueprintui/components/include/split-view.js';
    </script>
  `;
}

export function events() {
  return /* html */`
    <div>
      <bp-split-view id="event-demo" style="width: 100%; height: 250px;">
        <div slot="prefix" style="background: var(--bp-layer-background-100); padding: var(--bp-size-400);">
          <h3 style="margin: 0;">Left Panel</h3>
          <p>Drag the divider to see events.</p>
        </div>
        <div slot="suffix" style="background: var(--bp-layer-background-200); padding: var(--bp-size-400);">
          <h3 style="margin: 0;">Right Panel</h3>
          <p id="event-output">Position: 50%</p>
        </div>
      </bp-split-view>
    </div>

    <script type="module">
      import '@blueprintui/components/include/split-view.js';

      const splitView = document.querySelector('#event-demo');
      const output = document.querySelector('#event-output');

      splitView.addEventListener('input', (e) => {
        output.textContent = 'Position: ' + e.detail.position.toFixed(1) + '%';
      });

      splitView.addEventListener('change', (e) => {
        console.log('Resize complete. Final position:', e.detail.position);
      });
    </script>
  `;
}

export function customStyling() {
  return /* html */`
    <bp-split-view
      style="
        width: 100%;
        height: 250px;
        --divider-width: 6px;
        --divider-color: var(--bp-status-accent-background-200);
        --divider-color-hover: var(--bp-status-accent-background-300);
        --divider-color-active: var(--bp-status-accent-background-400);
      ">
      <div slot="prefix" style="background: var(--bp-layer-background-100); padding: var(--bp-size-400);">
        <h3 style="margin: 0;">Custom Divider Style</h3>
        <p>The divider has custom colors and width.</p>
      </div>
      <div slot="suffix" style="background: var(--bp-layer-background-200); padding: var(--bp-size-400);">
        <h3 style="margin: 0;">Right Panel</h3>
        <p>Try hovering and dragging the divider!</p>
      </div>
    </bp-split-view>

    <script type="module">
      import '@blueprintui/components/include/split-view.js';
    </script>
  `;
}
